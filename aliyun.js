import puppeteer from 'puppeteer' // 引入Puppeteer
import chalk from 'chalk'

const log = console.log

// 进入代码的主逻辑
async function main() {
  // 首先通过Puppeteer启动一个浏览器环境
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  })
  log(chalk.green('服务正常启动'))
  // 使用 try catch 捕获异步中的错误进行统一的错误处理
  try {
    // 打开一个新的页面
    const page = await browser.newPage()

    // 打开我们刚刚看见的淘宝页面
    await page.goto(
      'https://www.aliyun.com/product/list?spm=5176.12825654.h2v3icoap.2.e9392c4ac4aL8r&aly_as=GoymkZ-n'
      )
    log(chalk.yellow('页面初次加载完毕'))

    const res = await page.$$('.product-wrap')

    const result = []

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

              for (let k = 0; k < listSecondWraps.length; k += 1) {
                const res = await listSecondWraps[k].$eval('a', node => ({
                  name: node.innerText,
                  href: node.href
                }))

                const newPage = await browser.newPage()
                await newPage.goto(res.href)

                const detail = await newPage.$eval('.head-box .head-cell .info', node => node.innerText)

                await browser.close()

                subSubPage.categories.push({
                  ...res,
                  detail
                })
                await page.waitFor(2500)
              }
              subPage.categories.push(subSubPage)
            }
          } else {
            // 这种类型的不到三层分类，比如CDN与边缘
            const listSecondWraps = await page.$$('.list-wrap-none')

            for (let k = 0; k < listSecondWraps.length; k += 1) {
              const res = await listSecondWraps[k].$eval('.list-second-title', node => ({
                name: node.innerText,
                href: node.href
              }))

              subPage.categories.push(res)
            }
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

          const listSecondWraps = await listWrap[j].$$('.list-second-wrap')

          for (let k = 0; k < listSecondWraps.length; k += 1) {
            const res = await listSecondWraps[k].$eval('a', node => ({
              name: node.innerText,
              href: node.href
            }))

            const newPage = await browser.newPage()
            await newPage.goto(res.href)

            const detail = await newPage.$eval('.head-box .head-cell .info', node => node.innerText)

            await browser.close()
            subSubPage.categories.push({
              ...res,
              detail
            })
            await page.waitFor(2500)
            subPage.categories.push(res)
          }
          pageItem.categories.push(subPage)
        }
      }
      result.push(pageItem)
    }

    //  console.log(JSON.stringify(result))



    // 所有的数据爬取完毕后关闭浏览器
    await browser.close()
    log(chalk.green('服务正常结束'))


  } catch (error) {
    // 出现任何错误，打印错误消息并且关闭浏览器
    console.log(error)
    log(chalk.red('服务意外终止'))
    await browser.close()
  } finally {
    // 最后要退出进程
    process.exit(0)
  }
}

main()
