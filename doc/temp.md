

笔者从 2007 至今 18 年的 SAP 开发生涯中，经历过数次技术转型的阵痛。第一次是 2014 年底从 ABAP 开发转到 SAP UI5. 



当时我已经从事了 8 年的 SAP Business By Design + SAP CRM 产品研发工作，可以熟练使用 ABAP + Webdynpro + WebClient UI 进行全栈开发。



2014年底由于工作需要，我被分配到 SAP CRM Fiori 开发团队，离开了 ABAP 舒适区，从零基础出发开始学习 SAP UI5.



之前从没用过 JavaScript，离开了熟悉的 SAPGUI，用上了基于 Eclipse 的 SAP UI5 开发工具，一开始那是越用越别扭，看工具哪里都不顺眼，无比怀念 ABAP. 



后来磕磕绊绊折腾了一年多，才算是上手了。ABAP 开发者零基础转 SAP UI5 的痛苦之路，我可以说从头到尾走完过，后来我也把这条路上的经验和体会，一起写到了下面这套 SAP UI5 开发教程中：



笔者第二次转型阵痛是 2017 年接触 SAP BTP(那时还叫 SAP Cloud Platform) Cloud Foundry 环境下的开发。因为工作需要，我得在 Cloud Foundry 环境上使用当时流行的一些开发技术和解决方案，同 SAP CX 产品进行各种集成。



这又是一次编程理念和范式的迁移，从 SAP 专有技术栈(ABAP + SAP UI5)到开源开放的云原生应用开发转型。



当时我已经能够熟练将本地开发好的 SAP UI5，部署到远端 ABAP 服务器上。但当我试图将其部署到 SAP Cloud Platform Cloud Foundry 环境时，可以说是费了九牛二虎之力。



