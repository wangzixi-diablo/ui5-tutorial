笔者的[知识星球](https://t.zsxq.com/07RJRBlnM)里,不少朋友向我提问的关于 `Fiori` 的问题,我在回答之余发现,这些朋友没有搞清楚 `Fiori`,`Fiori App` 和 `SAP UI5` 这些概念的区别和联系。

这个现象也不奇怪，因为就连我自己，在刚刚接触 `SAP Fiori` 不久时，也没能将这些易混淆的概念区分清楚，于是笔者在本教程的第一篇文章里，详细剖析了这些概念之间的区别和联系：

[1. SAP Fiori 和 SAP UI5 的区别和联系](https://jerry.blog.csdn.net/article/details/131697542)

对于 `SAP UI5` 这门前端开发框架从入门到进阶的学习，笔者编写了一套开发教程：

[一套适合 SAP UI5 开发人员循序渐进的学习教程](https://blog.csdn.net/i042416/category_11395500.html)

`SAP UI5` 这套教程很受欢迎，截至 `2024 年 2 月 15 日`为止，已经有 `617` 个学习者订阅学习。

SAP UI5 和 Fiori 二者有什么关系？这就要从 Fiori 的发展历史说起。

SAP Fiori 1.0 于 2013 年推出，以其淡蓝色素雅背景的 Blue Crystal 主题惊艳了世人。Fiori 1.0 问世后，在 2014 和 2015 年间持续演进，从最初的`一系列应用程序的集合`, 逐渐发展成为 SAP 软件的`新一代用户体验标准`。SAP Fiori 现在广泛用于 SAP 公司的旗舰级产品 SAP S/4HANA，以及 SAP SuccessFactors Employee Central 解决方案、SAP Ariba 移动解决方案、SAP Hybris Cloud for Customer 等等。

![](https://img-blog.csdnimg.cn/img_convert/a780289c3812ee66895f3cbb2e966e92.webp?x-oss-process=image/format,png)

2016 年 10 月，`SAP Fiori 2.0` 发布，从 1.0 到 2.0 这个重大版本的迭代，代表了 SAP S/4HANA 和 SAP Business Suite 用户体验的演变。 SAP Fiori 2.0 基于 `SAP UI5` 技术（版本 1.40 及更高版本），更加关注用户及其工作方式。 SAP Fiori 2.0 是当时指导几乎所有 SAP 标准应用程序的领先设计，可在 On-Premise 本地部署和云解决方案中，提供 PC，Tablet 和智能手机上协调的用户体验。

![](https://img-blog.csdnimg.cn/img_convert/e8fa7485a653fe148f5e1d192be398de.webp?x-oss-process=image/format,png)

2019 年 9 月，最新 SAP Fiori 3 设计的第一部分，随 SAP S/4HANA 1909 和 SAP S/4HANA Cloud 1908 一起发布。SAP Fiori 3 的核心动机之一，是开发一种可以跨行业，跨 SAP 产品采用的设计，从而在整个产品组合中提供更加和谐一致的体验。 

SAP Fiori 3 设计的一些优点包括新主题 Quartz（作为 SAP Fiori 2.0 中使用的 Belize 主题的继承者），以及具有统一功能的新 shell 标题栏。

Fiori 3 仍然基于 `SAP UI5` 技术（1.65 及更高版本），新设计与背景更完美地地融合，整个系统设计提供了高度的可定制化，将重点放在应用程序内容上，使其更加突出醒目。所有这些都使得各种On-Premise 和云端解决方案的用户体验得到进一步的改善与调和。

![](https://img-blog.csdnimg.cn/img_convert/a20b002c8e6ed280ed20a7da44b8b33b.webp?x-oss-process=image/format,png)

3 代 Fiori 演化史的时间节点，如下图所示：

![](https://img-blog.csdnimg.cn/img_convert/e98d87fcc53a3f5da20757165196459b.webp?x-oss-process=image/format,png)


# SAP Fiori 到底指什么？

SAP Fiori 包含了三个维度的内容：

- SAP Fiori concept
- SAP Fiori design
- SAP Fiori technology

## SAP Fiori Concept

SAP Fiori Concept(概念)，从根本上来说是基于现代前端业界的设计原则，再结合 SAP 应用实际使用业务场景所提炼出来的一种用户体验理念，其概念的核心有以下五个要点：

- Role-based 基于角色
- Coherent 风格一致性
- Adaptive 自适应
- Simple 简约
- Delightful 令人愉快

![](https://img-blog.csdnimg.cn/img_convert/fcc5c543fc82eea9af8954221d51b3c5.webp?x-oss-process=image/format,png)

## SAP Fiori Design

The SAP Fiori design is the visual design, information architecture, colors, and interaction patterns that are defined in the SAP Fiori design guidelines.

SAP Fiori Design 即 SAP Fiori 设计指南中定义的视觉设计、信息架构(Information Architecture)、颜色和交互模式。

Fiori Design guideline 的官网[如下](https://experience.sap.com/fiori-design/), 对于应用的用户体验设计师们来说，这个 guideline 就是其进行应用交互设计的权威指南。

![](https://img-blog.csdnimg.cn/img_convert/bec8aeb8b0c93fd56ca2ad9e9fda98f4.webp?x-oss-process=image/format,png)

## Fiori Technology

SAP Fiori 技术包含构建、配置和运行 SAP Fiori 应用程序所需的所有架构、技术、基础设施和编程模型组件，以及 SAP Fiori Launchpad 的配置技术。

一个典型的 Fiori 应用，前端由 SAP UI5 框架开发，具体步骤笔者这套教程有详细介绍：

[一套适合 SAP UI5 开发人员循序渐进的学习教程](https://blog.csdn.net/i042416/category_11395500.html)

Fiori 应用的 SAP UI5 前端通过 `OData 服务`同后台进行交互。OData 服务在后台服务器的实现步骤，参考笔者这套开发教程：

[SAP OData 开发实战教程 - 从入门到提高](https://blog.csdn.net/i042416/category_12288659.html)

而本套教材取名 `SAP Fiori 知识点大全`，即笔者会通过超过 `400` 篇的文章篇幅，详细向大家介绍 `SAP Fiori` 的方方面面。

下面是本教程的详细目录：

- [0. SAP Fiori 技术架构介绍](https://blog.csdn.net/i042416/article/details/136176480)

- [1. SAP Fiori 和 SAP UI5 的区别和联系](https://jerry.blog.csdn.net/article/details/131697542)

- [2. 深入理解 SAP Fiori Front-end Server](https://jerry.blog.csdn.net/article/details/131750298)

- [3. Fiori 版本号和 SAP UI5 版本号的关联关系](https://jerry.blog.csdn.net/article/details/131751836)

- [4. 关于 SAP Fiori Tools 的一些误解澄清](https://jerry.blog.csdn.net/article/details/132050485)

- [5. 通过一个实例的例子，学习 SAP Fiori 应用中的 Draft Handling(草稿机制)](https://jerry.blog.csdn.net/article/details/132059374)

- [6.SAP Fiori Client 从 Public 应用市场下架之后，之前使用它的客户该怎么办](https://blog.csdn.net/i042416/article/details/132119739)

- [7. SAP Fiori 应用在 ABAP 系统的存储介质介绍 - SAP UI5 ABAP repository](https://blog.csdn.net/i042416/article/details/132124309)

- [8. 关于 SAP Fiori 新的 Horizon 主题支持的 SAP 产品及其版本](https://jerry.blog.csdn.net/article/details/132330965)

- [9. 什么是 SAP ABAP 为 Fiori 专门设计的编程模型(Programming Model)](https://jerry.blog.csdn.net/article/details/132468894)

- [10. 如何查看 SAP Fiori 某个配置 Task List 具体执行的 ABAP 代码](https://blog.csdn.net/i042416/article/details/136177436)

- [关于 SAP Fiori 应用里如何处理名称包含中文的附件文件上传](https://blog.csdn.net/i042416/article/details/135324452)

- [SAP UI5 Freestyle 开发和 Fiori Elements 开发技术各自的优势和劣势](https://blog.csdn.net/i042416/article/details/135972354)

- [如何在 Fiori Launchpad 上将自己需要的 Tile 配置出来](https://blog.csdn.net/i042416/article/details/136106666)

- [什么是 SAP Fiori 的 Technical Catalog](https://blog.csdn.net/i042416/article/details/136109714)

- [如何找出 SAP 标准 Fiori 应用某个按钮点击后执行的 JavaScript 源代码](https://jerry.blog.csdn.net/article/details/138229226)

- [SAP Fiori 应用如果从 Launchpad 上打不开，应该从哪些方面去分析？](https://jerry.blog.csdn.net/article/details/138636654)

- [如何通过单步调试的方法，找到 SAP Gateway 到底把 Fiori 应用发送的 OData 请求，投递到哪一台 ABAP 后台服务器了？](https://blog.csdn.net/i042416/article/details/143039787)

- [问题解答：关于 SAP OData(Gateway) 部署的几种方式](https://blog.csdn.net/i042416/article/details/143748187)

- [如何理解 SAP Fiori Role based 的用户体验](https://jerry.blog.csdn.net/article/details/144221421)

- [SAP UI5 和 Fiori 的一些小技巧合集 - 持续更新中](https://blog.csdn.net/i042416/article/details/143363122)

# 学习资料和参考文献

- [SAP Launchpad 配置](https://help.sap.com/doc/saphelp_nw75/7.5.5/en-US/a9/0ed59d22bb46898a2ec7a7dac215ef/frameset.htm)

- [Fiori Launchpad in SAP ABAP Platform](https://help.sap.com/docs/ABAP_PLATFORM_NEW/a7b390faab1140c087b8926571e942b7/f951b50a07ce41deb08ced62711fe8b5.html)

- [Fiori Overview](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/4275a5114ddf4e1f8b5f7696a3b2ee6a.html)