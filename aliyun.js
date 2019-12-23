import puppeteer from 'puppeteer' // 引入Puppeteer
import chalk from 'chalk'
import xlsx from 'node-xlsx';
import * as fs from 'fs'

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
    // await page.goto(
    //   'https://www.aliyun.com/product/list?spm=5176.12825654.h2v3icoap.2.e9392c4ac4aL8r&aly_as=GoymkZ-n'
    //   )
    log(chalk.yellow('页面初次加载完毕'))

    // const res = await page.$$('.product-wrap')

    const result = [{"name":"云计算基础","categories":[{"name":"弹性计算","categories":[{"name":"云服务器","categories":[{"name":"云服务器 ECS","href":"https://www.aliyun.com/product/ecs","detail":"云服务器 ECS（Elastic Compute Service）是一种弹性可伸缩的计算服务，助您降低 IT 成本，提升运维效率，使您更专注于核心业务创新。\n专业的售前技术支持，协助您选择最合适配置方案，详询：95187-1"},{"name":"弹性裸金属服务器（神龙）","href":"https://www.aliyun.com/product/ebm","detail":"弹性裸金属服务器（ECS Bare Metal Instance）是一种可弹性伸缩的高性能计算服务，计算性能与传统物理机无差别，具有安全物理隔离的特点，分钟级的交付周期将提供给您实时的业务响应能力，助力您的核心业务飞速成长。"},{"name":"轻量应用服务器","href":"https://www.aliyun.com/product/swas","detail":"轻量应用服务器 （Simple Application Server），是可快速搭建且易于管理的轻量级云服务器；提供基于单台服务器的应用部署，安全管理，运维监控等服务，一站式提升您的服务器使用体验和效率。\n新用户限时优惠，基础版（新）包年5折，2年以上仅3.5折！       "},{"name":"GPU 云服务器","href":"https://www.aliyun.com/product/ecs/gpu","detail":"GPU云服务器是基于GPU应用的计算服务，多适用于AI深度学习,视频处理，科学计算，图形可视化，等应用场景，型号有AMD S7150， Nvidia M40， Nvidia P100，Nvidia P4，Nvidia V100\n阿里云成为中国首家与NGC GPU加速容器合作的云厂商。\n阿里云GPU GN5实例免费7天试用，再送6折优惠，活动火爆进行中，手慢无！"},{"name":"FPGA 云服务器","href":"https://www.aliyun.com/product/ecs/fpga","detail":"是一款提供了现场可编程门阵列(FPGA)的计算实例，基于阿里云弹性计算框架，用户可以几分钟内轻松创建FPGA实例，创建自定义的专用硬件加速器。由于FPGA硬件的可重配特性，用户可以对已创建的FPGA硬件加速应用，进行快速擦写和重配，达到低时延硬件与弹性伸缩最好的结合。"},{"name":"专有宿主机","href":"https://www.aliyun.com/product/ddh","detail":"专有宿主机提供基于阿里云虚拟化托管、物理主机独享的单租户环境、通过独享硬件资源方式可以满足安全、合规、自定义部署、自带许可证（BYOL）需求，在专有宿主机上可以创建多种规格的ECS实例，继承了ECS实例的规格选择灵活、性能稳定的优点和特性。"}]},{"name":"高性能计算 HPC","categories":[{"name":"超级计算集群","href":"https://www.aliyun.com/product/scc","detail":"超级计算集群（Super Computing Cluster，SCC）使用高速RDMA网络互联的CPU以及GPU等异构加速设备，面向高性能计算、人工智能/机器学习、科学/工程计算、数据分析、音视频处理等应用，提供极致计算性能和并行效率的计算集群服务。"},{"name":"弹性高性能计算 E-HPC","href":"https://www.aliyun.com/product/ehpc","detail":"弹性高性能计算（E-HPC）基于阿里云基础设施，为用户提供一站式公共云HPC/AI平台服务，面向科研，生产，教育和行业大计算，提供快捷，弹性，安全和与阿里云产品互通的云超算平台。"},{"name":"批量计算","href":"https://www.aliyun.com/product/batchcompute","detail":"批量计算（BatchCompute）是一种适用于大规模并行批处理作业的分布式云服务。BatchCompute可支持海量作业并发规模，系统自动完成资源管理，作业调度和数据加载，并按实际使用量计费。BatchCompute广泛应用于电影动画渲染、生物数据分析、多媒体转码、金融保险分析、科学计算等领域。"}]},{"name":"容器服务","categories":[{"name":"容器服务","href":"https://www.aliyun.com/product/containerservice","detail":"容器服务 ACS 提供高性能可伸缩的容器应用管理能力，支持企业级容器化应用的全生命周期管理。整合阿里云虚拟化、存储、网络和安全能力，打造云端最佳容器化应用运行环境。\nGartner竞争格局国内唯一入选，Forrester报告国内排名第一，推荐使用 Kubernetes Service 。"},{"name":"容器服务 Kubernetes 版","href":"https://www.aliyun.com/product/kubernetes","detail":"容器服务 Kubernetes 版（简称 ACK）提供高性能可伸缩的容器应用管理能力，支持企业级容器化应用的全生命周期管理。整合阿里云虚拟化、存储、网络和安全能力，打造云端最佳容器化应用运行环境。\n业内领先：Gartner竞争格局国内唯一入选，Forrester报告国内排名第一。"},{"name":"弹性容器实例 ECI","href":"https://www.aliyun.com/product/eci","detail":"阿里云弹性容器实例（Elastic Container Instance）是 Serverless 和容器化的弹性计算服务。您无需管理底层 ECS 服务器，只需要提供打包好的镜像，即可运行容器，并仅为容器实际运行消耗的资源付费。"},{"name":"容器镜像服务","href":"https://www.aliyun.com/product/acr","detail":"容器镜像服务（Container Registry）提供安全的镜像托管能力，稳定的国内外镜像构建服务，便捷的镜像授权功能，方便用户进行镜像全生命周期管理。容器镜像服务简化了Registry的搭建运维工作，支持多地域的镜像托管，并联合容器服务等云产品，为用户打造云上使用Docker的一体化体验。"}]},{"name":"弹性编排","categories":[{"name":"弹性伸缩","href":"https://www.aliyun.com/product/ess","detail":"弹性伸缩（Auto Scaling），是根据用户的业务需求和策略，经济地自动调整弹性计算资源的管理服务。弹性伸缩不仅适合业务量不断波动的应用程序， 同时也适合业务量稳定的应用程序。"},{"name":"资源编排","href":"https://www.aliyun.com/product/ros","detail":"资源编排（Resource Orchestration）是一种简单易用的云计算资源管理和自动化运维服务。用户通过模板描述多个云计算资源的依赖关系、配置等，并自动完成所有资源的创建和配置，以达到自动化部署、运维等目的。编排模板同时也是一种标准化的资源和应用交付方式，并且可以随时编辑修改，使基础设施即代码（Infrastructure as Code）成为可能。"}]},{"name":"应用托管","categories":[{"name":"Web应用托管服务（Web+）","href":"https://www.aliyun.com/product/webx","detail":"Web应用托管服务（Web+）是一款用来运行并管理Web类、移动类和API类应用程序的PaaS产品。您可以使用Java、Python、Node.js、PHP、Go、Ruby和.NET Core等多种语言编写并构建应用程序。在无需管理底层基础设施的情况下，即可简单、高效、安全而又灵活的对应用进行部署、伸缩、调整和监控。"}]},{"name":"Serverless","categories":[{"name":"函数计算","href":"https://www.aliyun.com/product/fc","detail":"函数计算（Function Compute）是一个事件驱动的全托管 Serverless 计算服务。您无需管理服务器等基础设施，只需编写代码并上传。函数计算会为您准备好计算资源，并以弹性、可靠的方式运行您的代码。\n杜绝冷启动，敬请关注预留实例。"},{"name":"Serverless应用引擎","href":"https://www.aliyun.com/product/sae","detail":"Serverless 应用引擎（Serverless App Engine，简称 SAE）是面向应用的 Serverless PaaS 平台，帮助 PaaS 层用户免运维 IaaS，按需使用，按量计费，实现低门槛微服务应用上云，有效解决成本及效率问题。支持 Spring Cloud、Dubbo 和 HSF 等流行的开发框架，真正实现了 Serverless 架构和微服务架构的完美融合。除了微服务应用外，您还能通过 Docker 镜像部署任何语言的应用。"},{"name":"函数工作流（公测中）","href":"https://www.aliyun.com/product/fnf","detail":"函数工作流（Function Flow，简称 FnF）是一个用来协调多个分布式任务执行的全托管 Serverless 云服务，致力于简化开发和运行业务流程所需要的任务协调、状态管理以及错误处理等繁琐工作，让用户聚焦业务逻辑开发。用户可以用顺序、分支、并行等方式来编排分布式任务，FnF 会按照设定好的顺序可靠地协调任务执行，跟踪每个任务的状态转换，并在必要时执行用户定义的重试逻辑，以确保工作流顺利完成。"}]},{"name":"其他","categories":[{"name":"云桌面","href":"https://www.aliyun.com/product/gws","detail":"云桌面 (Cloud Desktop），是由阿里云所提供的便捷、安全的云上虚拟桌面服务。它支持快速便捷的桌面环境创建、部署、统一管控与运维。无需前期传统硬件投资，帮您快速构建安全、高性能、低成本的桌面办公体系。可广泛应用于具有高数据安全管控、高性能计算等要求的金融、设计、视频、教育等领域。"}]}]},{"name":"存储服务","categories":[{"name":"云存储","categories":[{"name":"对象存储 OSS","href":"https://www.aliyun.com/product/oss","detail":"海量、安全、低成本、高可靠的云存储服务，提供99.9999999999%的数据可靠性。使用RESTful API 可以在互联网任何位置存储和访问，容量和处理能力弹性扩展，多种存储类型供选择全面优化存储成本。\n\nOSS传输加速发布，一站式上传、下载全地域加速 点击查看>>\nOSS“同城冗余ZRS(多可用区)”发布，机房级容灾 立即查看>>"},{"name":"块存储","href":"https://www.aliyun.com/product/disk","detail":"块存储是为云服务器ECS提供的低时延、持久性、高可靠的数据块级随机存储。块存储支持在可用区内自动复制您的数据，防止意外硬件故障导致的数据不可用，保护您的业务免于组件故障的威胁。就像对待硬盘一样，您可以对挂载到ECS实例上的块存储做分区、创建文件系统等操作，并对数据持久化存储。\n\n1.44元起，快照服务让您ECS数据全年无忧 立即查看>>"},{"name":"文件存储 NAS","href":"https://www.aliyun.com/product/nas","detail":"阿里云文件存储NAS是一个可共享访问，弹性扩展，高可靠，高性能的分布式文件系统。兼容POSIX 文件接口，可支持数千台计算节点共享访问，可以挂载到弹性计算ECS、神龙裸金属、容器服务ACK、弹性容器ECI、批量计算BCS、高性能计算EHPC，AI训练PAI等计算业务上提供高性能的共享存储，用户无需修改应用程序，即可无缝迁移业务系统上云。"},{"name":"文件存储 CPFS","href":"https://www.aliyun.com/product/nas_cpfs","detail":"文件存储CPFS (Cloud Parallel File Storage)，是阿里云完全托管、可扩展的并行文件存储系统，针对高性能计算场景的性能要求进行了深度优化，提供对数据毫秒级的访问和高聚合IO、高IOPS的数据读写请求，可以用于AI深度训练、自动驾驶、基因计算、EDA仿真、石油勘探，气象分析，机器学习，大数据分析以及影视渲染等业务场景中。"},{"name":"文件存储 HDFS（公测中）","href":"https://www.aliyun.com/product/alidfs","detail":"阿里云文件存储HDFS（Apsara File Storage for HDFS）提供标准的HDFS访问协议，用户无需对现有大数据分析应用做任何修改，即可使用具备无限容量及性能扩展、单一命名空间、高可靠和高可用等特性的分布式文件系统。"},{"name":"归档存储","href":"https://www.aliyun.com/product/oss","detail":"海量、安全、低成本、高可靠的云存储服务，提供99.9999999999%的数据可靠性。使用RESTful API 可以在互联网任何位置存储和访问，容量和处理能力弹性扩展，多种存储类型供选择全面优化存储成本。\n\nOSS传输加速发布，一站式上传、下载全地域加速 点击查看>>\nOSS“同城冗余ZRS(多可用区)”发布，机房级容灾 立即查看>>"}]},{"name":"智能存储","categories":[{"name":"智能云相册（公测中）","href":"https://www.aliyun.com/product/cloudphoto","detail":"智能云相册（Cloud Photos）是阿里云为影像类应用提供的一站式解决方案。智能云相册除了提供影像文件存储、管理等基础功能以外，还支持对影像内容进行分类打标、面孔识别等智能分析，并提供基于自然语言理解的智能搜索服务。"},{"name":"智能媒体管理","href":"https://www.aliyun.com/product/imm","detail":"场景化封装数据智能分析管理。为云上的文档、图片数据，提供一站式数据处理、分析、检索等管控体验。针对不同的业务场景，封装整合完整的处理能力，让数据快速流转。\n与对象存储OSS打通一键文档预览，数据处理"}]},{"name":"混合云存储","categories":[{"name":"云存储网关","href":"https://www.aliyun.com/product/hcs","detail":"云存储网关以阿里云OSS为后端存储，为企业应用提供行业标准的文件存储和块存储服务。云存储网关可以部署在客户数据中心或阿里云上，帮助客户简化存储管理，实现企业应用和阿里云存储服务的无缝对接。"},{"name":"混合云存储阵列","href":"https://www.aliyun.com/product/hgw","detail":"集成了阿里云云存储网关的企业级统一存储阵列，可以像使用本地存储一样使用和管理本地和云端的各种存储资源（块、文件和对象），本地存储通过云缓存、云同步、云分层、云备份等方式无缝连通云存储。混合云存储阵列和云存储服务相结合提供了一种经济高效，易于管理的混合云存储解决方案。"}]}]},{"name":"CDN与边缘","categories":[{"name":"CDN","href":"https://www.aliyun.com/product/cdn","detail":"将源站内容分发至最接近用户的节点，使用户可就近取得所需内容，提高用户访问的响应速度和成功率。\n解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。"},{"name":"安全加速 SCDN","href":"https://www.aliyun.com/product/scdn","detail":"在线游戏整个游戏过程依赖内容加速CDN服务，保证下载以及性能稳定；同时游戏行业频繁受到流量攻击干扰。SCDN安全加速，兼顾内容加载速度提升，保证跨网、多终端流畅运营的同时，可以避免因受频繁攻击导致的站点故障、玩家体验下滑、用户流失以及企业损失。"},{"name":"全站加速 DCDN","href":"https://www.aliyun.com/product/dcdn","detail":"电商平台包含众多线上系统和环节，用户注册、登录、浏览商品、购物结算等，网络访问速度及内容安全传输成为衡量消费体验的重要指标。电商类客户属于动静内容混合站点，同时需要应对在线支付 、秒杀、促销推广等站点响应时间慢、源站压力大等问题。"},{"name":"PCDN","href":"https://www.aliyun.com/product/pcdn","detail":"以P2P技术为基础，通过挖掘利用边缘网络海量碎片化闲置资源而构建的低成本高品质内容分发网络服务。客户通过集成PCDN SDK接入该服务后，能获得等同或高于CDN的分发质量，同时显著降低分发成本。适用于视频点播、直播、大文件下载等业务场景。"},{"name":"边缘节点服务 ENS","href":"https://www.aliyun.com/product/ens","detail":"边缘节点服务（Edge Node Service, ENS）基于运营商边缘节点和网络构建，一站式提供“融合、开放、联动、弹性”的分布式算力资源，帮助用户业务下沉至运营商侧边缘，有效降低计算时延和成本。(答疑钉钉群21740823)"}]},{"name":"数据库","categories":[{"name":"关系型数据库","categories":[{"name":"云数据库 POLARDB","href":"https://www.aliyun.com/product/polardb","detail":"POLARDB是阿里巴巴自主研发的下一代关系型分布式云原生数据库，目前兼容三种数据库引擎：\nMySQL、PostgreSQL、高度兼容Oracle语法。 计算能力最高可扩展至1000核以上，存储容量最\n高可达 100T。经过阿里巴巴双十一活动的最佳实践，让用户既享受到开源的灵活性与价格，又享\n受到商业数据库的高性能和安全性。\n同一用户首次购买，可享MySQL引擎2核8G规格免费或4核16G规格30元，1个月试用福利，限一台。\n同一用户首次购买，通过申请，即享兼容Oracle语法引擎，2核8G规格30元，6个月试用福利，限一台。\n同一用户首次购买，可享PG引擎2核8G规格30元，1个月试用福利，限一台。"},{"name":"云数据库 RDS MySQL 版","href":"https://www.aliyun.com/product/rds/mysql","detail":"MySQL 是全球最受欢迎的开源数据库之一，作为开源软件组合 LAMP（Linux + Apache + MySQL + Perl/PHP/Python）\n中的重要一环，广泛应用于各类应用场景。"},{"name":"云数据库 RDS MariaDB TX 版","href":"https://www.aliyun.com/product/rds/mariadb","detail":"基于MariaDB企业版全球独家合作认证，提供Oracle兼容性及众多企业级数据库特性。支持包括MySQL InnoDB等多种存储引擎，为不同需求的用户提供灵活的选择。\n【降价优惠】云数据库HBase优惠活动全面进行中，低至1元包年，欢迎选购！"},{"name":"云数据库 RDS SQL Server 版","href":"https://www.aliyun.com/product/rds/sqlserver","detail":"SQL Server是发行最早的商用数据库产品之一，支持复杂的SQL查询，性能优秀，对基于Windows平台.NET架构的应用程序具有完美的支持。\n【双12年末采购节】RDS爆款2折起，最高再减12000元，更有机会领淘宝红包，超多惊喜等您拿！"},{"name":"云数据库 RDS PostgreSQL 版","href":"https://www.aliyun.com/product/rds/postgresql","detail":"PostgreSQL被业界誉为“最先进的开源数据库”，面向企业复杂SQL的OLTP业务场景，支持NoSQL数据类型（JSON/XML/hstore）、\n提供阿里云自研Ganos多维多模时空信息引擎，及PostGIS地理信息引擎。\n【双12年末采购节】RDS爆款2折起，最高再减12000元，更有机会领淘宝红包，超多惊喜等您拿！"},{"name":"云数据库 RDS PPAS 版","href":"https://www.aliyun.com/product/rds/ppas","detail":"云数据库PPAS版，基于PostgreSQL，高度兼容Oracle语法，由阿里云与EnterpriseDB公司合作提供，兼容范围涵盖：PL/SQL、数据类型、高级函数、表分区等，配合阿里云ADAM应用及数据库迁移工具，让企业数据库轻松上云。"},{"name":"分布式关系型数据库服务 DRDS","href":"https://www.aliyun.com/product/drds","detail":"DRDS 是阿里巴巴集团自主研发的分布式数据库中间件产品，专注于解决单机关系型数据库扩展性问题，具备轻量(无状态)、灵活、稳定、高效等特性，稳定运行11年，经历历届双十一核心交易业务和各类行业业务的考验，是您值得信赖的选择。\n【双12年末采购节】RDS爆款2折起，最高再减12000元，更有机会领淘宝红包，超多惊喜等您拿！"}]},{"name":"NoSQL数据库","categories":[{"name":"云数据库 Redis 版","href":"https://www.aliyun.com/product/kvstore","detail":"高可靠双机热备架构及可无缝扩展的集群架构，满足高读写性能场景及容量需弹性变配的业务需求。"},{"name":"云数据库 MongoDB 版","href":"https://www.aliyun.com/product/mongodb","detail":"云数据库MongoDB版支持ReplicaSet和Sharding两种部署架构，具备安全审计，时间点备份等多项企业能力。在互联网、物联网、游戏、金融等领域被广泛采用。"},{"name":"TSDB 时序时空数据库","href":"https://www.aliyun.com/product/hitsdb","detail":"阿里云时间序列数据库 ( Time Series Database , 简称 TSDB) 是一种集时序数据高效读写，压缩存储，实时计算能力为一体的数据库服务，可广泛应用于物联网和互联网领域，实现对设备及业务服务的实时监控，实时预测告警。\n【双12年末采购节】RDS爆款2折起，最高再减12000元，更有机会领淘宝红包，超多惊喜等您拿！"},{"name":"云数据库 HBase 版","href":"https://cn.aliyun.com/product/hbase","detail":"面向大数据领域的一站式NoSQL服务，100%兼容开源HBase并深度扩展，支持海量数据下的实时存储、高并发吞吐、轻SQL分析、全文检索、时序时空查询等能力，是风控、推荐、广告、物联网、车联网、Feeds流、数据大屏等场景首选数据库，是为淘宝、支付宝、菜鸟等众多阿里核心业务提供关键支撑的数据库。\n【限时优惠】云数据库HBase优惠活动全面进行中，低至1元包年，欢迎选购！\n【双12年末采购节】RDS爆款2折起，最高再减12000元，更有机会领淘宝红包，超多惊喜等您拿！"},{"name":"图数据库 GDB（公测中）","href":"https://www.aliyun.com/product/gdb","detail":"图数据库（Graph Database, 简称GDB）是一种支持属性图模型，用于处理高度连接数据查询与存储的实时可靠的在线数据库，支持 TinkerPop Gremlin 查询语言，可以帮助用户快速构建基于高度连接的数据集的应用程序。"},{"name":"云数据库 Memcache 版","href":"https://www.aliyun.com/product/ocs","detail":"云数据库 Memcache 版（ ApsaraDB for Memcache ）是一种高性能、高可靠、可平滑扩容的分布式内存数据库服务。基于飞天分布式系统及高性能存储，并提供了双机热备、故障恢复、业务监控、数据迁移等方面的全套数据库解决方案。"},{"name":"表格存储 TableStore","href":"https://www.aliyun.com/product/ots","detail":"表格存储（Tablestore）是阿里云自研的面向海量结构化数据存储的Serverless NoSQL多模型数据库，被广泛用于社交、物联网、人工智能、元数据和大数据等业务场景。提供兼容HBase的WideColumn模型、消息模型Timeline以及时空模型Timestream，可提供PB级存储、千万TPS以及毫秒级延迟的服务能力。"}]},{"name":"数据仓库","categories":[{"name":"分析型数据库 MySQL版","href":"https://www.aliyun.com/product/ads","detail":"分析型数据库MySQL版（AnalyticDB for MySQL）是一种高并发低延时的PB级实时数据仓库，全面兼容MySQL协议以及SQL:2003 语法标准，可以毫秒级针对万亿级数据进行即时的多维分析透视和业务探索。欢迎加入云数据仓库-开发者钉钉交流群：23128105。\n3.0 版本活动进行中：12月31日前，8节点内首月1元（限首购，转续费月付8折，1年付7折）！\n【双12年末采购节】RDS爆款2折起，最高再减12000元，更有机会领淘宝红包，超多惊喜等您拿！"},{"name":"分析型数据库 PostgreSQL版","href":"https://www.aliyun.com/product/gpdb","detail":"简单易用、海量扩展的高性能企业级数据仓库服务 AnalyticDB for PostgreSQL （原HybridDB for PostgreSQL），基于开源数据库Greenplum构建，由阿里云深度扩展，支持标准 SQL 2003，高度兼容 Oracle 语法生态，既支持任意维度在线分析探索，也支持高性能离线数据处理，是各行业有竞争力的PB级实时数据仓库方案。"},{"name":"HybridDB for MySQL","href":"https://www.aliyun.com/product/petadata","detail":"云数据库HybridDB for MySQL （原名PetaData）是同时支持海量数据在线事务（OLTP）和在线分析（OLAP）的HTAP（Hybrid Transaction/Analytical Processing）关系型数据库。"},{"name":"Data Lake Analytics","href":"https://www.aliyun.com/product/datalakeanalytics","detail":"Data Lake Analytics是Serverless化的交互式联邦查询服务。无需ETL，使用标准SQL即可分析与集成对象存储(OSS)、数据库(PostgreSQL/MySQL等)、NoSQL(TableStore等)数据源的数据"}]},{"name":"数据库管理","categories":[{"name":"混合云数据库管理 HDM（公测中）","href":"https://www.aliyun.com/product/hdm","detail":"混合云数据库管理 （Hybrid Cloud Database Management， 简称HDM) 是混合云数据库管理平台，帮助企业打通混合云数据库架构，提供多环境、多数据库的统一监控、告警、诊断优化的能力。\n3分钟统一监控云下和云上的数据库>>            慢SQL监控和优化，如此简单>>"},{"name":"数据管理 DMS","href":"https://www.aliyun.com/product/dms","detail":"数据管理DMS是基于阿里巴巴集团十余年的数据库服务平台的云版本，提供免安装、免运维、即开即用、多种数据库类型与多种环境统一的web数据库管理终端；可以为企业用户快速复制搭建与阿里集团同等安全、高效、规范的数据库DevOps研发流程解决方案。"}]},{"name":"数据库专家服务","categories":[{"name":"数据库专家服务（公测中）","href":"https://www.aliyun.com/product/dbes","detail":"以工具与数据库专业技能结合的方式，给客户提供云数据库产品本身能力范围之外的专业的数据库专家服务，主要包括：紧急救援，健康诊断、性能调优、护航保障、Oracle迁移、技术培训、顾问咨询等服务"}]}]},{"name":"云通信","categories":[{"name":"短信服务","href":"https://www.aliyun.com/product/sms","detail":"短信服务（Short Message Service）是阿里云为用户提供的一种通信服务的能力。\n支持国内和国际快速发送验证码、短信通知和推广短信，服务范围覆盖全球200多个国家和地区。\n国内短信支持三网合一专属通道，与工信部携号转网平台实时互联。电信级运维保障，实时监控自动切换，\n到达率高达99%。完美支撑双11期间20亿短信发送，6亿用户触达。"},{"name":"语音服务","href":"https://www.aliyun.com/product/vms","detail":"语音服务（Voice Messaging Service），是阿里云为了方便用户使用语音能力，联合运营商提供稳定可靠、安全可信的云通信服务。包含语音通知、语音验证码等丰富的PaaS/SaaS产品，具备高可用、高并发、高质量、一站式接入的优势。 注：服务开通需要按照运营商要求进行实名登记及话术审核、备案。"},{"name":"流量服务","href":"https://www.aliyun.com/product/cdps","detail":"流量服务（Cellular Data Package）是阿里云为用户提供的一种通信服务的能力，包括流量充值（通用流量）和定向流量。流量充值基于手机流量充值，支持用户开展营销活动；定向流量针对固定APP提供超低资费的定向流量包，用于提高APP用户活跃。"},{"name":"物联网无线连接服务","href":"https://www.aliyun.com/product/olddyiot","detail":"物联网无线连接服务是基于三大运营商（移动、联通、电信）提供物联网专用号段（11位或13位）的移动通信接入业务，该业务支持无线数据通信和物联网场景的配套行业解决方案，用户各种物联网设备的应用场景，如车联网、智能家居、穿戴设备、多媒体网络支撑、环境监测，和智慧农业等。\n邀您参加 物联网无线连接服务 问卷调查，我们将对优质客户提供专属服务。"},{"name":"号码隐私保护","href":"https://www.aliyun.com/product/pls","detail":"号码隐私保护(Phone Number Protection)是一款基于基础运营商通信网络能力的互联网产品，企业客户可以通过集成号码隐私保护能力，为其平台用户提供隐私通话服务，同时可以通过录音来对其服务质量进行分析，提升产品安全性及平台价值。"},{"name":"号码认证服务（公测中）","href":"https://www.aliyun.com/product/dypns","detail":"号码认证服务（Phone Number Verification Service）整合三大运营商特有的网关认证能力，一步验证手机号码和应用所在的手机SIM卡号码的一致性，升级短信验证码体验，并提供仅限本机操作的防控，安全高效。"},{"name":"云通信网络加速（公测中）","href":"https://www.aliyun.com/product/snsu","detail":"云通信网络加速服务协同网络运营商的网络加速能力和可用空闲带宽，为应用按需提供有效的带宽和速率提升，降低端到端时延，提高应用在运营商网络内的QoS，适用于游戏、直播、在线教育、视频监控、文件上传以及点播等场景。"}]},{"name":"网络","categories":[{"name":"云上网络","categories":[{"name":"专有网络 VPC","href":"https://www.aliyun.com/product/vpc","detail":"帮助您基于阿里云构建出一个隔离的网络环境，并可以自定义IP 地址范围、网段、路由表和网关等；此外，也可以通过专线/VPN/GRE等连接方式实现云上VPC与传统IDC的互联，构建混合云业务。"},{"name":"云解析 PrivateZone","href":"https://www.aliyun.com/product/pvtz","detail":"云解析 PrivateZone，是基于阿里云专有网络VPC（Virtual Private Cloud）环境的私有域名解析和管理服务。可以在自定义的一个或多个专有网络中快速构建DNS系统，实现私有域名映射到IP资源地址。"},{"name":"负载均衡 SLB","href":"https://www.aliyun.com/product/slb","detail":"对多台云服务器进行流量分发的负载均衡服务，可以通过流量分发扩展应用系统对外的服务能力，通过消除单点故障提升应用系统的可用性。"},{"name":"NAT 网关","href":"https://www.aliyun.com/product/nat","detail":"帮助您在VPC环境下构建一个公网流量的出入口，通过自定义SNAT，DNAT规则灵活使用网络资源，支持多IP，支持共享公网带宽。"},{"name":"弹性公网 IP","href":"https://www.aliyun.com/product/eip","detail":"独立的公网IP资源，可以绑定到阿里云专有网络VPC类型的ECS、NAT网关、私网负载均衡SLB上，并可以动态解绑，实现公网IP和ECS、NAT网关、SLB的解耦，满足灵活管理的要求。"},{"name":"IPv6 转换服务（公测中）","href":"https://www.aliyun.com/product/ipv6trans","detail":"IPv6转换服务（IPv6 Translation Service）可实现IPv6与IPv4网络地址转换。通过IPv6转换服务，您原有的IPv4业务可快速为IPv6用户提供访问能力。"},{"name":"共享带宽","href":"https://www.aliyun.com/product/cbwp","detail":"提供地域级带宽共享和复用功能，支持同地域下所有弹性公网IP共享带宽，进而让绑定EIP的ECS、NAT网关、负载均衡同时共享带宽，并提供包括按小时、带宽峰值、增强型95、传统95等多种计费模式。"},{"name":"共享流量包","href":"https://www.aliyun.com/product/flowbag","detail":"共享流量包套餐价格实惠，提供免费试用套餐；产品覆盖面广，可供按流量计费的ECS、EIP、SLB和NAT网关使用；使用简单，流量包开通后自动覆盖多个地域的产品，并自动抵扣流量费用。"}]},{"name":"跨地域网络","categories":[{"name":"云企业网","href":"https://www.aliyun.com/product/cbn","detail":"阿里云致力于为用户提供优质、高效、稳定的网络传输环境，云企业网（Cloud Enterprise Network）将提供一种能够快速构建混合云和分布式业务系统的全球网络，帮助用户打造一张具有企业级规模和通信能力的云上网络。年中大促进行中，低至5折起"}]},{"name":"混合云网络","categories":[{"name":"VPN 网关","href":"https://www.aliyun.com/product/vpn","detail":"VPN网关是一款基于Internet，通过加密通道将企业数据中心、企业办公网络、或internet终端和阿里云专有网络(VPC)安全可靠连接起来的服务。阿里云VPN网关在国家相关政策法规下提供服务，不提供访问Internet功能。"},{"name":"智能接入网关（邀测中）","href":"https://www.aliyun.com/product/smartag","detail":"智能接入网关（Smart Access Gateway）是阿里云提供的一站式快速上云解决方案。企业可通过智能接入网关实现Internet就近加密接入，获得更加智能、更加可靠、更加安全的上云体验。"},{"name":"高速通道","href":"https://www.aliyun.com/product/expressconnect","detail":"帮助不同网络环境间实现高速、稳定、安全的私网通信。物理专线连接实现云下IDC专线接入云上，提高网络拓扑灵活性和跨网通信质量；高速上云服务（ECC）基于阿里云智能接入网关的硬件能力和SD-WAN技术，为客户提供整合运营商物理专线的高可靠、高性能、低时延的一站式上云服务；对等连接实现云上跨地域/跨用户的VPC内网互通。"}]}]}]},{"name":"安全","categories":[{"name":"云安全","categories":[{"name":"DDoS高防IP","href":"https://www.aliyun.com/product/ddos","detail":"DDoS高防IP是针对互联网服务器（包括非阿里云主机）在遭受大流量DDoS攻击后导致服务不可用的情况下，推出的付费服务，用户可通过配置高防IP，将攻击流量引流到高防IP，确保源站的稳定可靠。详询95187-1\nDDoS高防产品托管服务，点击了解>>   "},{"name":"Web应用防火墙","href":"https://www.aliyun.com/product/waf","detail":"对网站或者APP的业务流量进行恶意特征识别及防护，将正常、安全的流量回源到服务器。避免网站服务器被恶意入侵，保障业务的核心数据安全，解决因恶意攻击导致的服务器性能异常问题。详询95187-1\n【”迎考“等保2.0】点击领取阿里云等保大礼包"},{"name":"SSL 证书","href":"https://www.aliyun.com/product/cas","detail":"SSL证书（SSL Certificates）为网站和移动应用（APP）提供HTTPS保护，对Web流量加密，防止数据遭窃取和篡改。阿里云提供完善的运维功能，支持将第三方证书上传管理，支持一键部署证书到CDN、负载均衡（SLB）、OSS等云产品，轻松集中运维大量证书。云上已有数百万网站使用SSL证书来保护数据传输，向访客证明网站和APP可靠和值得信赖。\n【重要】最新版chrome/safari/firefox浏览器地址栏不再显示EV证书的公司名称，其他浏览器不受影响。"},{"name":"云安全中心（态势感知）","href":"https://www.aliyun.com/product/sas","detail":"云安全中心是一个实时识别、分析、预警安全威胁的统一安全管理系统，通过防勒索、防病毒、防篡改、合规检查等安全能力，\n帮助用户实现威胁检测、响应、溯源的自动化安全运营闭环，保护云上资产和本地主机并满足监管合规要求。详询95187-1\n登录控制台"},{"name":"云防火墙","href":"https://www.aliyun.com/product/cfw","detail":"集中管理公网IP的访问策略，内置威胁入侵防御模块(IPS)，支持失陷主机检测、主动外联行为的阻断、业务间访问关系可视，留存6个月网络流量日志，等保必备。"},{"name":"堡垒机","href":"https://www.aliyun.com/product/bastionhost","detail":"集中管理资产权限，全程记录操作数据，实时还原运维场景，助力企业用户构建云上统一、安全、高效运维通道；保障云端运维工作权限可管控、操作可审计、合规可遵从。\n咨询电话:95187转1"},{"name":"漏洞扫描","href":"https://www.aliyun.com/product/wti","detail":"以企业IT资产为核心，提供全面、快速、精准的漏洞扫描及风险监测服务，帮助企业持续地发现暴露在互联网边界上的常见安全风险。 漏洞扫描支持单次扫描，点击了解>>"},{"name":"操作审计（公测中）","href":"https://www.aliyun.com/product/actiontrail","detail":"操作审计(ActionTrail)会记录您的云账户资源操作，提供操作记录查询，并可以将审计事件保存到您指定的日志服务Logstore或者OSS存储空间。利用ActionTrail保存的所有操作记录，您可以实现安全分析、资源变更追踪以及合规性审计。"},{"name":"云安全中心（安骑士）","href":"https://www.aliyun.com/product/aegis","detail":"安骑士全新升级为云安全中心高级版，立刻查看\n云安全中心高级版（服务器安全护卫），增加安全评分，安全报告，云安全最佳实践等功能。 支持查杀病毒木马，勒索软件，挖矿病毒，实时监控进程可疑行为，网站后门，主机异常事件，敏感文件篡改，异常网络连接，异常账号，应用入侵事件。（安骑士企业版保有用户可提工单进行全新升级）"}]},{"name":"身份管理","categories":[{"name":"访问控制","href":"https://www.aliyun.com/product/ram","detail":"RAM 使您能够安全地集中管理对阿里云服务和资源的访问。您可以使用 RAM 创建和管理用户和组，并使用各种权限来允许或拒绝他们对云资源的访问。"},{"name":"应用身份服务（公测中）","href":"https://www.aliyun.com/product/idaas","detail":"应用身份服务（IDaaS）是一个集中式身份管理服务，为政企客户提供统一的应用门户、用户目录、单点登录、集中授权、以及行为审计等中台服务。"}]},{"name":"数据安全","categories":[{"name":"数据库审计","href":"https://www.aliyun.com/product/dbaudit","detail":"智能解析数据库通信流量，细粒度审计数据库访问行为，帮助企业精准识别、记录云上数据安全威胁，为云端数据库提供全方位的安全、诊断、维护及合规能力。企业上云等级保护最佳实践\n\n咨询电话:95187转1\n\n【”迎考“等保2.0】点击领取阿里云等保大礼包"},{"name":"加密服务","href":"https://www.aliyun.com/product/hsm","detail":"加密服务基于国家密码局认证的硬件加密机，提供了云上数据加解密解决方案，用户能够对密钥进行安全可靠的管理，也能使用多种加密算法来对云上业务的数据进行可靠的加解密运算"},{"name":"敏感数据保护","href":"https://cn.aliyun.com/product/sddp","detail":"敏感数据保护是一款发现、分类和保护敏感数据的阿里云安全服务。该服务从海量数据中自动发现，记录并分析敏感数据的使用情况，及时发现数据使用是否存在安全违规并对其进行风险预警，帮助用户防止数据泄露和满足GDPR等合规要求。"},{"name":"密钥管理服务","href":"https://www.aliyun.com/product/kms","detail":"密钥管理服务（KMS）提供安全合规的密钥托管和密码服务，助您轻松使用密钥来加密保护敏感的数据资产，控制云上的分布式计算和存储环境。您可以追踪密钥的使用情况，配置密钥的自动轮转策略，以及利用托管密码机所具备的中国国家密码管理局或者FIPS认证资质，来满足您的监管合规需求。"}]},{"name":"业务安全","categories":[{"name":"游戏盾","href":"https://www.aliyun.com/product/GameShield","detail":"革命性网络安全产品，精准定位黑客并完成风险隔离，彻底解决APP类业务的DDoS/CC攻击问题！"},{"name":"内容安全","href":"https://www.aliyun.com/product/lvwang","detail":"内容安全基于深度学习技术， 提供图片、视频、语音、文字等多媒体的内容风险智能识别服务，不仅能帮助用户降低色情、暴恐、涉政等违规风险，而且能大幅度降低人工审核成本。\n"},{"name":"风险识别","href":"https://www.aliyun.com/product/saf","detail":"阿里巴巴十余年业务风险管控最佳实践。基于大数据、流式计算、机器学习算法，为客户提供决策引擎平台、风险识别API、专家定制建模等多维风控服务，一站式解决企业在用户注册、运营活动、交易、信贷审核等关键业务中所遇到的欺诈问题。"},{"name":"实人认证","href":"https://www.aliyun.com/product/cloudauth","detail":"依托活体检测、人脸比对等生物识别技术、证件 OCR 识别技术等进行的自然人真实身份的核验服务。（只针对企业用户开放）"},{"name":"爬虫风险管理","href":"https://www.aliyun.com/product/antibot","detail":"专业检测高级爬虫，降低爬虫、自动化工具对网站的业务影响，提供对Web网页端/H5页面/APP/API全方位防护。主要防护场景：航空占座、电商黄牛、恶意撞库、核心接口被刷、刷票刷积分、游戏作弊等。详情咨询请联系：95187-1。"}]},{"name":"安全服务","categories":[{"name":"安全管家","href":"https://www.aliyun.com/product/sos","detail":"阿里云安全管家服务是阿里云安全专家基于阿里云多年安全最佳实践经验为云上用户提供的全方位安全技术和咨询服务，为云上用户建立和持续优化云安全防御体系，保障用户业务安全。"},{"name":"渗透测试","href":"https://www.aliyun.com/product/pt","detail":""},{"name":"安全众测","href":"https://www.aliyun.com/product/xianzhi","detail":"先知平台提供私密的安全众测服务，可帮助企业全面发现业务漏洞及风险，按效果付费。企业加入先知平台后，可自主发布奖励计划，激励先知平台的安全专家来测试和提交企业自身网站或业务系统的漏洞，保证安全风险可以快速进行响应和修复，防止造成更大的业务损失。相比传统渗透测试，先知具有测试效率高、测试人员多、测试效果好、性价比高等优势。"},{"name":"等保咨询","href":"https://www.aliyun.com/product/xianzhi/mlpse","detail":"整合云盾产品的技术优势，联合阿里云的各地等保咨询合作机构，为您提供等保2.0测评的咨询指导，帮助客户更快地完成等保整改工作。"},{"name":"应急响应","href":"https://www.aliyun.com/product/yundun_incident_response","detail":"安全应急响应服务是由阿里云与授权安全合作伙伴提供的黑客入侵事件处理服务，能够帮助用户正确应对黑客入侵事件，清理木马后门、分析入侵原因，降低安全事件带来的损失，帮助客户快速恢复业务。"},{"name":"安全培训","href":"https://www.aliyun.com/product/xianzhi_securitytrain","detail":"根据企业具体情况与需求，定制个性化的安全培训课程计划，帮助企业人员了解并掌握相关安全知识。通过培训，帮助企业在研发和运维过程中尽量避免由于安全知识的匮乏而造成信息安全事故。"},{"name":"安全评估","href":"https://www.aliyun.com/product/xianzhi_online_car-hailing","detail":"未经安全评估的系统可能存在大量的安全漏洞，对客户的业务带来巨大的损失。企业需要在业务系统上线时进行安全风险排查，免遭黑客入侵。安全评估服务，由阿里云认证的专业安全技术合作伙伴对系统进行全面的安全隐患排查，从技术角度分析出业务中存在的安全问题，并指导客户进行加固和修复。"},{"name":"代码审计","href":"https://www.aliyun.com/product/xianzhi_codeaudit","detail":"检查源代码中的缺点和错误信息，分析并找到这些问题引发的安全漏洞，并提供代码修订措施和建议。由阿里云认证的合作伙伴提供专业服务。"},{"name":"安全加固","href":"https://www.aliyun.com/product/xianzhi_securityconsolidate","detail":"在客户授权委托的情况下，远程登录得到客户的业务系统服务器上，对外网或内网主机进行全方位的基线加固和组件升级，提前修补系统潜在的各种高危漏洞和安全威胁。由阿里云认证的合作伙伴提供专业服务。"},{"name":"安全通告","href":"https://www.aliyun.com/product/xianzhi_SecurityNotificationService","detail":"实时监测、周期性度量风险隐患，您可以根据通告信息，轻松掌握自有IT资产的安全漏洞状态，及时跟踪修补IT资产漏洞，提高企业脆弱性管理能力。\n本服务由阿里云合作伙伴提供"},{"name":"PCI DSS合规咨询","href":"https://www.aliyun.com/product/xianzhi_PCIDSS","detail":"PCI DSS对于所有涉及支付卡行业的安全方面作出标准的要求，其中包括安全管理、策略、过程、网络体系结构、软件设计的要求的列表等，全面保障交易安全。阿里云联合认证的合作伙伴提供专业服务。"}]}]},{"name":"大数据","categories":[{"name":"大数据计算","categories":[{"name":"MaxCompute","href":"https://www.aliyun.com/product/odps","detail":"MaxCompute（原ODPS）是一项大数据计算服务，它能提供快速、完全托管的PB级数据仓库解决方案，使您可以经济并高效的分析处理海量数 据。欢迎加入钉钉交流群11782920。\nMaxCompute 邀您参加问卷调研，有机会获赠100元无门槛代金券 >>"},{"name":"E-MapReduce","href":"https://www.aliyun.com/product/emapreduce","detail":"阿里云 E-MapReduce (EMR) 是构建在阿里云云服务器 ECS 上的开源 Hadoop、Spark、HBase、Hive、Flink 生态大数据 PaaS 产品。提供用户在云上使用开源技术建设数据仓库、离线批处理、在线流式处理、即时查询、机器学习等场景下的大数据解决方案。欢迎加入钉钉产品交流群：21784001，钉钉团队号：HPRX8117"},{"name":"实时计算","href":"https://data.aliyun.com/product/sc","detail":"实时计算（Alibaba Cloud Realtime Compute，Powered by Ververica）是阿里云提供的基于 Apache Flink 构建的企业级大数据计算平台。在 PB 级别的数据集上可以支持亚秒级别的处理延时，赋能用户标准实时数据处理流程和行业解决方案；支持 Datastream API 作业开发，提供了批流统一的 Flink SQL，简化 BI 场景下的开发；可与用户已使用的大数据组件无缝对接，更多增值特性助力企业实时化转型。"}]},{"name":"数据可视化","categories":[{"name":"DataV数据可视化","href":"https://data.aliyun.com/visual/datav","detail":"DataV旨让更多的人看到数据可视化的魅力，帮助非专业的工程师通过图形化的界面轻松搭建专业水准的可视化应用，满足您会议展览、业务监控、风险预警、地理信息分析等多种业务的展示需求。"}]},{"name":"大数据搜索与分析","categories":[{"name":"开放搜索","href":"https://www.aliyun.com/product/opensearch","detail":"开放搜索（OpenSearch）是阿里巴巴自主研发的大规模分布式搜索引擎平台，其核心引擎HA3（问天3）系统为包括淘宝、天猫在内的阿里集团核心业务提供搜索服务支持。通过集成智能查询语义理解、机器学习排序算法等能力，旨在为企业提供高搜索质量的一站式内容智能搜索服务。\n填写问卷，获取专家咨询>>"},{"name":"日志服务","href":"https://www.aliyun.com/product/sls","detail":"行业领先的日志大数据解决方案，一站式提供数据收集、清洗、分析、可视化和告警功能。\n全面提升海量日志处理能力，实时挖掘数据价值，智能助力研发/运维/运营/安全等场景。"},{"name":"Elasticsearch","href":"https://data.aliyun.com/product/elasticsearch","detail":"提供100%兼容开源Elasticsearch的功能，以及Security、Machine Learning、Graph、APM等商业功能，致力于数据分析、数据搜索等场景服务。与开源社区背后商业公司Elastic战略合作，为客户提供企业级权限管控、安全监控告警、自动报表生成等场景服务。\n参加Elasticsearch产品满意度调研，说出您的心声，有机会收获200元无门槛代金券>>填写问卷>>"},{"name":"关系网络分析","href":"https://data.aliyun.com/product/graphanalytics","detail":"I+关系网络分析，以OLP模型为核心，面向业务快速建模，为开发者和终端用户提供大数据关系计算引擎（含API服务）和可视化交互分析能力，在阿里巴巴、蚂蚁金服集团内广泛应用于反欺诈、反作弊、反洗钱等风控业务，面向安防、关税、银行、保险、互联网等提供完整的产品化方案。"},{"name":"Quick BI","href":"https://data.aliyun.com/product/bi","detail":"Quick BI 专为云上用户量身打造的新一代智能BI服务平台。\n目前提供QBI标准版和高级版30天免费试用，点此查看试用说明。"}]},{"name":"数据开发","categories":[{"name":"DataWorks","href":"https://data.aliyun.com/product/ide","detail":"DataWorks是一个提供了大数据OS能力、并以all in one box的方式提供专业高效、安全可靠的一站式大数据智能云研发平台。 同时能满足用户对数据治理、质量管理需求，赋予用户对外提供数据服务的能力。\n首月99元，体验DataWorks标准版强大功能\n参与产品满意度调研，赢取200元无门槛代金券"},{"name":"Dataphin（公测中）","href":"https://www.aliyun.com/product/dataphin","detail":"面向各行各业大数据建设、管理及应用诉求，一站式提供从数据接入到数据消费全链路的智能数据构建与管理的大数据能力，包括产品、技术和方法论等，助力打造标准统一、融会贯通、资产化、服务化、闭环自优化的智能数据体系，以驱动创新。"},{"name":"数据集成","href":"https://www.aliyun.com/product/cdp","detail":"数据集成（Data Integration）是阿里集团对外提供的可跨异构数据存储系统的、可靠、安全、低成本、可弹性扩展的数据同步平台，为400对数据源提供不同网络环境下的全量/增量数据进出通道。"}]},{"name":"大数据应用","categories":[{"name":"企业图谱","href":"https://data.aliyun.com/product/eprofile","detail":"企业图谱（ Enterprise Profile，简称E-profile）提供企业多维度信息查询，深度挖掘企业与企业、企业与个人关系链路。透视企业关系，洞察企业客户价值及风险"},{"name":"智能推荐（公测中）","href":"https://www.aliyun.com/product/airec","detail":"智能推荐（Artificial Intelligence Recommendation，简称AIRec）基于阿里巴巴领先的大数据和人工智能技术，结合在电商、内容、新闻、视频直播和社交等多个行业领域的积累，为全球企业及开发者提供个性化推荐服务。"}]}]},{"name":"人工智能","categories":[{"name":"智能语音交互","categories":[{"name":"录音文件识别","href":"https://ai.aliyun.com/nls/filetrans","detail":"对用户上传的录音文件进行识别，上传完之后24小时内完成识别并返回识别文本。可用于呼叫中心语音质检、庭审数据库录入、会议记录总结、医院病历录入等场景。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nls_support@service.aliyun.com。"},{"name":"实时语音转写","href":"https://ai.aliyun.com/nls/trans","detail":"对不限时长的音频流做实时识别，达到“边说边出文字”的效果，内置智能断句，可提供每句话开始结束时间。可用于视频实时直播字幕、实时会议记录、实时法庭庭审记录、智能语音助手等场景。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nls_support@service.aliyun.com。"},{"name":"一句话识别","href":"https://ai.aliyun.com/nls/asr","detail":"对时长较短（一分钟以内）的语音进行识别，适用于较短的语音交互场景，如语音搜索、语音指令、语音短消息等，可集成在各类App、智能家电、智能助手等产品中。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nls_support@service.aliyun."},{"name":"语音合成","href":"https://ai.aliyun.com/nls/tts","detail":"语音合成服务，通过先进的深度学习技术，将文本转换成自然流畅的语音。目前有多种音色可供选择，并提供调节语速、语调、音量等功能。适用于智能客服、语音交互、文学有声阅读和无障碍播报等场景。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nls_support@service.aliyun.com。"},{"name":"语音合成声音定制","href":"https://ai.aliyun.com/nls/customtts","detail":"为企业提供深度定制TTS声音的能力。通过先进的深度学习技术，用更少的数据量，更快速高效地为客户定制个性化语音合成声音。将自然流畅的TTS声音带到服务或设备上。\n如有任何需求或疑问，请直接联系：nls_support@service.aliyun.com。"},{"name":"语言模型自学习工具","href":"https://ai.aliyun.com/nls/lmlearning","detail":"用户可以自行上传数据，对阿里的语音技术进行深度定制，从而提升特定业务领域的识别准确度。目前仅支持上传文本数据对语言模型进行定制，未来会推出上传音频数据对声学模型进行定制。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nls_support@service.aliyun.com。"}]},{"name":"图像搜索","categories":[{"name":"图像搜索","href":"https://ai.aliyun.com/imagesearch","detail":"图像搜索服务 （Image Search）是以深度学习和机器视觉技术为核心，结合不同行业应用和业务场景，\n帮助用户在自建图库中实现相同或相似图片搜索的以图搜图服务。\n如有进一步业务需求，请邮件联系我们，邮箱：imagesearch-support@list.alibaba-inc.com"}]},{"name":"自然语言处理","categories":[{"name":"多语言分词","href":"https://ai.aliyun.com/nlp/ws","detail":"将连续的自然语言文本，切分成具有语义合理性和完整性的词汇序列，同时保持对数据、模型的不断迭代更新，目前支持简体中文、英文及泰文。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"词性标注","href":"https://ai.aliyun.com/nlp/pos","detail":"通过词性标注服务，用户可以快速的为每一个词附上对应的词性，结合分词服务，可以快速进行更深层次的文本挖掘处理，无需担心新词发现、歧义消除等问题。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"命名实体","href":"https://ai.aliyun.com/nlp/ner","detail":"我们为您提供的命名实体服务，可以帮助您快速识别文本中的实体，进而挖掘各实体间的关系，是进行深度文本挖掘，知识库构建等常用自然语言处理领域里的必备工具。目前主要针对电商领域，识别品牌、产品、型号等，同时也包括一些通用领域实体如人名、地名、机构名、时间日期等。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"情感分析","href":"https://ai.aliyun.com/nlp/sa","detail":"又称倾向性分析，或意见挖掘，它是对带有情感色彩的主观性文本进行分析、处理、归纳和推理的过程。利用情感分析能力，可以针对带有主观描述的自然语言文本，自动判断该文本的情感正负倾向并给出相应的结果。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"中心词提取","href":"https://ai.aliyun.com/nlp/ke","detail":"多语言中心词（目前支持中文及英文）基于海量数据，使用电商标题中心词以及类目进行训练，通过给每个词计算一个相关性分数来衡量每个词与句子的相关性程度，进而识别并提取出句子的中心词。适用于提取电商搜索query、标题及其他类似短文本（一般小于25个词）的中心词。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"智能文本分类","href":"https://ai.aliyun.com/nlp/tc","detail":"按照给定类目体系对输入文本进行自动分类，当前已支持新闻资讯领域和电商领域的文本分类。如需更多类目体系的定制化，请使用NLP自学习平台。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"文本信息抽取","href":"https://ai.aliyun.com/nlp/ie","detail":"抽取文本中具有特定意义的实体，当前已支持合同领域的文本信息抽取。如需更多实体类型的定制化抽取，请使用NLP自学习平台。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"商品评价解析","href":"https://ai.aliyun.com/nlp/ra","detail":"基于电商行业的大量语料研发，对消费者历史评价和新增评价的商品维度属性自动解析，将文本转化为结构化属性字段，高效甄别正负面评价，同时根据情感强烈程度进行-1分~1分的打分，可统计可分析，大幅度节省客服人工。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"},{"name":"NLP自学习平台","href":"https://ai.aliyun.com/nlp/nlpautoml","detail":"支持文本实体抽取、文本分类等NLP定制化算法能力，用户无需拥有丰富的算法背景，仅需标注或上传适量文档数据，即可通过平台快速创建算法模型并使用。\n如有私有化部署（本地部署软件）需求，及商务问题，请联系：nlp-support@list.alibaba-inc.com"}]},{"name":"印刷文字识别","categories":[{"name":"通用型卡证类","href":"https://ai.aliyun.com/ocr/card","detail":"可以解决通用卡证类的文字识别及识别信息结构化的问题。本类产品下包含身份证正反面识别、护照识别、银行卡识别、名片识别、户口页识别"},{"name":"汽车相关识别","href":"https://ai.aliyun.com/ocr/vehicle","detail":"快速识别并获取和汽车相关的各种内容且结构化输出：包含驾驶证、行驶证、车牌、vin码"},{"name":"行业票据识别","href":"https://ai.aliyun.com/ocr/invoice","detail":"可结构化输出行业所需的各类票据关键字段内容：包含 增值税发票识别、机动车发票识别、火车票识别、出租车发票识别等。"},{"name":"资产类识别","href":"https://ai.aliyun.com/ocr/certification","detail":"资产类证件识别包各类资产证件的识别。企业资产如营业执照识别，可结构化识别出注册号，公司名称，公司地址，法人代表，营业期限等多个字段； 房产证识别可识别多种商品性质房源，快速准确识别房屋性质，坐落，权利人等10个字段。"},{"name":"通用文字识别","href":"https://ai.aliyun.com/ocr/general","detail":"适用于多场景图片文字识别并返回坐标信息。分别有网络ugc 图片文字识别、电商图片文字识别、社区贴吧图片文字识别、通用文字识别。"},{"name":"行业文档类识别","href":"https://ai.aliyun.com/ocr/document","detail":"高精度识别各行业文档和表单表格，通用于各行业的通用文字识别。包含单字坐标，表格识别，图像旋转等功能，广泛应用于司法、金融、医疗等各行业"},{"name":"视频类文字识别","href":"https://ai.aliyun.com/ocr/video","detail":"视频文字识别可以快速识别视频中的字幕信息以及视频中的特殊位置的文字信息，可应用于各类视频场景中，有效的区分文字内容是否合规；可以智能识别视频中的广告图中的文字信息，过滤广告中的违规文字，降低违规风险；实体标识可应用在物体外包装上的印刷文字识别，也可用于广告牌、路牌、标牌等带有印刷体文字的拍摄视频、图像进行识别。"},{"name":"自定义模板识别","href":"https://ai.aliyun.com/ocr/template","detail":"支持用户通过简单的标注创建专属自己的模板，生成识别规则。模板创建后，用户可通过API接口批量识别同类图片内容信息，获得定义好的输出结果，满足用户的个性化OCR需求"}]},{"name":"人脸识别","categories":[{"name":"人脸识别","href":"https://ai.aliyun.com/face","detail":"人脸识别（Face Recognition）基于图像或视频中的人脸检测、分析和比对技术，提供人脸检测定位、人脸属性识别和人脸比对等独立服务模块。可以为开发者和企业提供高性能的在线API服务，应用于人脸AR、人脸识别和认证、大规模人脸检索、照片管理等各种场景。"}]},{"name":"机器翻译","categories":[{"name":"机器翻译（公测中）","href":"https://ai.aliyun.com/alimt","detail":"阿里翻译依托领先的自然语言处理技术和海量的电商数据优势，研发基于注意力机制的深层神经网络翻译系统（NMT），目前该系统已经广泛应用在电商链路的各项业务中，包括SEO、搜索、商品标题、商品详情、商品评论、实时沟通、风控等各项基础数据领域。 阿里翻译帮助解决面向国际用户网站和软件中的所有语言障碍，现在购买资源包享受梯度优惠的同时，每月还有100万字符免费调用额度。\n业务咨询请直接联系：mt_support@list.alibaba-inc.com"}]},{"name":"图像识别","categories":[{"name":"图像识别","href":"https://ai.aliyun.com/image","detail":"图像识别服务（Image Recognition）基于大数据和深度学习实现，可精准识别图像中的视觉内容，包括上千种物体标签、数十种常见场景等，包含图像打标、场景分类、鉴黄等在线API服务模块，应用于智能相册管理、图片分类和检索、图片安全监控等场景。"}]},{"name":"视觉计算","categories":[{"name":"视觉计算服务 VCS（公测中）","href":"https://www.aliyun.com/product/vcs","detail":"视觉计算服务Visual Compute Service（简称VCS）是一款弹性可伸缩的视觉智能计算服务。提供视觉数据接入、AI算法训练、计算资源调度的能力，通过API支撑开发业务应用，同时帮助开发者提升视觉AI创新效率，专注核心业务创新。"}]},{"name":"内容安全","categories":[{"name":"图片鉴黄","href":"https://ai.aliyun.com/lvwang/imgadult","detail":"通过深度学习技术神经网络算法和实时更新的亿级图像样本库，可对图片进行识别以及色情程度量化，能够根据业务场景快速定制算法模型，降低人工审核成本。\n\n"},{"name":"图片涉政暴恐识别","href":"https://ai.aliyun.com/lvwang/imgterrorism","detail":"通过深度学习算法结合独有的情报、舆情、预警和分析体系及实时更新的样本图库，能够快速定位暴恐旗帜、血腥、人物和场景以及敏感政治人物。\n\n"},{"name":"图片Logo商标检测","href":"https://ai.aliyun.com/lvwang/imglogo","detail":"通过目标检测技术，精准识别图片、直播画面和视频中出现的各种logo，如台标，商标，水印，标签等类型，提供logo类型、名称和位置，常用于竞品监控，版权保护等场景。"},{"name":"图片垃圾广告识别","href":"https://ai.aliyun.com/lvwang/imgad","detail":"通过OCR算法结合文本识别算法有效识别广告图片，并且采用独创的牛皮癣算法，能够通过判断图片中文字是否经过后期处理来有效识别广告图片。"},{"name":"图片不良场景识别","href":"https://ai.aliyun.com/lvwang/imglive","detail":"结合行为分析和时间序列对比技术，针对在直播和视频中的需要监管的不良场景，如画面模糊、抽烟、画中画、赌博、斗殴等进行精准识别。"},{"name":"图片风险人物识别","href":"https://ai.aliyun.com/lvwang/imgsface","detail":"提供包括政治人物、敏感人物、以及名人明星等人物的面部识别，能够避免业务的违规和侵权风险。"},{"name":"视频风险内容识别","href":"https://ai.aliyun.com/lvwang/video","detail":"通过神经网络算法、深度学习算法结合阿里巴巴多年沉淀的的图像、视频、情报、舆情、预警数据，不仅能够快速定位敏感人物、色情、政治敏感、暴力、武器、恐怖、血腥、爆炸、抽烟、吸毒、画中画等内容，还能对台标、商标、二维码、广告等内容进行精确识别，降低内容被监管的风险以及人工审核成本。"},{"name":"文本反垃圾识别","href":"https://ai.aliyun.com/lvwang/text","detail":"采用NLP自然语言理解算法有效识别色情、暴恐涉政、广告、辱骂、违反广告法、涉及违禁品等文本内容，并且能够结合行为策略有效管控灌水、刷屏等恶意行为。"},{"name":"语音垃圾识别","href":"https://ai.aliyun.com/lvwang/audio","detail":"基于深度学习技术与实时语音分析技术精准识别出语音中的垃圾内容，比如色情、低俗、恐怖暴力、涉政、宗教、广告、辱骂等内容，避免内容因违规内容而被监管处罚。"}]},{"name":"机器学习平台","categories":[{"name":"机器学习平台 PAI","href":"https://data.aliyun.com/product/learn","detail":"阿里云机器学习平台PAI（Platform of Artificial Intelligence），为传统机器学习和深度学习提供了从数据处理、模型训练、服务部署到预测的一站式服务。"},{"name":"人工智能众包（公测中）","href":"https://www.aliyun.com/product/aicrowd","detail":"人工智能众包（AI Crowdsourcing）基于共享人力资源模式，为人工智能算法提供数据采集、清洗、标注等服务，帮助企业快速构建算法数据集"}]},{"name":"城市大脑开放平台","categories":[{"name":"智能出行引擎","href":"https://m.aliyun.com/markets/aliyun/citybraintraffic","detail":"基于ET城市大脑开放平台与阿里云大数据一体化计算平台，智能出行引擎·数据融合、控制优化、实时预警三大模块，通过实现交通行业数据的闭环流转，最终达成对交通系统的控制闭环。 开发者基于ET城市大脑开放平台的服务总线，使用ET城市大脑开放平台的引擎能力，共同繁荣ET城市大脑的生态。"}]}]},{"name":"企业应用","categories":[{"name":"域名与网站","categories":[{"name":"域名注册","href":"https://wanwang.aliyun.com/","detail":"蝉联国内市场NO.1，超过4000万域名注册"},{"name":"域名交易","href":"https://mi.aliyun.com/","detail":""},{"name":"网站建设","href":"https://www.aliyun.com/jianzhan","detail":"一站管理"},{"name":"云虚拟主机","href":"https://wanwang.aliyun.com/hosting","detail":"独享虚机新用户享3年付3.5折优惠！"},{"name":"海外云虚拟主机","href":"https://www.aliyun.com/chinaglobal/promotion/virtual2017","detail":""},{"name":"云解析 DNS","href":"https://wanwang.aliyun.com/domain/dns","detail":"云解析 DNS（Domain Name System，简称DNS）一种安全、快速、稳定、可靠的权威DNS解析管理服务。云解析DNS为企业和开发者将易于管理识别的域名转换为计算机用于互连通信的数字IP地址，从而将用户的访问路由到相应的网站或应用服务器。\n\n【双12限时优惠】新用户大促，购买1年7折，2年6折，3年5折！错过等一年！！ 立即购买>>"},{"name":"弹性Web托管","href":"https://wanwang.aliyun.com/hosting/elastic","detail":""},{"name":"备案","href":"https://beian.aliyun.com/","detail":""}]},{"name":"注册公司","categories":[{"name":"公司注册","href":"http://gs.aliyun.com/","detail":""}]},{"name":"知识产权服务","categories":[{"name":"商标注册","href":"https://tm.aliyun.com/","detail":""},{"name":"商标交易","href":"https://www.aliyun.com/acts/domain/tmtransaction","detail":""}]},{"name":"应用服务","categories":[{"name":"机器人流程自动化 RPA（公测中）","href":"https://www.aliyun.com/product/codestore","detail":"阿里云RPA历经8年的内部验证，覆盖了阿里巴巴大部分BU，实现了电商客服、新零售等新兴行业的渗透，并且已经完成在保险、金融、医疗保健等领域的场景深耕，联合合作伙伴具备深度定制化能力和稳定交付能力，积累了丰富的行业可行性解决方案。目前阿里云RPA能集成并运行在更高的软件层级，这就决定了它不会侵入、影响已有的软件系统。在帮助企业提升效能的过程中，保持企业已有的IT系统功能平稳、运行可靠。"},{"name":"云桌面","href":"https://www.aliyun.com/product/clouddesktop","detail":"云桌面 (Cloud Desktop），是由阿里云所提供的便捷、安全的云上虚拟桌面服务。它支持快速便捷的桌面环境创建、部署、统一管控与运维。无需前期传统硬件投资，帮您快速构建安全、高性能、低成本的桌面办公体系。可广泛应用于具有高数据安全管控、高性能计算等要求的金融、设计、视频、教育等领域。"},{"name":"云AP","href":"https://www.aliyun.com/product/cloudap","detail":"云AP是一项云化的WiFi服务，价格低廉，易用可靠。"},{"name":"API 网关","href":"https://www.aliyun.com/product/apigateway","detail":"API 网关（API Gateway），提供API托管服务，涵盖API发布、管理、运维、售卖的全生命周期管理。辅助用户简单、快速、低成本、低风险的实现微服务聚合、前后端分离、系统集成，向合作伙伴、开发者开放功能和数据。"},{"name":"企业邮箱","href":"https://wanwang.aliyun.com/mail","detail":"热销企业邮箱标准版，百万中小企业首选"},{"name":"邮件推送","href":"https://www.aliyun.com/product/directmail","detail":"邮件推送（DirectMail）是一款简单高效的电子邮件发送服务，它构建在可靠稳定的阿里云基础之上，帮助您快速、精准地实现事务邮件、通知邮件和批量邮件的发送。邮件推送历经两年双11考验，在发送速度、系统稳定性和到达率上表现优异；提供丰富的接口和灵活的使用方式，为企业和开发者解决邮件投递的难题，用户无需自建邮件服务器，开通服务即可享受阿里云优质的邮件服务，获得邮件投递的最佳实践。"},{"name":"云投屏","href":"https://www.aliyun.com/product/cd","detail":"应用于会议演示场景，它颠覆了传统投屏模式，无需连接任何插线或转接头，只需要连接网络，在电脑桌面端上操作投屏，即可将电脑屏幕完整投放到显示屏幕上。硬件盒子小巧灵活，部署极简。会议室桌面无连接走线，实现员工无感知部署。"}]},{"name":"智能设计服务","categories":[{"name":"鹿班（公测中）","href":"https://www.aliyun.com/product/luban","detail":"鹿班（AI Graphics） 智能设计平台，包括智能生成、创作助手、智能排版、设计拓展等功能模块，可帮助企业快速、批量、自动化的进行图片设计。"}]},{"name":"移动云","categories":[{"name":"移动研发平台 EMAS","href":"https://www.aliyun.com/product/emas","detail":"移动研发平台（Enterprise Mobile Application Studio，简称EMAS），面向企业服务市场，期望把阿里巴巴近十年在移动互联网行业沉淀的DevOps研发支撑能力、移动App基础中间件能力开放给客户，帮助传统企业快速完成业务移动化的转型升级目标。"},{"name":"移动推送","href":"https://www.aliyun.com/product/cps","detail":"移动推送（Alibaba Cloud Mobile Push) 是基于大数据技术的移动云服务。帮助App快速集成移动推送的功能，在实现高效、精确、实时的移动推送的同时，极大地降低了开发成本。让开发者最有效地与用户保持连接，从而提高用户活跃度、提高应用的留存率。"},{"name":"移动热修复","href":"https://www.aliyun.com/product/hotfix","detail":"移动热修复（Mobile Hotfix）是面向移动互联网的APP热修复解决方案。产品基于阿里巴巴首创Hotpatch技术，提供细粒度热修复能力，无需等待，实时修复应用线上问题。\nPowered By 手机淘宝"},{"name":"移动测试","href":"https://www.aliyun.com/product/mqc","detail":"移动测试（Mobile Testing）是为广大企业客户和移动开发者提供真机测试服务的云平台，拥有大量热门机型，提供7x24全天候服务，帮助客户发现APP中的各类隐患（应用崩溃、各类兼容性问题、功能性问题、性能问题等），减少用户流失，提高APP质量和市场竞争力。"},{"name":"移动数据分析","href":"https://www.aliyun.com/product/man","detail":"移动数据分析 (Mobile Analytics) 是阿里云推出的一款移动App数据统计分析产品，为开发者提供一站式数据化运营服务：通用的多维度用户行为分析、数据开放并支持自定义分析、数据无缝对接其他数据应用产品，助力移动开发者实现基于大数据技术的精细化运营、提升产品质量和体验、增强用户黏性。"},{"name":"移动用户反馈","href":"https://www.aliyun.com/product/feedback","detail":"移动用户反馈（Mobile Feedback）是App内部的用户反馈系统。无需退出，就可以快速发送文字、图片、语音进行意见反馈和报告Bug。 开发者可以及时和用户保持沟通，提升用户满意度（此外，自动抓取APP在应用市场的评论数据，帮助开发者掌握用户对应用的评论）。"},{"name":"HTTPDNS","href":"https://www.aliyun.com/product/httpdns","detail":"HTTPDNS是面向移动开发者推出的一款域名解析产品，具有域名防劫持、精准调度的特性。"}]},{"name":"视频云","categories":[{"name":"视频直播","href":"https://www.aliyun.com/product/live","detail":"视频直播（ApsaraVideo Live）是基于领先的内容接入与分发网络和大规模分布式实时视频处理技术（含窄带高清TM）打造的音视频直播平台，提供易接入、低延迟、高并发、高清流畅的音视频直播服务。"},{"name":"视频点播","href":"https://www.aliyun.com/product/vod","detail":"无论是初创视频服务企业，还是已拥有海量视频资源，可定制化的点播服务帮助客户快速搭建拥有极致观看体验、安全可靠的视频点播应用。"},{"name":"媒体处理","href":"https://www.aliyun.com/product/mts","detail":"提供集音视频上传、自动化转码、媒体资源管理、分发加速于一体的一站式音视频点播解决方案。帮助快速搭建安全、弹性、高可定制的点播平台和应用。"},{"name":"音视频通信 RTC","href":"https://www.aliyun.com/product/rtc","detail":"音视频通信 RTC（Real-Time Communication）是阿里云覆盖全球的实时音视频开发平台，依托核心音视频编解码、信道传输、网络调度技术，提供高可用、高品质、超低延时的音视频通信服务，让用户快速搭建多端实时应用，适用于在线教育、视频会议、互动娱乐、音视频社交等场景。"},{"name":"视频监控","href":"https://www.aliyun.com/product/vs","detail":"视频监控（Video Surveillance）是依托阿里云遍布全球的边缘接入节点和出色的视频技术，面向监控设备提供统一开放的视频流接入、处理和分发服务。把视频内容接入云端，进行存储、录制回看、全网分发。可与智能视觉、视频计算系统、机器学习平台、生态合作伙伴能力集成，快速构建利用计算机视觉和视频分析的应用程序和智能监控解决方案。"},{"name":"智能视觉","href":"https://ai.aliyun.com/vi/ivision","detail":"智能视觉（IntelligenceVision）为零算法基础的开发者和企业提供定制化模型训练能力，包括图像分类、图像检测、视频分类、视频识别、直播识别等能力，应用于工业质检、零售物件计数、视频监控等各种场景。"},{"name":"视频DNA","href":"https://ai.aliyun.com/vi/dna","detail":"视频DNA可以唯一标记一个视频，具有稳定性，不会随音视频文件的格式转换、剪辑拼接、压缩旋转等变换而发生变化。"},{"name":"视频审核","href":"https://ai.aliyun.com/vi/censor","detail":"视频智能审核服务(Video Censor)基于海量标注数据和深度学习算法实现，从语音、文字、视觉等多维度精准识别视频、封面、标题或评论的违禁内容，包括色情、暴恐、政治敏感、广告、视频黑库等多个功能模块，应用于短视频平台、直播平台、传媒审核等场景。"},{"name":"多模态内容理解","href":"https://ai.aliyun.com/vi/multimodal","detail":"视频多模态内容理解，是通过分析视频中视觉、文字、语音、行为等多模态信息，自动输出视频的多维度内容标签，将非结构化信息转化为结构化信息。基于深度学习的目标检测技术，准确找出给定视频的视频帧中多目标及位置，并给出每个目标的具体类别。目标检测支持多达1000个类目， 包括： 生活用品、 交通工具、 动物、 植物等。"},{"name":"视频智能生产","href":"https://ai.aliyun.com/vi/produce","detail":"视频智能生产，是将视频AI的多种能力与视频云基础服务打通，赋能视频生产环节，提高视频生产的效率和质量。"},{"name":"智能封面","href":"https://ai.aliyun.com/vi/cover","detail":"视频智能封面，是通过对视频内容的理解，结合画面美学和海量用户行为数据，选出最优的关键帧或关键片段作为视频封面，提升视频点击转化及用户体验。"}]},{"name":"专有云","categories":[{"name":"Apsara Stack","href":"https://www.aliyun.com/product/apsara-stack","detail":""}]},{"name":"消息队列 MQ","categories":[{"name":"消息队列 RocketMQ","href":"https://www.aliyun.com/product/rocketmq","detail":"消息队列 RocketMQ 版是阿里云基于 Apache RocketMQ 构建的低延迟、高并发、高可用、高可靠的分布式消息中间件。该产品最初由阿里巴巴自研并捐赠给 Apache 基金会，服务于阿里集团 13 年，覆盖全集团所有业务。作为双十一交易核心链路的官方指定产品，支撑千万级并发、万亿级数据洪峰，历年刷新全球最大的交易消息流转记录。"},{"name":"消息队列 AMQP","href":"https://www.aliyun.com/product/amqp","detail":"消息队列 AMQP 版由阿里云基于 AMQP 标准协议自研，完全兼容 RabbitMQ 开源生态以及多语言客户端，打造分布式、高吞吐、低延迟、高可扩展的云消息服务。开箱即用，用户无需部署免运维，轻松实现快速上云，阿里云提供全托管服务，更专业、更可靠、更安全。"},{"name":"微消息队列 MQTT","href":"https://www.aliyun.com/product/mq4iot","detail":"微消息队列 MQTT 版是专为移动互联网(MI)、物联网(IoT)领域设计的消息产品，覆盖互动直播、金融支付、智能餐饮、即时聊天、移动 Apps、智能设备、车联网等多种应用场景；通过对 MQTT、WebSocket 等协议的全面支持，连接端和云之间的双向通信，实现 C2C、C2B、B2C 等业务场景之间的消息通信，可支撑千万级设备与消息并发，真正做到万物互联。"},{"name":"消息队列 Kafka","href":"https://www.aliyun.com/product/kafka","detail":"淘宝、天猫平台等公司每天都会产生大量的日志。Kafka 性能高效，同时 Kafka 的特性决定它非常适合作为\"日志收集中心\"： 1. 采集日志时业务无感知；2. Hadoop/ODPS 等离线仓库存储和 Storm/Spark 等实时在线分析对接​​；"},{"name":"消息服务 MNS","href":"https://www.aliyun.com/product/mns","detail":"阿里云消息服务（Message Service，原 MQS）是阿里云商用的消息中间件服务。与传统的消息中间件不同，消息服务一开始就是基于阿里云自主研发的飞天分布式系统来设计和实现，具有大规模，高可靠、高并发访问和超强消息堆积能力的特点。消息服务API采用HTTP RESTful标准，接入方便，跨网络能力强；已全面接入资源访问控制服务（RAM）、专有网络（VPC），支持各种安全访问控制；接入云监控，提供完善的监控及报警机制。消息服务提供丰富的SDK、解决方案、最佳实践和7x24小时的技术支持，帮助应用开发者在应用组件之间自由地传递数据和构建松耦合、分布式、高可用系统。\n\nMNS 短信功能将于 2018.02.28 23:59:59 起停止服务，新的短信功能将全部迁移至云通信短信服务，请尽快参照《短信迁移帮助手册》，下载新的 SDK 并参考 API 示例代码进行迁移，以免影响您的业务正常使用，感谢！"}]},{"name":"微服务","categories":[{"name":"企业级分布式应用服务 EDAS","href":"https://www.aliyun.com/product/edas","detail":"企业级分布式应用服务 EDAS（Enterprise Distributed Application Service）是一个应用托管和微服务管理的 PaaS 平台，提供应用开发、部署、监控、运维等全栈式解决方案，同时支持 Spring Cloud、Apache Dubbo（以下简称 Dubbo ）等微服务运行环境，助力您的各类应用轻松上云。"},{"name":"应用配置管理 ACM","href":"https://www.aliyun.com/product/acm","detail":"应用配置管理（Application Configuration Management，简称 ACM），其前身为淘宝内部配置中心 Diamond，是一款应用配置中心产品。基于该应用配置中心产品，您可以在微服务、DevOps、大数据等场景下极大地减轻配置管理的工作量的同时，保证配置的安全合规。"},{"name":"全局事务服务 GTS","href":"https://www.aliyun.com/aliware/txc","detail":"共享出行场景下，通过GTS支撑物联网系统、订单系统、支付系统、运维系统、分析系统等系各统应用事务一致性，保证海量订单和数千万流水的交易。"},{"name":"云服务总线 CSB","href":"https://www.aliyun.com/product/csb","detail":"位于企业内部数据中心的业务系统，与企业在云上的业务系统之间，通过各自环境内云服务总线CSB实例之间“桥接”实现的服务通道，把各自的服务在对方云CSB实例上发布成API，进行管理和授权，让对方可以订阅和访问。"}]},{"name":"智能客服","categories":[{"name":"云呼叫中心","href":"https://www.aliyun.com/product/ccc","detail":"云呼叫中心（Cloud Call Center）为阿里巴巴集团多年研发积累的内部呼叫中心系统的优化输出。您可以自助开通呼叫中心，轻松设置IVR流程，管理并追踪客服绩效，无需具备专业技能，无需管理任何设备。您将获得基于云端呼叫中心平台的全部优势，实现更大的灵活性，更高的可靠性和更低的成本。"},{"name":"云小蜜（公测中）","href":"https://www.aliyun.com/product/beebot","detail":"云小蜜是一款面向开发者的会话机器人，支持在不同的消息端上实现基于自然语言处理(NLP)的智能会话，如网站、APP及实体机器人等。用户可以在云小蜜中配置自己特有的知识库实现智能问答，也可以通过多轮对话与第三方API集成实现自助服务，如：订单查询，物流跟踪，自助退货机器人等。"},{"name":"智能对话分析","href":"https://www.aliyun.com/product/sca","detail":"智能对话分析 (Smart Conversation Analysis) 能实现从对话录音或者对话文本中，基于智能规则，分析对话内容，挖掘对话中可能存在的问题和机会。能帮助企业提升服务质量、监控舆情风险、优化服务策略，典型应用场景有智能客服质检、销售机会分析等。"},{"name":"云客服","href":"https://www.aliyun.com/product/ccs","detail":"云客服依托大数据平台，凭借数据挖掘，搜索，语音转文本，自然语音处理，机器学习等前沿技术，打造一套完整的智能服务体系。蚂蚁智能客服团队提供技术支持和整体解决方案，历经数年双11高峰考验。\nPowered by 蚂蚁智能客服"}]},{"name":"区块链","categories":[{"name":"区块链服务","href":"https://www.aliyun.com/product/baas","detail":"阿里云区块链服务（Blockchain as a Service，简称BaaS）是企业级区块链平台服务，支持Hyperledger Fabric、蚂蚁金服自研区块链技术、以及企业以太坊Quorum，为您构建更安全稳定的区块链环境，简化部署运维及开发流程，实现业务快速上链。"}]},{"name":"SaaS加速器","categories":[{"name":"宜搭（公测中）","href":"https://www.aliyun.com/product/yida","detail":"宜搭是一种面向业务开发者的零代码业务应用搭建平台。开发者可以在可视化界面上以拖拉拽的方式编辑和配置页面，表单和流程，并一键发布到PC和手机端。"}]}]},{"name":"物联网","categories":[{"name":"物联网平台","categories":[{"name":"物联网设备接入","href":"https://www.aliyun.com/product/iot-deviceconnect","detail":""},{"name":"物联网设备管理","href":"https://www.aliyun.com/product/iot-devicemanagement","detail":"物联网设备管理提供方便快捷的设备管理能力，帮助您在海量设备中快速检索到指定设备，您可以定义设备的属性、事件、服务，基于定义的物模型对设备进行远程调试、远程监控、远程维护等操作。"},{"name":"物联网数据分析","href":"https://www.aliyun.com/product/iot-dataanalytics","detail":"物联网数据分析提供丰富的数据可视化组件、常用统计分析方法及大数据分析工具，致力于降低数据分析门槛，助力广大物联网开发者。 欢迎加入钉钉群交流：21939141"},{"name":"物联网应用开发","href":"https://iot.aliyun.com/products/iotstudio","detail":""},{"name":"物联网资源包","href":"https://m.aliyun.com/markets/aliyun/act/IoT/HD","detail":"业界领先的IoT安全服务"}]},{"name":"低功耗广域网","categories":[{"name":"物联网络管理平台（公测中）","href":"https://www.aliyun.com/product/linkwan?spm=5176.12825654.eofdhaal5.105.e9392c4a9fTTD4","detail":"提供快速搭建网络能力，网关可在一小时内部署完毕，解决讯号难以到达的地下室、无固定电源空间与海量设备的场景，透过网络管理服务，实现传感器所需要的公里级通讯、长时低功耗与上万设备连接能力。"},{"name":"物联网无线连接服务","href":"https://www.aliyun.com/product/olddyiot","detail":"物联网无线连接服务是基于三大运营商（移动、联通、电信）提供物联网专用号段（11位或13位）的移动通信接入业务，该业务支持无线数据通信和物联网场景的配套行业解决方案，用户各种物联网设备的应用场景，如车联网、智能家居、穿戴设备、多媒体网络支撑、环境监测，和智慧农业等。\n邀您参加 物联网无线连接服务 问卷调查，我们将对优质客户提供专属服务。"}]},{"name":"边缘服务","categories":[{"name":"物联网边缘计算（公测中）","href":"https://www.aliyun.com/product/iotedge","detail":"物联网边缘计算是一款云边一体的PaaS层软件产品，将云端的能力下沉到边缘侧，解决边缘实时性、可靠性、运维经济性等方面遇到的问题。南向提供通信协议框架为软硬件开发者提供便捷的通信协议开发能力，北向通过Open API为SaaS开发者提供快速构建云端应用的能力。对于运维，云端提供一体化的运维工具，可以在云端集中运维，降低运维成本，提升运维效率。欢迎加入官方钉钉交流群：21765957。"},{"name":"视频边缘智能服务（公测中）","href":"https://www.aliyun.com/product/linkvisual","detail":"LinkVisual面向政府、企业、家庭等安防领域，提供大容量、高并发的视频连接、存储服务；并提供云边协同的视频算法与算法训练下发工具。"}]},{"name":"设备服务","categories":[{"name":"AliOS Things","href":"https://iot.aliyun.com/products/aliosthings","detail":""}]},{"name":"物联安全","categories":[{"name":"物联网设备身份认证","href":"https://www.aliyun.com/product/iotid","detail":"阿里云Link ID²（IoT Device ID）是一个物联网设备身份认证系统，通过可信计算和密码技术为物联网系统提供设备安全认证、安全连接、业务数据加密、密钥管理等端到端的可信接入能力。"},{"name":"物联网安全运营中心","href":"https://www.aliyun.com/product/iot-devicedefender","detail":"物联网安全运营中心-Link SOC（Security Operations Center），帮助管理员识别和消除IoT系统潜在的安全风险，保障IoT系统运行过程中的安全性。"},{"name":"物联网可信执行环境","href":"https://iot.aliyun.com/products/tee","detail":""},{"name":"物联网可信服务管理","href":"https://iot.aliyun.com/products/tsm","detail":""}]},{"name":"相关云产品","categories":[{"name":"智联车管理云平台（公测中）","href":"https://www.aliyun.com/product/iovcc","detail":"智联车管理云平台（IoV Command Center，简称IoV CC）是阿里云面向智联车领域，专门推出的车辆全生命周期云端管理平台，旨在赋能车厂转型出行服务商，提高运营效率、降低自建成本。"}]},{"name":"生态","categories":[{"name":"物联网市场","href":"https://linkmarket.aliyun.com/","detail":""},{"name":"ICA物联网标准联盟","href":"https://www.ica-alliance.org/","detail":""},{"name":"物联网测试认证服务","href":"https://iot.aliyun.com/linkcertification","detail":""}]},{"name":"标准解决方案","categories":[{"name":"魔笔","href":"https://iot.aliyun.com/products/linkmopen","detail":""},{"name":"云投屏","href":"https://www.aliyun.com/product/cd","detail":"应用于会议演示场景，它颠覆了传统投屏模式，无需连接任何插线或转接头，只需要连接网络，在电脑桌面端上操作投屏，即可将电脑屏幕完整投放到显示屏幕上。硬件盒子小巧灵活，部署极简。会议室桌面无连接走线，实现员工无感知部署。"},{"name":"24H自助售药机","href":"https://www.aliyun.com/product/rds/24Hour_seller","detail":"随着消费者购买行为的升级换代，大数据、云计算、物联网技术的普及，人工智能的介入，医药新零售应运而生。24小时ATM式自助售药机是阿里旗下阿里云、饿了么，联合多家知名药厂、连锁药商打造的医药新零售项目，具有多项发明专利和创新功能。该项目定名为阿里赋能药店“一店一窗口”项目，该窗口既是外卖平台24h接单后的提货窗口（骑手输入取货码取货），也是消费者24h自助购药窗口。"},{"name":"仓库猫","href":"https://www.aliyun.com/product/rds/cangkucat","detail":"为中小微企业解决仓库的科学监测、信息化、网络化管理等问题的针对性解决方案。可以做到防火监测、防盗监测、防水监测、防潮监测、能够帮助企业快速搭建店铺的监测系统，报警系统，云存储系统。只需要在客户端设置好监控阀值后，系统便能够实现无人监测，数据存储、问题报警及时为管理人员提供行动支撑数据，便于快速处理报警事件，最大限度保障店铺、人员的安全及货品的价值。"}]}]}]

    // for (let i = 0; i < res.length; i += 1) {
    //   const searchCls = i === 0 ? '.first-title-disableCss' : '.first-title'
    //   // 一级分类的名称
    //   const firstClass = await res[i].$eval(searchCls, node => node.innerText)

    //   const pageItem = {
    //     name: firstClass,
    //     categories: []
    //   }

    //   // 云计算基础这个分类比较特殊，总共有三级分类
    //   if (i === 0) {
    //     const cloudWraps = await res[i].$$('.cloud-content')

    //     for (let p = 0; p < cloudWraps.length; p += 1) {
    //       await cloudWraps[p].click()

    //       const secondClass = await cloudWraps[p].$eval('p', node => node.innerText)

    //       const subPage = {
    //         name: secondClass,
    //         categories: []
    //       }

    //       const listClouds = await page.$$('.list-wrap.list-cloud')

    //       if (listClouds.length > 0) {
    //         for (let q = 0; q < listClouds.length; q += 1) {
    //           // 获取三级分类的名称
    //           const thirdClass = await listClouds[q].$eval('.list-first-wrap a', node => node.innerText)

    //           const subSubPage = {
    //             name: thirdClass,
    //             categories: []
    //           }

    //           const listSecondWraps = await listClouds[q].$$('.list-second-wrap')

    //           for (let k = 0; k < listSecondWraps.length; k += 1) {
    //             const res = await listSecondWraps[k].$eval('a', node => ({
    //               name: node.innerText,
    //               href: node.href
    //             }))

    //             const newPage = await browser.newPage()
    //             await newPage.goto(res.href)

    //             console.log('goto page:', res.name)

    //             const infoEle = await newPage.$('p.info')

    //             let detail = ''

    //             if (infoEle) {
    //               detail = await newPage.$eval('p.info', node => node.innerText)
    //             } else {
    //               const introEle = await newPage.$('.intro > p')
    //               if (introEle) {
    //                 detail = await newPage.$eval('.intro > p', node => node.innerText)
    //               } else {
    //                 const descEle = await newPage.$('div.desc')
    //                 if (descEle) {
    //                   detail = await newPage.$eval('div.desc', node => node.innerText)
    //                 } else {
    //                   const intro = await newPage.$('div.intro')
    //                   if (intro) {
    //                     detail = await newPage.$eval('div.intro', node => node.innerText)
    //                   }
    //                 }
    //               }
    //             }

    //             // await browser.close()

    //             subSubPage.categories.push({
    //               ...res,
    //               detail
    //             })
    //             await newPage.waitFor(500)
    //             await newPage.close()
    //           }
    //           subPage.categories.push(subSubPage)
    //         }
    //       } else {
    //         // 这种类型的不到三层分类，比如CDN与边缘
    //         const listSecondWraps = await page.$$('.list-wrap-none')

    //         for (let k = 0; k < listSecondWraps.length; k += 1) {
    //           const res = await listSecondWraps[k].$eval('.list-second-title', node => ({
    //             name: node.innerText,
    //             href: node.href
    //           }))

    //           const newPage = await browser.newPage()
    //           await newPage.goto(res.href)

    //           console.log('goto page:', res.name)

    //           const infoEle = await newPage.$('p.info')

    //           let detail = ''

    //           if (infoEle) {
    //             detail = await newPage.$eval('p.info', node => node.innerText)
    //           } else {
    //             const introEle = await newPage.$('.intro > p')
    //             if (introEle) {
    //               detail = await newPage.$eval('.intro > p', node => node.innerText)
    //             } else {
    //               const descEle = await newPage.$('div.desc')
    //               if (descEle) {
    //                 detail = await newPage.$eval('div.desc', node => node.innerText)
    //               } else {
    //                 const intro = await newPage.$('div.intro')
    //                 if (intro) {
    //                   detail = await newPage.$eval('div.intro', node => node.innerText)
    //                 }
    //               }
    //             }
    //           }

    //           // await browser.close()
    //           subPage.categories.push({
    //             ...res,
    //             detail
    //           })
    //           await newPage.waitFor(500)
    //           await newPage.close()
    //         }
    //       }
    //       pageItem.categories.push(subPage)
    //     }
    //   } else {
    //     const listWrap = await res[i].$$('.list-wrap')

    //     for (let j = 0; j < listWrap.length - 1; j += 1) {
    //       // 获取二级分类的名称
    //       const secondClass = await listWrap[j].$eval('.list-first-wrap', node => node.innerText)

    //       const subPage = {
    //         name: secondClass,
    //         categories: []
    //       }

    //       const listSecondWraps = await listWrap[j].$$('.list-second-wrap')

    //       for (let k = 0; k < listSecondWraps.length; k += 1) {
    //         const res = await listSecondWraps[k].$eval('a', node => ({
    //           name: node.innerText,
    //           href: node.href
    //         }))

    //         const newPage = await browser.newPage()
    //         await newPage.goto(res.href)

    //         console.log('goto page:', res.name)

    //         const infoEle = await newPage.$('p.info')

    //         let detail = ''

    //         if (infoEle) {
    //           detail = await newPage.$eval('p.info', node => node.innerText)
    //         } else {
    //           const introEle = await newPage.$('.intro > p')
    //           if (introEle) {
    //             detail = await newPage.$eval('.intro > p', node => node.innerText)
    //           } else {
    //             const descEle = await newPage.$('div.desc')
    //             if (descEle) {
    //               detail = await newPage.$eval('div.desc', node => node.innerText)
    //             } else {
    //               const intro = await newPage.$('div.intro')
    //               if (intro) {
    //                 detail = await newPage.$eval('div.intro', node => node.innerText)
    //               }
    //             }
    //           }
    //         }

    //         // await browser.close()
    //         subPage.categories.push({
    //           ...res,
    //           detail
    //         })
    //         await newPage.waitFor(500)

    //         await newPage.close()
    //       }
    //       pageItem.categories.push(subPage)
    //     }
    //   }
    //   result.push(pageItem)
    // }

    //  console.log(JSON.stringify(result))

    const result1 = result

    const data = [['一级分类', '二级分类', '三级分类', '产品名称', '详细介绍', '跳转链接']]
    const eachCatCount = []

    function traverse(item, result) {
      if (!item.categories) {
        // 对于没有三级分类的条目需要主动填充一个null
        if (result.length !== 3) {
          result.push(null)
        }
        result.push(item.name, item.detail, item.href)
        data.push(result)
        return null
      }

      result.push(item.name)
      let count = 0
      item.categories.forEach((it) => {
        const tmp = [...result]
        const res = traverse(it, tmp)
        if (res === null) {
          count += 1
        }
      })
      return count
    }

    result1.forEach((item) => {
      const temp = []
      traverse(item, temp)
    })

    // console.log(data)
    // const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const range = {s: {c: 0, r:1 }, e: {c:0, r:75}}; // A1:A4
     const options = {'!cols': [{ wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 30 }, { wch: 130}, { wch: 45} ], '!merges': [ range ]};

     var buffer = xlsx.build([{name: "mySheetName", data: data, options}]); // Returns a buffer

    fs.writeFileSync('./output.xlsx', buffer)

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