打开 SAP \[官网](https://help.sap.com/docs/btp/sap-business-technology-platform/develop-sap-fiori-application-and-deploy-it-to-cloud-foundry-using-sap-business-application-studio)，上面描述了详细的部署步骤，文档里每个句子都是简单句，没有生词，然而我却看不懂。







!\[](https://i-blog.csdnimg.cn/img\_convert/0ad355c3a86adc437be8b7f099868c56.webp?x-oss-process=image/format,png)



文档里充斥着 service instance, service broker, service key, service plan, service binding, service assignment, resource, module... 这些术语，我是越看越迷糊。



一边看文档心里一边呐喊，"我只想部署一个 Hello World 级别的 SAP UI5 上去，为什么要让我多学这么多东西!?"



后来经过漫长的学习和摸索之后，我发现要完成部署，总共需要完成包括但不仅限于这些配置文件的编写：



\- mta.yaml

\- xs-security.json

\- xs-app.json



!\[](https://i-blog.csdnimg.cn/img\_convert/8815906521c859d89b3eb9c6e1a85a40.webp?x-oss-process=image/format,png)

!\[](https://i-blog.csdnimg.cn/img\_convert/92ed0728cdff046fe5692059faceffdf.webp?x-oss-process=image/format,png)



而且配置文件全部是上图这种通过源代码编写的方式手写进行，错一个字母都不行。容错率极低，而且部分内容要在多个配置文件中交叉引用。



好几年之后，我终于成了一个 SAP BTP 熟手。



我进行过复盘：为什么我当初已经有了十年的 SAP 开发经验，但向 SAP BTP 的转型却仍然如此痛苦？作为一个 ABAP 老司机，SAP BTP 开发范式给我带来最大的困扰是什么？



表面上看，在应用配置这个领域，是从 SAPGUI 图形化界面里的这点一下那点一下，变成了在浏览器编辑器环境里改配置文件、写 yaml、跑 cf 命令行。



深层次看，是开发者的思维模型从 SPRO 和事务码驱动，切换成「代码即配置」。这个跨度，当时的我花了很长时间才适应。



\# 传统 ABAP 配置方式的特点：所见即所得的 SPRO 体验



在 ABAP 系统里，业务配置大多通过 SPRO 的 IMG 树完成。你点开「企业结构、财务会计、物料管理」，一路展开，到某个配置项目，背后其实就是维护若干配置表。



一个经验丰富的业务顾问，一看这块配置，就会联想到对应的表名、字段名。大部分 ABAP 开发者，其实并不关心表结构本身，而是依赖界面。



这套方式有几个优点，对 ABAP 人来说非常友好：

\- 信息是可视化的：比如维护工厂的时候，会看到工厂代码、描述、地址等字段，还可能有内嵌的 F4 帮助，哪怕对表结构不熟，照着字段说明也能填。

\- 错误反馈在界面层面完成：配置时如果漏掉必填字段，或填了不存在的公司代码，系统会即时报错。

\- 操作具有引导性：SPRO 里通过 IMG 路径告诉你配置顺序，类似业务蓝图，把复杂配置拆成一个个可视的步骤。这对刚入行的新手特别友好。

\- 和 ABAP 代码是松耦合的：很多 ABAP 开发的工作，是基于已经配置好的系统做 Z 报表、Z 接口、User Exit 等。配置是顾问负责，开发只要知道某张表里会有这些配置数据，通过 SELECT 读出来用即可。

\# Cloud Foundry 上的配置方式：一切都在 mta.yaml 和各种 \*.json 里



SAP BTP Cloud Foundry 环境进行的配置主要是 Technical 层面的配置。比如基于 MTA 的应用部署方式，配置的核心载体变成了一个 mta.yaml 文件。



MTA(Multi-Target Application) 描述了一个多目标应用的模块、资源以及它们之间的依赖关系，部署服务依据这个 mta.yaml 自动创建或绑定 Cloud Foundry 应用、服务实例以及 SAP 特定内容。



即使要把一个 Hello World 级别的 SAP UI5 应用部署到 SAP BTP Cloud Foundry 上，mta.yaml 文件至少也需要 82 行代码，笔者写这篇文章时亲测。



!\[](https://i-blog.csdnimg.cn/img\_convert/50de469bac9beab32e254f21269f924a.webp?x-oss-process=image/format,png)



\# modules 区域



\- sample-basic-html5-destination-content，类型是 com.sap.application.content，用来往 Destination 服务里部署内容。



\- sample-basic-html5-ui-deployer：也是 com.sap.application.content 类型，用来把构建好的 HTML5Module-content.zip 推送到 HTML5 Application Repository 的 app-host 实例里。



\- HTML5Module：类型是 html5，指向 HTML5Module 目录，里面是你的 UI5 前端代码，构建时通过 npm run build 生成静态内容。



\# resources 区域



\- sample-basic-html5-destination-service：类型是 org.cloudfoundry.managed-service，代表一个 Destination 服务实例。service: destination，service-plan: lite，并通过 config 把 HTML5Runtime\_enabled 等参数打开。

\- sample-basic-html5-repo-host：同样是 org.cloudfoundry.managed-service，这次是 HTML5 Application Repository 服务的 app-host 计划，用来集中存储前端应用的静态内容。

\- sample-basic-html5-uaa：XSUAA 服务实例，用于身份认证和授权，配置从 xs-security.json 读取。



Modules 区域使用了 com.sap.application.content，这是一种特殊模块类型，用于通过 Generic Application Content Deployer 部署内容，它会为需要的资源自动创建或复用 service key，并把内容部署到对应服务里。



对一个不熟悉 Cloud Foundry 的 ABAP 开发者来说，这一长串配置一下子把几个概念叠在一起：



\- Modules：代表代码或要部署的内容

\- Resources：代表 Cloud Foundry 上的服务实例，比如 destination、html5-apps-repo、xsuaa、connectivity、enterprise-messaging 等

\- 依赖关系：通过 requires 把模块和资源连起来，同时指定服务 key、目的地名称、sap.cloud.service 等元数据



这和原来在 SPRO 里点几下就能搞定的体验完全不一样。



!\[](https://i-blog.csdnimg.cn/img\_convert/7314ae0ca9ca741bbc9c8a1dd94765da.webp?x-oss-process=image/format,png)



把这段 mta.yaml 换成一个 ABAP 开发者熟悉的概念进行类比，可以这么理解：



\- resources：这个段落有点像你在 SM59 里维护了几个 RFC 目的地，在 SM30 里维护了一张目的地配置表，只不过现在这些配置放在外部的 yaml 文件中，由部署服务统一创建。

\- modules：这段有点像你在 SE80 里定义了几个 ABAP 开发包，每个包需要某些配置表 + Destination 才能运行。把这些依赖声明在 mta.yaml 里，部署时自动为你完成绑定。



问题在于，mta.yaml 把这些概念以一种「极度压缩」的方式塞进了几十行源代码里，对习惯 SAPGUI 的开发者来说非常不友好：



\- 视觉上缺少提示信息：在 SPRO 里，每个字段都有说明，鼠标一放上去还能弹出帮助；而在 mta.yaml 里，我们面对的是像 sap.cloud.service、content-target、existing\_destinations\_policy 之类的关键字，完全靠记忆或查文档。一不小心，sap.cloud.service 敲错一个字母，就会导致最终部署失败。而且报错的消息提示往往并不友好。



\- 缩进和结构错误很致命：yaml 是缩进敏感的语言，ABAP 老司机之前几乎没机会同这类语言打交道。mta.yaml 的含义很大程度取决于缩进层级，比如 parameters 是位于 requires 下，还是位于 resources 下，最后的语义完全不同。

\- 概念叠加太多：mta.yaml 里同时出现了应用模块类型(html5), 内容部署模块类型(com.sap.application.content), 服务资源类型(org.cloudfoundry.managed-service),目的地配置参数(HTML5Runtime\_enabled、OAuth2UserTokenExchange 等)，这对刚上手的开发者来说，就像传统 IMG 里把组织结构、科目表、定价条件、输出控制全部塞进一张配置表，想不晕都难。

\- 看不见的执行过程：SPRO 配置时，点「保存」就完成了；而 mta.yaml 需要 mbt build、cf deploy 和 cf push 这样的命令来触发部署，背后由 Cloud Foundry 部署服务解析和执行。

中间每一步的行为，只能在 SAP Business Application Studio 的终端控制台里看到一串串的 log 输出，这让很多习惯 SAPGUI 的开发者产生明显的不安全感。



笔者当时的感受，好比一个刚拿到自动挡驾照的新手，一下子被推上了包含大量机械开关的卡车驾驶位上一样，同时仪表盘换成了全英文界面。



以下是笔者以一个过来人的视角，给想从 ABAP 转型 SAP BTP 云原生开发的朋友们的一些建议。



大部分 ABAP 开发者转型中产生的不适，不只是因为觉得 yaml 文件可读性不好，而是 SAP BTP 背后的开发范式完全变了。



可以从以下几个维度来看这个变化。

\# 从一次性配置到可版本化的配置



SPRO 里的配置，一般是直接改生产系统或通过传统传输请求搬到生产系统。虽然也有传输记录，但在 ABAP 世界里，没人习惯把配置当成「代码」一样放进 Git 管理。



而在 SAP BTP 上，mta.yaml、xs-security.json、xs-app.json 都是项目源代码的一部分，可以放进 Git 仓库，通过分支来管理不同环境配置，在 CI/CD 管道里自动构建和部署。



也就是说，对于 SAP BTP 来说，「配置不再是系统里的一种状态」，而是开发项目里的一份 artifact(工件)。这对习惯「配置即数据」的 ABAP 开发者，是一次很大的思维反转。

\# 从界面引导到自助查文档



SPRO 的优势在于引导性强，业务顾问可以凭着经验从 IMG 树一路点到需要的配置节点。

而在 SAP BTP 世界，很多时候需要你自己去查帮助文档，比如 org.cloudfoundry.managed-service 支持哪些参数，Destination 服务的 HTML5Runtime\_enabled、init\_data、forwardAuthToken 等配置项含义，HTML5 Application Repository 的 

app-host 计划有什么限制和典型用途。



!\[](https://i-blog.csdnimg.cn/img\_convert/77809806ce2a6be27b3b8194c7dc752f.webp?x-oss-process=image/format,png)



本来这些信息主要存在于英文文档里，还常常分散在多个页面，对英文不够熟、阅读耐心有限的人来说有一定的学习成本。

\# 从单系统视角到多层环境 + 多服务视角

传统 ABAP System Landscape 不外乎 DEV、QAS、PRD 三套系统，各自有 IMG 配置、开发对象和传输路径。



在 SAP BTP Cloud Foundry 的场景中，开发者面对的是：

\- 全局账号、子账号、空间

\- 子账号级别的服务实例和权限

\- 空间级别的 Cloud Foundry 应用和服务绑定

\- 外部系统，如 S 4HANA、Event Mesh、Work Zone 等



mta.yaml 同时在多个层级上起作用，它决定：

\- 这个 mtar 部署时会创建哪些 Cloud Foundry 服务实例

\- 哪些模块需要哪些服务

\- 某些服务实例内部还会创建哪些 Destination 和哪些应用内容



这种跨层级的控制，对习惯了某个时间点只在「某个单一系统」里专注工作的 ABAP 开发者来说，需要花时间去适应。



!\[](https://i-blog.csdnimg.cn/img\_convert/4638e3f5aa536de59ada35909965de0c.webp?x-oss-process=image/format,png)



\# 工具链也完全不同



传统 ABAP 开发使用 SE80，SE38、SE24 等编写代码，用 SPRO 和 SM30 做配置。在 SAP BTP 里，典型工具集变成了 SAP Business Application Studio 或 Visual Studio Code，cf CLI、mbt、npm 等命令行工具，mta.yaml 和各种 json 文件。



来看现实项目中的一个例子。



某制造企业 A 公司，有一个经验很丰富的 ABAP 团队，负责 ECC 系统多年。他们被要求在 SAP BTP 上开发一套新的 HTML5 应用，通过 SAP Build Work Zone 发布，访问后端 S/4HANA OData 服务。



项目开始时，他们的直觉是：



\- 前端界面可以让一个稍懂 JavaScript 的同事做

\- ABAP 团队负责和后端 S/4HANA 的接口即可



但是一接触 SAP BTP 环境就发现，事情完全不是这么简单：



\- 搭建项目前，需要在 Subaccount 里开通 Cloud Foundry、配置 HTML5 Application Repository、Destination、XSUAA 等服务。

\- 在 SAP Business Application Studio 里，用 cds add mta 或模板创建 MTA 项目，自动生成 mta.yaml.

\- 项目构建部署，需要理解 modules、resources、com.sap.application.content、org.cloudfoundry.managed-service 这些概念。

\- 若要在 Work Zone 里看到部署好的应用，还要保证 sap.cloud.service 一致，Destination 里有对应配置，HTML5Runtime\_enabled 被打开。



!\[](https://i-blog.csdnimg.cn/img\_convert/2da225fd2c7e68b56011ba6a46fa93a8.webp?x-oss-process=image/format,png)



团队里的 ABAP 老兵，在折腾 mta.yaml 时，典型的心路历程是：

\- 一开始：为什么我要在一份文件里写出这么多服务的细节？以前这些东西不是 Basis 或系统管理员要做的事情吗？

\- 写到一半时：我只想像以前那样专心写 ABAP 代码，剩下的事情应该让别人帮我把这些服务配好。 

\- 遇到错误：Failed to create service instance、The service plan does not exist 等报错信息，让人怀疑人生，因为他根本不知道 service-plan: lite 或 app-host 是哪里来的。



项目进行到一半，项目经理发现，真正的阻力并不是 ABAP 人学不会 Javascript，而是对「代码即配置」理念产生的一种心理排斥。



最后他们是通过以下方式慢慢走出来的：



\- 由一位愿意玩云技术的 ABAP 开发者，专门负责 mta.yaml 和服务实例相关的工作

\- 把mta.yaml 的内容拆解成白板上的架构图：模块、服务、依赖，用图形表示，让大家先看图再看文件

\- 把常用的 resources 片段固化为模板，比如 HTML5 + Work Zone 场景下的标准三件套：Destination + HTML5 Repository + XSUAA



等团队在两三个项目中反复使用这些模板，对 mta.yaml 的恐惧就明显下降了。



笔者祝愿每一位有志转型 SAP BTP 开发的 ABAP 从业者，都能够平稳度过转型的阵痛期。



