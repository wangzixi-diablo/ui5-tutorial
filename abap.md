曾几何时，ABAP 就是 SAP 的代名词。ABAP 这门编程语言造就了 SAP 名噪一时的 R/3 产品，同时也是如今 SAP 旗舰级产品，SAP S/4HANA 底层的实现语言。

ABAP 不仅代表着 SAP 这家公司在企业级管理软件市场辉煌的过去，ABAP 自身也在不断地进化着。SAP 不仅在本地部署(On-Premise)领域继续保持着自己绝对的统治地位，而且在云应用领域（Software-as-a-Service, 简称 SaaS), 也推出了自己的解决方案，比如 SAP S/4HANA Cloud，SAP Cloud for Customer，SAP Business-by-Design 等等。而这些 SAP 推出的云端软件，其后台的实现语言依旧是 ABAP.

笔者另一篇文章 [道家学派创始人老子，对 SAP ABAP 这门编程语言的客观评价](https://jerry.blog.csdn.net/article/details/137027128),曾经借助`道教创始人老子`的`数字化身`，讲述了 ABAP 之于 SAP 的重要性：

> 夫 ABAP 者，乃高级商业应用编程也。起源于德国 SAP 公司，以其构建企业资源计划（ERP）系统，助诸企于管理之道。如道生一，一生二，ABAP 亦从简至繁演化矣。

> 初，ABAP 生于九十年代初，为第四代语言，使编程如绘图，直观而易于把握。随技术之进步，渐含面向对象之法，以应万变之需。如水之于渊，柔而能胜刚，ABAP 之发展，顺时而动，应需而变，其在编程领域，犹如道之于万物，渐不可或缺矣。

> 再观其发展，自基础数据处理，至复杂业务逻辑实现，ABAP 如同道之于天下，渐成万物之母。用之于企业级管理软件开发，其重要性，犹如天地之不能相离。ABAP 能以数据为基，流转于系统之中，如道法自然，顺应企业之生态，助之以高效运转，减少冗杂，简化管理，使企之运营，如小国寡民，无为而治。

笔者 `2007 年 1 月`还在研究生三年级的学习时，以实习生的身份加入了 SAP 中国研究院，实习工作使用的编程语言就是 ABAP. 在此之前我从未听说过 ABAP 这门编程语言，在本科和研究生使用的是 C/C++. 因此所有 ABAP 开发人员刚刚接触这门编程语言遇到的陌生感，不适应，困扰，以及学习过程中遇到的各种困难和障碍，我都感同身受，因为这些我都统统经历过。

光阴似箭，转眼间我已经在 SAP 中国工作了 `17` 年，先后在 SAP Business-by-Design, SAP CRM，SAP Cloud for Customer，SAP S/4HANA 的产品开发工作中，我积累了丰富的 ABAP 开发和使用经验。我在 SAP 官方社区总共输出了大量的 SAP 技术博客，也因此被 SAP 官方任命为 `SAP 社区导师`和 `SAP 中国技术大使`。

![](https://img-blog.csdnimg.cn/direct/3fa1ef76e6e849379427991f1ddabd88.png)

我把自己 `17 年`的 ABAP 使用经验，浓缩到了这套 ABAP 学习教程里，希望帮助 ABAP 的初学者在 ABAP 学习之路上少走弯路。同时，对于已经有 ABAP 基础，又想进一步进阶，完善自己 ABAP 知识体系的进阶学习者，这套 ABAP 学习教程也能助你们一臂之力。

## 本专栏计划的文章数在 `300` 篇左右，到 `2024 年 3 月 26 日`为止，目前已经更新了 `171` 篇，专栏完成度为 `52.6%`

笔者这套[零基础快速学习 ABAP](https://blog.csdn.net/i042416/category_10946326.html)从 `2021 年 4 月 10 日`写下第一篇文章以来，感谢广大学习者一如既往的支持。本教程计划花费 `300` 左右的篇幅，向大家详细介绍 SAP ABAP 开发的方方面面。

大家在学习教程过程中，如果有任何关于 SAP ABAP 开发方面想了解的内容，可以直接在教程各篇文章下评论留言，也可以在[《零基础快速学习 ABAP 读者意见反馈和下一步写作计划表》](https://blog.csdn.net/i042416/article/details/127204857)里留言。我会将大家的意见统一汇总，作为我更新教程的内容参考来源之一。

# 教程亮点

- `写作风格深入浅出。`笔者虽然是 ABAP 技术专家，但不会在行文中使用艰深的技术词藻，来炫耀自己的 ABAP 技术，而是每篇文章都用平实和通俗易懂的语言，把一个个 ABAP 知识点讲解清楚。

- `有自己的独到见解。`目前国内很多博客主编写的 ABAP 学习教程，都是 SAP 官方帮助文档的简单翻译和重复。笔者结合自己长达 16 年的 ABAP 使用经验，教程每篇文章都包含自己独特的见解，不但给大家讲解了 ABAP 知识点，同时还分享自己对知识点的理解，为什么 SAP 要这样设计？背后的动机是什么？通过这些拓展介绍，力求让大家在学习过程中，做到知其然更知其所以然。

- `图文并茂。`笔者在 SAP 中国研究院撰写内部技术文档时，就养成了图文并茂的写作习惯。一图胜万语。不少抽象的知识点，即使大段文字描述，也很难帮助初学者有一个直观的理解。此时配上几张图片，往往事半功倍。另外编程语言的学习是一个对动手能力要求很高的活动，教程里这些在开发工具里的实际截图，能帮助学习者把握动手操作的要点，高效掌握 ABAP 各种开发的核心步骤。

- `内容全面，自成体系。`本教程计划通过多达 `300 余篇`的篇幅，来全面介绍 ABAP. 目前已经完成了 `165` 篇。而 300 篇`并非`教程最终的篇幅，因为我会在写作过程中，根据学习者的反馈和要求，在本教程的写作列表中添加新的 `TODO` 项目。

- `面向实战。`本教程写作的素材主要来自两方面。第一方面是笔者 `17 年` ABAP 开发生涯过程中，认为每一个 ABAP 开发者都必须掌握的核心内容，笔者将其以文章的形式输出。第二方面是，笔者经常会从自己的`微信公众号`，`知乎咨询`，[知识星球](https://wx.zsxq.com/dweb2/index/group/51128814521124)，和`国内各大技术社区`收到 ABAP 从业人员给我发起的各种咨询。有些问题我如果觉得非常具有代表性，我也会将背后的知识点的讲解，编入这套教程。因此，教程的每篇文章都是 ABAP 开发者在工作中会遇到的实际问题和任务，每篇文章都配有学习者能够自己动手练习的完整源代码。

- `反馈及时。`学习者在学习这套教程中如果遇到问题，可以在对应的文章末尾留言。我会每天抽时间查看评论区并回复。包括每天上下班的地铁途中，中午晚上吃饭的间隙，种种碎片时间段，我都会和学习者的评论留言互动。这些互动，其实也是我自己不断查漏补缺，完善自己 ABAP 知识体系的一个渠道。学无止境。大家可以通过目前已经完成的 `165` 篇文章的评论区，来查看以往的学习者曾经遇到的问题，以及我的解答。

# 学习者的收获

完成这套教程的学习之后，大家能够获得下面这些收获：

- 理解 ABAP 系统经典的三层架构（Presentation Layer，Application Layer 和 Database Layer）的概念，了解 ABAP 系统会话管理机制（Session Management），了解 ABAP 面向过程编程方式和面向对象编程方式的区别。

- 能够熟练掌握 ABAP 编程语言的基本特性，能够胜任日常的 ABAP 开发工作。包括掌握 ABAP Subroutine，Function Module 的用法，会创建包含 Screen 的 ABAP 程序，会创建数据库表并完成数据的读写操作。了解 ABAP Data Element 的设计原理，能使用 Field Symbol 和引用类型完成编程任务。了解 ABAP Transport Request 的概念和使用方法。了解 ABAP 程序锁机制的工作原理和使用方式。理解 ABAP 方法调用传引用和传值两种方式的差异。

- 熟练使用 ABAP 调试器对 ABAP 程序进行单步调试和错误排查。

- 国内 ABAP 开发项目中，Excel / Word 文件的读写，ALV 报表的设计，XML / JSON 文件的解析，带水印 PDF 文件的生成，邮件发送，这些都是常见的需求。本教程对这些常见需求的实现做了详细介绍。

- 熟练掌握 ST05，SAT，ST22 和一系列的 ABAP 系统分析和(性能)监控工具的使用。

- 能学习到 ABAP 框架开发人员使用的 `RTTI` 和 `RTTC` 技术来实现解决工作中的实际需求。ABAP RTTI 的全称是 `Runtime Type Identification`. 使用 RTTI，ABAP 开发人员可以在运行时获取关于数据对象的各种信息，包括其数据类型、字段列表（如果数据是Structure 或者内表的话）以及这些字段的技术属性，比如字段名称，字段数据类型，长度等等。对于这些字段信息，ABAP 提供了一组特殊的类和接口，包括 CL_ABAP_TYPEDESCR、CL_ABAP_STRUCTDESCR、CL_ABAP_TABLEDESCR 等等。ABAP RTTI 通常伴随着 RTTC 一起使用。`RTTC（Run Time Type Creation)`是 ABAP 语言的一个特性，它允许 ABAP 开发人员在运行时动态地创建和修改数据类型，而不必在编译时提前定义它们。

# 本专栏适合哪些学习者

- 有一定的其他编程语言的基础，但从未接触过 ABAP 的开发人员。

- 已经在工作中有过几个月到三年的 ABAP 使用经验，能胜任日常工作，但是没有系统而全面学习过 ABAP，想进一步提高自己 ABAP 技术水平的初级 ABAP 开发人员。

- 有三年以上 ABAP 编程经验，想朝着 ABAP 专家的方向努力，但是不知道具体如何进阶的 ABAP 中级水平的开发人员。

# 零基础 ABAP 学习教程系列文章的目录

* [0. 自学 ABAP 和自学 SAP 的差别](https://jerry.blog.csdn.net/article/details/127581186)

* [1. ABAP 标准培训教程 BC400 学习笔记之一：ABAP 服务器的架构和一个典型的 ABAP 程序结构介绍](https://jerry.blog.csdn.net/article/details/116206859)

* [2. ABAP 标准培训教程 BC400 学习笔记之二：Cross-client 和 Client-specific 的区别](https://jerry.blog.csdn.net/article/details/116210632)

* [3. ABAP 标准培训教程 BC400 学习笔记之三：ABAP 编程语言的特性和基本构成要素](https://jerry.blog.csdn.net/article/details/116720010)

* [4. ABAP 标准培训教程 BC400 学习笔记之四：ABAP 编程语言的数据类型](https://jerry.blog.csdn.net/article/details/116897898)

* [5. ABAP 标准培训教程 BC400 学习笔记之五：ABAP 编程语言的变量，常量和字面量，以及文本符号](https://jerry.blog.csdn.net/article/details/116904032)

## ABAP 基础知识

* [6. 通过实际的例子，介绍 SAP ABAP 里的 Repository Information System 的使用技巧](https://jerry.blog.csdn.net/article/details/116700888)

* [7. ABAP function module 的使用](https://jerry.blog.csdn.net/article/details/115585499)

* [8. ABAP subroutine 的定义和使用](https://jerry.blog.csdn.net/article/details/115571773)

* [9. ABAP 中的变量和常量](https://jerry.blog.csdn.net/article/details/115568264)

* [10. ABAP 编程语言中的系统字段(System Fields)](https://jerry.blog.csdn.net/article/details/117606987)

* [11. 什么是 ABAP Field Symbol](https://jerry.blog.csdn.net/article/details/117620671)

* [12. ABAP 引用类型介绍](https://jerry.blog.csdn.net/article/details/118519889)

* [13. 最浅显易懂的 SAPGUI 里 ABAP 调试器的使用方法介绍](https://jerry.blog.csdn.net/article/details/120590388)

* [14. 如何创建最简单的 ABAP 数据库表，以及编码从数据库表中读取数据 (上)](https://jerry.blog.csdn.net/article/details/121051795)

* [15. 如何创建最简单的 ABAP 数据库表，以及编码从数据库表中读取数据 (下)](https://jerry.blog.csdn.net/article/details/121056690)

* [16. 用 ABAP 读取本地文本文件内容](https://jerry.blog.csdn.net/article/details/123753797)

* [17. 26 行 ABAP 代码使用 HTTP_GET 函数下载百度网站的首页数据](https://jerry.blog.csdn.net/article/details/123978542)

* [18. ABAP 如何解析 JSON 数据](https://blog.csdn.net/i042416/article/details/124222988)

* [19. 如何从本地文件里拷贝某个 ABAP 类到 SAP 系统](https://blog.csdn.net/i042416/article/details/124229848)

* [20. 面向对象的 ABAP 编程初探 - 什么是类，实例，和 Public 方法](https://jerry.blog.csdn.net/article/details/124239023)

* [21. SAP ABAP 报表的用户输入功能](https://jerry.blog.csdn.net/article/details/124261506)

* [22. 使用 ABAP 事物码 SM59 创建 Destination 来读取外网的数据](https://blog.csdn.net/i042416/article/details/124610251)

* [23. 通过一个具体的例子，讲解 SAP BDC 技术的使用步骤](https://jerry.blog.csdn.net/article/details/125112087)

* [24. 从解读 BDC 自动生成的代码谈起，讲解 SAPGUI 的程序组成部分](https://blog.csdn.net/i042416/article/details/125216274)

* [25. 如何查询 SAPGUI 屏幕上某个字段对应的数据库表存储](https://blog.csdn.net/i042416/article/details/125226098)

* [26. 如何使用事物码 SAT 查找某个 SAPGUI 屏幕字段对应的后台存储数据库表的名称](https://blog.csdn.net/i042416/article/details/125238865)

* [27. 一步步创建包含自定义 Screen 的 ABAP 程序的详细步骤](https://blog.csdn.net/i042416/article/details/125245129)

* [28. SAP ABAP 字符串变量容易疏忽和混淆的一些知识点](https://jerry.blog.csdn.net/article/details/125340395)

* [SAP ABAP 处理 Excel 的标准函数 TEXT_CONVERT_XLS_TO_SAP 介绍](https://jerry.blog.csdn.net/article/details/125357542)

* [29. 授人以渔-在 SAP MM 物料显示界面上看到一个字段，如何查找哪张数据库表的哪个字段进行的存储](https://jerry.blog.csdn.net/article/details/125800843)

* [30. SAP ABAP 系统进行数据库表查询的几种常用方法](https://jerry.blog.csdn.net/article/details/125807772)

* [31. 如何让 ABAP 服务器能够响应通过浏览器发起的自定义 HTTP 请求](https://blog.csdn.net/i042416/article/details/125834777)

* [32. 一个 15 年 SAP ABAP 开发人员分享的 SAPGUI 一些个性化设置和实用小技巧](https://jerry.blog.csdn.net/article/details/126070537)

* [33. 如何使用 saplink 安装其他网站上提供的 ABAP 程序](https://jerry.blog.csdn.net/article/details/126200575)

* [34. ABAP 报表中如何给报表的输入参数增添 F4 Value Help](https://jerry.blog.csdn.net/article/details/126230809)

* [35. ABAP 报表中如何以二进制方式上传本地文件](https://jerry.blog.csdn.net/article/details/126237539)

* [36. ABAP 里文件操作涉及到中文字符集的问题和解决方案](https://blog.csdn.net/i042416/article/details/126256423)

* [37. 如何对 ABAP 数据库表通过 ABAP 代码进行更新和删除操作](https://jerry.blog.csdn.net/article/details/126668999)

* [38. 如何让 ABAP 报表在后台作业的模式下运行](https://jerry.blog.csdn.net/article/details/126674872)

* [39. 如何使用 ABAP 代码解析 XML 文件](https://blog.csdn.net/i042416/article/details/126682246)

* [40. 如何使用 ABAP 代码发送邮件到指定邮箱](https://jerry.blog.csdn.net/article/details/126726199)

* [41. 如何使用 ABAP 代码发送带有 PDF 附件的电子邮件](https://jerry.blog.csdn.net/article/details/126735005)

* [50. 如何在 SAPGUI 里显示上传到 ABAP 服务器的 PDF 文件](https://jerry.blog.csdn.net/article/details/126810978)

* [51. 如何在 SAP ABAP 系统中使用 Adobe Form](https://jerry.blog.csdn.net/article/details/126817904)

* [52. 使用 SAP ABAP 代码生成 PDF 文件，填充以业务数据并显示在 SAPGUI 里](https://jerry.blog.csdn.net/article/details/126823388)

* [53. 如何把 SAP ABAP 系统里一张数据库表的内容，显示在 Adobe PDF Form 里](https://jerry.blog.csdn.net/article/details/126830619)

* [54. 使用 ABAP 代码制作手机能够扫描的二维码(QRCode)](https://jerry.blog.csdn.net/article/details/126843222)

* [55. ABAP 是一门支持面向过程和面向对象的混合型编程语言，实际开发中用哪种？](https://jerry.blog.csdn.net/article/details/127005502)

* [57. SAPGUI 里 F1 功能键的用法专题讲解](https://jerry.blog.csdn.net/article/details/127347151)

* [58. 通俗易懂的 SAP ABAP 会话管理(Session Management)概念讲解，包含具体的实例](https://jerry.blog.csdn.net/article/details/127360829)

* [59. 案例分析 - 如何通过 F1 和单步调试，找到 SE10 事物码里用户名字段的初始值填充逻辑](https://blog.csdn.net/i042416/article/details/127390737)

* [60. 如何通过 ABAP RFC 远程函数调用来跨系统消费远端服务器的 ABAP 函数](https://blog.csdn.net/i042416/article/details/127497500)

* [61. 如何使用 Java 程序通过 SAP Java Connector 调用 ABAP 系统的函数](https://blog.csdn.net/i042416/article/details/127523003)

* [62. 如何通过增强(Enhancement) 的方式给 SAP ABAP 标准程序增添新功能](https://jerry.blog.csdn.net/article/details/127571379)

* [62 番外篇：如何通过增强(Enhancement)的方式，给 ABAP Function Module 增添新的功能](https://blog.csdn.net/i042416/article/details/135550214)

* [63. 如何使用 Visual Studio Code 查看和浏览 ABAP 代码](https://jerry.blog.csdn.net/article/details/127777629)

* [64. 如何在浏览器里执行 SAPGUI 的事务](https://jerry.blog.csdn.net/article/details/127820090)

* [65. 使用事物码 SAT 查找某个 SAPGUI 事物码操作调用的 Function Module 列表](https://jerry.blog.csdn.net/article/details/127846222)

* [66. SAP ABAP Function Module 的动态调用方式使用方式介绍](https://jerry.blog.csdn.net/article/details/128018784)

* [67. SAP ABAP 监控用户事物码和程序执行的工具介绍](https://jerry.blog.csdn.net/article/details/128046072)

* [68. 关于 SAP ABAP 报表的多语言显示问题](https://jerry.blog.csdn.net/article/details/128244700)

* [71. SAP ABAP 报表屏幕输入字段如何实现联动效果](https://jerry.blog.csdn.net/article/details/128375323)

* [73. 如何手动通过增强的方式，给 SAP ABAP 数据库表增添新的字段](https://jerry.blog.csdn.net/article/details/128521082)

* [74. 学会使用 SAP ABAP Application Log 在代码里添加应用日志记录功能](https://jerry.blog.csdn.net/article/details/128542936)

* [75. SAP ABAP 一个有用的程序正确性辅助工具，Checkpoint group 的使用方法介绍](https://jerry.blog.csdn.net/article/details/128551824)

* [76. 如何使用 ST05 事物码，快速找到访问指定数据库表的 ABAP 代码](https://jerry.blog.csdn.net/article/details/128602328)

* [77. 简单聊聊 ABAP 变量消耗的内存空间这个话题](https://jerry.blog.csdn.net/article/details/128615663)

* [78. 浅谈 ABAP 程序运行时出现『内存耗尽』错误的问题](https://jerry.blog.csdn.net/article/details/128621247)

* [79. 使用 OPEN CURSOR 和 FETCH NEXT CURSOR 对 SAP 数据库表进行分块读写](https://jerry.blog.csdn.net/article/details/128630990)

* [80. 使用事务码 SAT 比较传统的 SELECT SQL 语句和 OPEN / FETCH CURSOR 分块读取 ABAP 数据库表两种方式的性能差异](https://jerry.blog.csdn.net/article/details/128690728)

* [81. 使用 SAP ABAP Memory Inspector 对应用程序消耗内存进行检测时常犯的错误](https://jerry.blog.csdn.net/article/details/128708580)

* [82. 让要检索的 ABAP 源代码无所遁形 - 介绍一款 ABAP 代码搜索工具 RS_ABAP_SOURCE_SCAN](https://jerry.blog.csdn.net/article/details/128745935)

* [83. 一静一动，一张一弛 - 通过具体的两个例子，学习 ABAP 动态断点的使用诀窍](https://jerry.blog.csdn.net/article/details/128747185)

* [84. ABAP 数据字典里数据元素(Data Element)，结构(Structure)和表类型(Table Type)三者的使用辨析](https://jerry.blog.csdn.net/article/details/128770049)

* [85. ABAP 创建数据类型的三种方式，各自的使用场合和优缺点辨析](https://jerry.blog.csdn.net/article/details/128787814)

* [86. 有没有设置能够限制 ABAP 数据库表能够存储的最大记录数？](https://jerry.blog.csdn.net/article/details/128805157)

* [87. SAP ABAP 方法调用里传值(Pass Value)和传引用(Pass Reference)的区别](https://jerry.blog.csdn.net/article/details/129033772)

* [88. ABAP 方法调用的参数传递里，通过引用传递的方式，能修改原始参数值吗？](https://jerry.blog.csdn.net/article/details/129094158)

* [89. SAP ABAP MIME Repository 和 API 介绍](https://jerry.blog.csdn.net/article/details/129785805)

* [90. 将 SAP ABAP 内表内容本地导出成 Excel 文件](https://jerry.blog.csdn.net/article/details/129805496)

* [91. SAP 系统里的中文数据，用 ABAP 导出成 Excel 文件时遇到乱码的分析和解决办法](https://jerry.blog.csdn.net/article/details/129827218)

* [92. SAP ABAP 系统里长文本 Long Text 的设计和读取函数 READ_TEXT 解析](https://jerry.blog.csdn.net/article/details/130447463) 

* [93. 使用 ABAP 代码调用 READ_TEXT 读取 SAP 系统业务对象的长文本(Long Text)内容](https://jerry.blog.csdn.net/article/details/130448406)

* [94. 使用事务码 ST05 对 SAP ABAP 数据库表访问性能调优的一个具体例子](https://jerry.blog.csdn.net/article/details/130620431)

* [95. 使用 FOR ALL ENTRIES 将 ABAP 内表内容作为数据库表的读取条件之一](https://jerry.blog.csdn.net/article/details/130627649)

* [96. 如何直接通过 ABAP 调试器将 SE16 事务码里无法直接查看的内容下载到本地](https://jerry.blog.csdn.net/article/details/130919549)

* [97. 将 SAP ABAP 数据库表里存储的文件二进制内容下载成为本地文件](https://jerry.blog.csdn.net/article/details/131018132)

* [98. 如何用 ABAP 生成带有水印(Watermark)的 PDF 文件](https://jerry.blog.csdn.net/article/details/131276558)

* [99. 什么是 ABAP 的 Message Class，Message Number 和 Message Text](https://jerry.blog.csdn.net/article/details/131289296)

* [100. 实际案例分析 - 根据应用程序日志的记录，反查出哪一行 ABAP 代码产生的这条日志](https://jerry.blog.csdn.net/article/details/131352000)

* [101. 仅仅 49 行代码就能使用 ABAP 函数发送邮件到指定邮箱](https://jerry.blog.csdn.net/article/details/131472393)

* [102. 创建 ABAP Data Element 时，应该选择 Domain 还是 Predefined Type?](https://jerry.blog.csdn.net/article/details/131498486)

* [103. 授人以渔：如何获得当前登录 SAP ABAP 系统用户的主机名](https://jerry.blog.csdn.net/article/details/131500277)

* [104. SAP ABAP PDF 如果生成失败，应该如何搜集 Trace 信息进行错误排查](https://jerry.blog.csdn.net/article/details/131503611)

* [105. 如何把 SAP ABAP 字符串变量的值下载成本地文件，以及文件路径 F4 Value Help 的实现方式](https://jerry.blog.csdn.net/article/details/131556354)

* [106. 什么是 SAP ABAP 系统里的传输请求(Transport Request)](https://jerry.blog.csdn.net/article/details/131783385)

* [107. SAP ABAP 传输请求背后的读取函数和存储数据库表讲解](https://jerry.blog.csdn.net/article/details/131805053)

* [108. SAP ABAP 报表进度显示控件的使用详解](https://jerry.blog.csdn.net/article/details/132031314)

* [109. SAP ABAP 应用程序中的锁机制和工作原理介绍](https://blog.csdn.net/i042416/article/details/132228576)

* [110. SAP ABAP 系统支持的锁操作类型和各自使用场景的详细讲解](https://jerry.blog.csdn.net/article/details/132297630)

* [111. 如何创建 SAP ABAP 锁对象(Lock Object)和加锁以及解锁函数](https://jerry.blog.csdn.net/article/details/132502387)

* [112. SAP ABAP Dump Analysis(ST22) 工具的使用和背景介绍](https://jerry.blog.csdn.net/article/details/132788420)

* [113. ABAP 异常处理(Exception Handling) - 什么是 Non-Class-Based 异常](https://jerry.blog.csdn.net/article/details/133324193)

* [114. ABAP None-Class-Based 异常处理的一些局限性介绍](https://jerry.blog.csdn.net/article/details/133884608)

* [115. 面向对象的 ABAP 里，全局类和局部类有什么区别，以及各自的使用场合](https://jerry.blog.csdn.net/article/details/133909542)

* [116. ABAP 面向对象编程里，类的构造函数和静态构造函数的区别辨析](https://blog.csdn.net/i042416/article/details/134167057)

* [118. 使用现实生活的具体例子，讲解 SAP ABAP 系统 Client 的概念和用途](https://blog.csdn.net/i042416/article/details/134417951)

* [119. 小技巧分享 - 找出 SAP ABAP SPRO 配置项后台对应配置表的两种办法](https://blog.csdn.net/i042416/article/details/134422525)

* [120. SAP ABAP 动态生成 ABAP 程序并动态调用的例子代码](https://blog.csdn.net/i042416/article/details/134430137)

* [121. SAP ABAP 字符串模版(String Template)核心知识点举例说明](https://blog.csdn.net/i042416/article/details/134462106)

* [122. SAP ABAP 各种增强技术(Enhancement)概述 - 所谓第一代，第二代，第三代增强技术的出处是？](https://blog.csdn.net/i042416/article/details/134558667)

* [123. SAP ABAP 显式增强技术之 New BAdI 的技术原理介绍](https://blog.csdn.net/i042416/article/details/134574295)

* [124. SAP ABAP 显式增强技术之 New BAdI 的实战介绍 - 如何创建和激活增强实现](https://blog.csdn.net/i042416/article/details/134620985)

* [125. SAP ABAP 里如何高效找到修改某个数据库表字段的 ABAP 程序的三种思路介绍](https://blog.csdn.net/i042416/article/details/134698649)

* [126. 答知识星球朋友疑问：执行 ABAP 代码出现超时的原因，背后的理论和解决方案](https://blog.csdn.net/i042416/article/details/134734766)

* [127. 答网友疑问：ABAP Function Module 如何支持内表结构不确定的动态输入参数](https://blog.csdn.net/i042416/article/details/134886645)

* [128. 工作实战：SAP ABAP 动态创建类型在实际工作中的一个应用场合分享](https://blog.csdn.net/i042416/article/details/134930687)

* [129. SAP ABAP Update Process(更新进程)的概念和设计动机解析](https://blog.csdn.net/i042416/article/details/135141283)

* [130. SAP ABAP 更新函数（Update Function Module）执行出错的原因分析](https://blog.csdn.net/i042416/article/details/135175453)

* [131. 聊聊 SAP ABAP 系统的 ABAP 对象注册表 TADIR](https://blog.csdn.net/i042416/article/details/135561480)

* [132. 通过一个最简单的例子，学习在 ABAP 类里编写 SQLScript 的技术 - AMDP](https://blog.csdn.net/i042416/article/details/135963356)

* [133. 九行代码学习使用 Transformation 的方式把 ABAP 数据序列化成 XML](https://jerry.blog.csdn.net/article/details/135978952)

* [134. 如何把一个 ABAP 类的实例，序列化成 XML 字符串](https://blog.csdn.net/i042416/article/details/136038030)

* [135. 如何使用 Pre-Exit 和 Post-Exit 的方式，增强一个 ABAP 类的方法](https://blog.csdn.net/i042416/article/details/136060208)

* [136. 聊聊 SAP ABAP 系统里除了 TADIR 之外的其他注册表](https://jerry.blog.csdn.net/article/details/136088359)

* [137. 如何使用动态 ABAP 程序生成技术，对 ABAP 系统标准的报表行为进行微调](https://blog.csdn.net/i042416/article/details/136096190)

* [138. 第三方系统或者工具通过 HTTP 请求发送给 ABAP 系统的数据，应该如何解析](https://blog.csdn.net/i042416/article/details/136100912)

* [139. 如何获取一个 ABAP 类所有方法源代码行数的列表](https://blog.csdn.net/i042416/article/details/136106092)

* [140. ABAP 开发项目实战里， 定义常量的几种方法和技巧总结](https://blog.csdn.net/i042416/article/details/136129595)

* [141. 使用 ABAP 单例模式避免 ABAP 应用程序额外内存消耗的一个实战案例](https://blog.csdn.net/i042416/article/details/136318660)

* [142. 迈入 SAP CDS View 世界的前置知识 - SAP ABAP 数据库视图介绍](https://blog.csdn.net/i042416/article/details/136585393)

* [145. SAP S/4HANA 系统的底层基石 - 通过实际的例子，介绍 CDS View 入门级的概念](https://blog.csdn.net/i042416/article/details/136598724)

* [146. SAP ABAP CDS View 源代码存储的数据库表揭秘和其他相关数据库表介绍](https://blog.csdn.net/i042416/article/details/136603848)

* [147. SAP ABAP Subscreen 使用介绍](https://blog.csdn.net/i042416/article/details/136748102)

* [148. 使用 SAPGUI 的 Docking 控件将屏幕划分成若干子区域](https://blog.csdn.net/i042416/article/details/136946221)

* [149. 如何在 SAPGUI 的 ABAP 报表里显示图片](https://blog.csdn.net/i042416/article/details/137009184)

* 更多文章正在写作中
        
## Office 专题

* [42. 用 ABAP 新建本地 Excel 文件并写入数据](https://jerry.blog.csdn.net/article/details/123761027)

* [43. 如何使用 ABAP 创建包含不同字体大小的 Word 文档](https://jerry.blog.csdn.net/article/details/126214988)

* 更多文章正在写作中

## ALV 开发专题

* [44. 27 行代码开发一个最简单的 SAP ALV 报表](https://jerry.blog.csdn.net/article/details/123010291)

* [45. 48 行代码给 ABAP ALV 报表的数据行增添颜色效果](https://jerry.blog.csdn.net/article/details/123017241)

* [46. 77 行代码实现ABAP ALV 中的双击事件处理](https://jerry.blog.csdn.net/article/details/123020730)

* [47. SAP ABAP ALV 层次顺序表如何使用双表头(Multiple Headers)进行数据输出](https://jerry.blog.csdn.net/article/details/126443398)

* [48. 如何在 SAP ABAP ALV 报表里以交通灯的方式显示某一列的值](https://jerry.blog.csdn.net/article/details/126676314)

* [49. 在弹出对话框窗口里显示 SAP ABAP ALV 列表](https://jerry.blog.csdn.net/article/details/126795526)

* [56. 动手开发一个有用的 ABAP ALV 工具 - 查看指定用户的 ABAP 传输请求,模拟 SE10 事物码](https://jerry.blog.csdn.net/article/details/127181885)

* [69. 利用 ALV 实现增删改查系列之一：让 ALV 报表进入可编辑状态](https://jerry.blog.csdn.net/article/details/128334599)

* [70. 利用 ALV 实现增删改查系列之二：仅让 ALV 报表某一列允许被编辑](https://jerry.blog.csdn.net/article/details/128347145)

* [72. 利用 ALV 实现增删改查系列之三：如何给 SAP ABAP ALV 报表的修改功能添加自定义校验逻辑](https://jerry.blog.csdn.net/article/details/128394760)

* [117. 利用 ALV 实现增删改查系列之四：如何给 SAP ABAP ALV 报表行项目删除时增加弹出提示](https://blog.csdn.net/i042416/article/details/134233627)

* [142. SAP ABAP ALV 报表单击某列后执行某段 ABAP 逻辑的实现方式 - hotspot 行为实现](https://blog.csdn.net/i042416/article/details/136373908)

* [工具分享 - SAP ALV 报表，如何按照某列进行升序或者降序排序显示](https://blog.csdn.net/i042416/article/details/136388971)

* [143. SAP ABAP ALV 的分组显示和 Subtotal 显示实现的技术步骤](https://blog.csdn.net/i042416/article/details/136396881)

* [144. ABAP 泛型编程实战 - 分享一个数据库表内容的拷贝工具](https://jerry.blog.csdn.net/article/details/136403862)

* [SAP ABAP ALV List 和 ALV Grid 这两种控件的使用方法和使用场景区别辨析](https://jerry.blog.csdn.net/article/details/136442892)

## ABAP 7.40 新语法介绍系列

* [ABAP 7.40 新语法介绍系列之一 - ABAP 变量内联声明(Inline Declaration)](https://jerry.blog.csdn.net/article/details/136416842)

* [ABAP 7.40 新语法介绍系列之二 - ABAP 类型转换操作符 CONV](https://blog.csdn.net/i042416/article/details/136424264)

* [ABAP 7.40 新语法介绍系列之三 - ABAP Value 操作符](https://blog.csdn.net/i042416/article/details/136430690)

* [ABAP 7.40 新语法介绍系列之四 - ABAP Table Expression 内表表达式的用法](https://blog.csdn.net/i042416/article/details/136497955)

* [ABAP 7.40 新语法介绍系列之五 - 增强的 ABAP OPEN SQL 语法介绍](https://jerry.blog.csdn.net/article/details/136557038)

## 问题解答

本区域包含通过知乎付费咨询和[知识星球](https://t.zsxq.com/07RJRBlnM)向我提出并得到解答的问题：

- [SAP ABAP 系统 Lock Table 最多支持对多少条数据库记录进行上锁操作](https://blog.csdn.net/i042416/article/details/132116964)

- [如何使用 SAP ABAP Development Tool 连接 SAP BTP 上的免费 ABAP 编程环境](https://jerry.blog.csdn.net/article/details/132801599)

- [问题解答：如何查询 SAP ABAP 系统做过的基于源代码的增强信息](https://blog.csdn.net/i042416/article/details/135560120)

- [问题解答：通过 SAP MRP Live 案例，解释什么是 SAP AMDP BADI](https://blog.csdn.net/i042416/article/details/135942070)

- [问题解答：如何使用 SAP ABAP Development Tool 创建和修改 BAdI](https://blog.csdn.net/i042416/article/details/135961516)

- [问题解答：什么是 ABAP SYSTEM-EXIT, 什么是 Conversion Routine(转换历程)](https://blog.csdn.net/i042416/article/details/136045349)

- [问题解答：ABAP 关键字 ANY TABLE 的使用场合深入剖析](https://blog.csdn.net/i042416/article/details/137048853)

## 实战案例分享

- [小技巧分享：如何使用动态断点快速找到成对的 ABAP 内存 IMPORT 和 EXPORT 的代码位置](https://blog.csdn.net/i042416/article/details/135207434)

- [实战案例分享 - 从 SAPGUI 屏幕上一个字段出发，想查找它在哪个数据库表存储，最后发现找不到，怎么回事？](https://jerry.blog.csdn.net/article/details/136345882)

- [工具分享 - 将一个 ABAP Function Group 内所有 Function Module 按照代码行数从高到低排序并显示](https://blog.csdn.net/i042416/article/details/136388971)

- [小技巧分享：如何查询 SAP ABAP 系统里消耗存储空间排名前几位的数据库表](https://blog.csdn.net/i042416/article/details/136611422)

- [小技巧分享 - 使用 Visual Studio Code 查看和修改 ABAP 代码](https://blog.csdn.net/i042416/article/details/136912233)

## 更多文章正在写作中  

大家在学习教程过程中，如果有任何关于 SAP ABAP 开发方面想了解的内容，可以直接在教程各篇文章下评论留言，也可以在[《零基础快速学习 ABAP 读者意见反馈和下一步写作计划表》](https://blog.csdn.net/i042416/article/details/127204857)里留言。我会将大家的意见统一汇总，作为我更新教程的内容参考来源之一。

祝大家学习愉快。

![](https://img-blog.csdnimg.cn/direct/cecdf61174274e0192a79318ed813be9.png#pic_center)
