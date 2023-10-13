曾几何时，ABAP 就是 SAP 的代名词。ABAP 这门编程语言造就了 SAP 名噪一时的 R/3 产品，同时也是如今 SAP 旗舰级产品，SAP S/4HANA 底层的实现语言。

ABAP 不仅代表着 SAP 这家公司在企业级管理软件市场辉煌的过去，ABAP 自身也在不断地进化着。SAP 不仅在本地部署(On-Premise)领域继续保持着自己绝对的统治地位，而且在云应用领域（Software-as-a-Service, 简称 SaaS), 也推出了自己的解决方案，比如 SAP S/4HANA Cloud，SAP Cloud for Customer，SAP Business-by-Design 等等。而这些 SAP 推出的云端软件，其后台的实现语言依旧是 ABAP.

笔者 2007年1月还在研究生三年级的学习时，以实习生的身份加入了 SAP 中国研究院，实习工作使用的编程语言就是 ABAP. 在此之前我从未听说过 ABAP 这门编程语言，在本科和研究生使用的是 C/C++. 因此所有 ABAP 开发人员刚刚接触这门编程语言遇到的陌生感，不适应，困扰，以及学习过程中遇到的各种困难和障碍，我都感同身受，因为这些我都统统经历过。

光阴似箭，转眼间我已经在 SAP 中国工作了 16 年，通过我先后在 SAP Business-by-Design, SAP CRM，SAP Cloud for Customer，SAP S/4HANA 的产品开发工作中，我积累了丰富的 ABAP 开发和使用经验。我在 SAP 官方社区总共输出了大量的 SAP 技术博客，也因此被 SAP 官方任命为 SAP 社区导师和 SAP 中国技术大使。

我把自己 16 年的 ABAP 使用经验，浓缩到了这套 ABAP 学习教程里，希望帮助 ABAP 的初学者在 ABAP 学习之路上少走弯路。同时，对于已经有 ABAP 基础，又想进一步进阶，完善自己 ABAP 知识体系的进阶学习者，这套 ABAP 也能助你们一臂之力。

## 本专栏计划的文章数在 `300` 篇左右，到 `2023年9月26日`为止，目前已经更新了 `121` 篇，专栏完成度为 `40%`

笔者这套[零基础快速学习 ABAP](https://blog.csdn.net/i042416/category_10946326.html)从 2021年4月10日写下第一篇文章以来，感谢广大学习者一如既往的支持。本教程计划花费 `300` 左右的篇幅，向大家详细介绍 SAP ABAP 开发的方方面面。

大家在学习教程过程中，如果有任何关于 SAP ABAP 开发方面想了解的内容，可以直接在教程各篇文章下评论留言，也可以在[《零基础快速学习 ABAP 读者意见反馈和下一步写作计划表》](https://blog.csdn.net/i042416/article/details/127204857)里留言。我会将大家的意见统一汇总，作为我更新教程的内容参考来源之一。

# 教程亮点


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

## 问题解答

本区域包含通过知乎付费咨询和[知识星球](https://t.zsxq.com/07RJRBlnM)向我提出并得到解答的问题：

- [SAP ABAP 系统 Lock Table 最多支持对多少条数据库记录进行上锁操作](https://blog.csdn.net/i042416/article/details/132116964)

- [如何使用 SAP ABAP Development Tool 连接 SAP BTP 上的免费 ABAP 编程环境](https://jerry.blog.csdn.net/article/details/132801599)

## 更多文章正在写作中  