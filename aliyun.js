const puppeteer = require('puppeteer') // 引入Puppeteer
const chalk = require('chalk')
const xlsx = require('node-xlsx')
const fs = require('fs')
const ora = require('ora')

const log = console.log

// 阿里云产品详情页的详情信息每个产品都不尽相同，这里列举大多数情况
async function parseProductionDetail(page) {
  const infoEle = await page.$('p.info')

  let detail = ''

  if (infoEle) {
    detail = await page.$eval('p.info', node => node.innerText)
  } else {
    const introEle = await page.$('.intro > p')
    if (introEle) {
      detail = await page.$eval('.intro > p', node => node.innerText)
    } else {
      const descEle = await page.$('div.desc')
      if (descEle) {
        detail = await page.$eval('div.desc', node => node.innerText)
      } else {
        const intro = await page.$('div.intro')
        if (intro) {
          detail = await page.$eval('div.intro', node => node.innerText)
        }
      }
    }
  }

  return detail
}

async function parseDetailPage(href, name, browser) {
  const page = await browser.newPage()
  await page.goto(href, { timeout: 0 })

  log(chalk.yellow(`open new page: ${name}`))

  const detail = await parseProductionDetail(page)

  await page.waitFor(100)
  await page.close()

  return detail
}

async function parseProductionItems(items, itemElement, pageItem, browser) {
  for (let k = 0; k < items.length; k += 1) {
    const res = await items[k].$eval(itemElement, node => ({
      name: node.innerText,
      href: node.href
    }))

    const detail = await parseDetailPage(res.href, res.name, browser)

    pageItem.categories.push({
      ...res,
      detail
    })
  }
}

// 存储每一级分类当前解析个数的累计值，用于获取行合并的开始和结束值
const categoryCountMap = new Map()

// 递归遍历产品一级二级三级分类，获取产品的信息，生成符合excel格式的数据
function traverse(item, result, finalRes) {
  if (!item.categories) {
    // 对于没有三级分类的条目需要主动填充一个null
    if (result.length !== 3) {
      result.push(null)
    }
    result.push(item.name, item.detail, item.href)
    finalRes.push(result)
    return null
  }

  result.push(item.name)
  let count = 0
  item.categories.forEach((it) => {
    const tmp = [...result]
    const res = traverse(it, tmp, finalRes)
    // 如果返回null说明已经在最后一级分类了，加1即可
    if (res === null) {
      count += 1
    } else {
      // 如果不是，说明当前大于最后一级分类，比如二级分类、一级分类之类的
      count += res
    }
  })

  let startRow = categoryCountMap.get(result.length) + 1
  if (!startRow) {
    // 扣除第一行标题
    startRow = 1
  }
  const endRow = startRow + count - 1
  // 这里进行多行合并的判断
  const range = { s: { c: result.length - 1, r: startRow }, e: { c: result.length - 1, r: endRow }}
  categoryCountMap.set(result.length,  endRow)
  ranges.push(range)
  if (result.length <= 2 && (categoryCountMap.get(result.length) !== categoryCountMap.get(result.length + 1))) {
    // 如果二级分类的个数三级分类累计的值不对等，说明该二级分类没有三级分类，因此需要主动填充
    log(chlak.yellow(`current category ${result} has not third category`))
    const range = { s: { c: result.length, r: startRow }, e: { c: result.length, r: endRow }}
    categoryCountMap.set(result.length + 1,  endRow)
    ranges.push(range)
  }
  return count
}

async function main() {
  // 首先通过Puppeteer启动一个浏览器环境
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  })
  log(chalk.green('爬虫开始'))
  try {
    // 打开一个新的页面
    const page = await browser.newPage()

    let spinner = ora('正在打开阿里云产品页面....')
    spinner.start()
    // 打开阿里云产品页面
    await page.goto(
      'https://www.aliyun.com/product/list'
      )

    const res = await page.$$('.product-wrap')

    const result = []

    spinner.succeed()
    spinner = ora('开始解析阿里云产品页面....')
    spinner.start()

    for (let i = 0; i < res.length; i += 1) {
      const searchCls = i === 0 ? '.first-title-disableCss' : '.first-title'
      // 一级分类的名称
      const firstClass = await res[i].$eval(searchCls, node => node.innerText)

      const pageItem = {
        name: firstClass,
        categories: []
      }

      // 云计算基础这个分类比较特殊，总共有三级分类
      if (i === 0) {
        const cloudWraps = await res[i].$$('.cloud-content')

        for (let p = 0; p < cloudWraps.length; p += 1) {
          await cloudWraps[p].click()

          const secondClass = await cloudWraps[p].$eval('p', node => node.innerText)

          const subPage = {
            name: secondClass,
            categories: []
          }

          const listClouds = await page.$$('.list-wrap.list-cloud')

          if (listClouds.length > 0) {
            for (let q = 0; q < listClouds.length; q += 1) {
              // 获取三级分类的名称
              const thirdClass = await listClouds[q].$eval('.list-first-wrap a', node => node.innerText)

              const subSubPage = {
                name: thirdClass,
                categories: []
              }

              const listSecondWraps = await listClouds[q].$$('.list-second-wrap')
              await parseProductionItems(listSecondWraps, 'a', subSubPage, browser)

              subPage.categories.push(subSubPage)
            }
          } else {
            // 这种类型的不到三层分类，比如CDN与边缘
            const listSecondWraps = await page.$$('.list-wrap-none')

            await parseProductionItems(listSecondWraps, '.list-second-title', subPage, browser)
          }
          pageItem.categories.push(subPage)
        }
      } else {
        const listWrap = await res[i].$$('.list-wrap')

        for (let j = 0; j < listWrap.length - 1; j += 1) {
          // 获取二级分类的名称
          const secondClass = await listWrap[j].$eval('.list-first-wrap', node => node.innerText)

          const subPage = {
            name: secondClass,
            categories: []
          }

          // 分析二级分类下所有产品信息
          const listSecondWraps = await listWrap[j].$$('.list-second-wrap')

          await parseProductionItems(listSecondWraps, 'a', subPage, browser)

          pageItem.categories.push(subPage)
        }
      }
      result.push(pageItem)
    }

    spinner.succeed()
    spinner = ora('页面解析完成，开始生成excel格式数据')
    spinner.start()

    const data = [['一级分类', '二级分类', '三级分类', '产品名称', '详细介绍', '跳转链接']]
    const ranges = []

    result.forEach((item) => {
      const temp = []
      traverse(item, temp, data)
    })

    // console.log(ranges)
     const options = {'!cols': [{ wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 30 }, { wch: 130}, { wch: 45} ], '!merges': ranges};

    spinner.succeed()
    spinner = ora('开始生成excel文件')
    spinner.start()

    const buffer = xlsx.build([{name: "阿里云产品列表", data: data, options}]); // Returns a buffer

    fs.writeFileSync('./阿里云产品.xlsx', buffer)

    spinner.succeed()

    // 所有的数据爬取完毕后关闭浏览器
    await browser.close()
    log(chalk.green('爬虫结束'))

  } catch (error) {
    // 出现任何错误，打印错误消息并且关闭浏览器
    console.log(error)
    log(chalk.red('爬虫意外终止'))
    await browser.close()
  } finally {
    // 最后要退出进程
    process.exit(0)
  }
}

main()
