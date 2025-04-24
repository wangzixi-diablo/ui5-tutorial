
笔者从 2007 年电子科技大学计算机专业硕士毕业后，一直深耕 SAP 技术领域，对 SAP 多项技术有着深入透彻的研究，尤其精通 ABAP 编程，SAP UI5(Fiori) 应用开发和 SAP OData 服务开发。

笔者将自己在 SAP 领域 `17年`(2007～2024) 的技术沉淀，进行了系统的归纳和总结，分别写成了三套由浅入深的学习教程，收到了不错的反响：

- [零基础快速学习 ABAP](https://blog.csdn.net/i042416/category_10946326.html)
- [一套适合 SAP UI5 开发人员循序渐进的学习教程](https://blog.csdn.net/i042416/category_11395500.html)
- [SAP OData 开发实战教程 - 从入门到提高](https://blog.csdn.net/i042416/category_11885354.html)

本教程是笔者开始编写的`第四套开发教程`。Fiori Elements 是 SAP 公司的`旗舰级产品`，`第四代 ERP 产品`即 `SAP S/4HANA` UI 界面的开发工具，可以说在 SAP 浩如烟海的技术开发体系中，占据着`绝对举足轻重`的地位。

Fiori Elements 开发技术相对 SAP 其他历史悠久，发展成熟的开发技术来说，是一个新事物。正因如此，迄今为止国内深入讲解 `Fiori Elements` 应用的中文材料几乎没有。

本教程是笔者在工作实战中使用 Fiori Elements 积累的开发经验和感悟的汇总。

下面是本教程的目录。笔者承诺该教程完成之后，文章篇幅不少于 `100` 篇。

- [0. 迈入 SAP Fiori Elements 开发的大门 - 什么是 Fiori Elements，它和 Freestyle UI5 开发方式有何区别?](https://jerry.blog.csdn.net/article/details/130175514)

- [1. SAP Fiori Elements 开发环境的搭建和开发准备工作](https://jerry.blog.csdn.net/article/details/130210653)

- [2. 在 ES5 系统注册用户以获得 Fiori Elements 开发教程测试 OData 服务的访问账号](https://jerry.blog.csdn.net/article/details/130449920)

- [3. 动手运行第一个 SAP Fiori Elements 应用(ListReport 类型)](https://jerry.blog.csdn.net/article/details/130451031)

- [4. SAP Fiori Elements 本地应用启动的三种模式辨析](https://jerry.blog.csdn.net/article/details/130461703)

- [5. 动手开发第一个 SAP Fiori Elements 应用](https://jerry.blog.csdn.net/article/details/131025412)

- [6. 知其然知其所以然 - 使用向导生成的 Fiori Elements 应用的文件结构分析](https://jerry.blog.csdn.net/article/details/131917250)

- [7. SAP Fiori Elements 应用里的 ui5.yaml 文件详解](https://jerry.blog.csdn.net/article/details/131991740)

- [8. 如何找到 SAP Fiori Elements 应用某个字段显示值具体的数据源](https://jerry.blog.csdn.net/article/details/132009910)

- [9. 如何修改 Fiori Elements 工程包含的本地注解(annotations)文件](https://jerry.blog.csdn.net/article/details/132022040)

- [10. 如何通过扩展(Extension)的方式给 SAP Fiori Elements List Report 的表格新增列](https://blog.csdn.net/i042416/article/details/132113251)

- [11. SAP Fiori Elements List Report 表格新增列扩展方式的工作原理](https://blog.csdn.net/i042416/article/details/132164977)

- [12. SAP Fiori Tools Page Map 的实现详解和故障排除](https://jerry.blog.csdn.net/article/details/132365735)

- [13. 如何使用 Guided Development 给 Fiori Elements List Report 的工具栏添加自定义按钮](https://jerry.blog.csdn.net/article/details/132372058)

- [14. SAP Fiori Elements List Report 如何在扩展开发里使用代码获得当前选中的表格行项目](https://jerry.blog.csdn.net/article/details/132389350)

- [15. 通过一个实际的 Fiori Elements 扩展开发需求，介绍什么是 SAP Fiori Extension API](https://jerry.blog.csdn.net/article/details/132395205)

- [16. SAP Fiori Elements 应用里图片字段(Image)的显示原理介绍](https://blog.csdn.net/i042416/article/details/135779315)

- [17. SAP Fiori Elements 源码分析系列：注解 UI.IsImageURL 的工作原理剖析](https://jerry.blog.csdn.net/article/details/135819678)

- [18. 从 SAP Fiori Elements List Report 中的图片显示，谈谈背后的 XML Template 设计机制](https://blog.csdn.net/i042416/article/details/136198682)

- [19. Fiori Elements List Report 模版里表格列的显示逻辑总结](https://blog.csdn.net/i042416/article/details/136210259)

- [20. 从实际的开发案例出发，介绍 Navigation Property 在 Fiori Elements 开发中的作用](https://blog.csdn.net/i042416/article/details/136213620)

- [21. 什么是 SAP Fiori Elements List Report 模版里的 Criticality 属性](https://blog.csdn.net/i042416/article/details/136215077)

- [22. 如何让 SAP Fiori Elements List Report 启动后自动点击 Go 按钮触发数据读取操作](https://jerry.blog.csdn.net/article/details/144446936)

- [23. 回答网友提问：为啥重装系统之后，运行本教程配套的Fiori Elements List Report 代码，就报错了？](https://jerry.blog.csdn.net/article/details/144446941)

- [24. Fiori Elements List Report 的 Table 控件，如何实现行项目多选(Multiple Selection)效果](https://blog.csdn.net/i042416/article/details/147363792)

- [25. 如何在 SAP Fiori Elements List Report 里表格行项目被选中时，打印被选中的行项目数据](https://blog.csdn.net/i042416/article/details/147404086)

- 正在写作中

# 按照本教程介绍的步骤开发好的 Fiori Elements 应用源代码

## List Report 应用

- [1. ListReport 应用](https://github.com/wangzixi-diablo/ui5-tutorial/tree/main/Fiori-Elements-Tutotials/01/jerryfiorielement-01)

List Report 应用的外观：

![](https://img-blog.csdnimg.cn/36d5e126e8804bb0b865eb4f748f2027.png)

- [2. 如何通过扩展(Extension)的方式给 SAP Fiori Elements List Report 的表格新增列 - 例子的完整源代码](https://github.com/wangzixi-diablo/ui5-tutorial/tree/main/Fiori-Elements-Tutotials/02/jerryfiorielement-02)

新增的自定义列的截图如下：

![](https://img-blog.csdnimg.cn/img_convert/e222e8f1e921f161e77c491c3992741e.webp?x-oss-process=image/format,png)

- [3. List Report Table 工具栏区域自定义按钮的源代码](https://github.com/wangzixi-diablo/ui5-tutorial/tree/main/Fiori-Elements-Tutotials/03/jerryfiorielement-03)

自定义按钮的效果图：

![](https://img-blog.csdnimg.cn/img_convert/24bbd698085d03b292b371bdce673a91.webp?x-oss-process=image/format,png)

- [4. List Report Table 工具栏自定义按钮点击后，如何获取选中行项目的数据](https://github.com/wangzixi-diablo/ui5-tutorial/tree/main/Fiori-Elements-Tutotials/04/jerryfiorielement-04)

- [5. 使用 List Report Extension API 获取当前选中的表格行项目的例子源代码](https://github.com/wangzixi-diablo/ui5-tutorial/tree/main/Fiori-Elements-Tutotials/05/jerryfiorielement-05)

- [6. Fiori Elements List Report 的 Table 控件，如何实现行项目多选(Multiple Selection)效果](https://blog.csdn.net/i042416/article/details/147363792)

## Overview Page 应用 - 正在编写中

Overview Page 的外观：
![](https://img-blog.csdnimg.cn/6a3340cae1054655ba7359cdffb49074.png)

# Object Page 应用 - 正在编写中

Object Page 应用的外观：
![](https://img-blog.csdnimg.cn/7ee9bf9d2eb24368af689936203518b6.png)

- [Fiori Elements Object Page 工作原理深入讲解：剖析页面主标题和副标题显示原理](https://blog.csdn.net/i042416/article/details/147457018)

- [Fiori Elements Object Page 页面 URL 的格式分析](https://blog.csdn.net/i042416/article/details/147472252)

- [什么是 SAP Fiori Elements 的 Template Private Model](https://blog.csdn.net/i042416/article/details/147481999)

- [Fiori Elements Object Page 页面 Header 区域的图片显示原理](https://blog.csdn.net/i042416/article/details/147482583)

## WorkList 应用 - 正在编写中

Work List 应用的外观：
![](https://img-blog.csdnimg.cn/ed59a3792b3340a79a79c7808a692feb.png)


## Analytical List Page - 正在编写中

Analytical List Page 的外观：
![](https://img-blog.csdnimg.cn/ffbc6b2be38146788278e2e14522e097.png)

# 工具和 Extension 使用技巧和故障排查指南

本区域列出了笔者进行 SAP Fiori Elements 开发过程中日积月累搜集到的一些开发小技巧和故障排查指南。

- [SAP Fiori Tools Extension Pack 的使用技巧汇总](https://blog.csdn.net/i042416/article/details/134741772)

- [使用 Visual Studio Code 提供的向导和模版创建 Fiori 应用时，遇到故障后的排查指南](https://blog.csdn.net/i042416/article/details/135362439)

# 问题解答

- [关于 OData 2.0 和 OData 4.0 协议里对于 SAP 自定义注解(Annotations) 处理的区别讲解](https://jerry.blog.csdn.net/article/details/134648448)

- [SAP UI5 Freestyle 开发和 Fiori Elements 开发技术各自的优势和劣势](https://blog.csdn.net/i042416/article/details/135972354)

- [SAP UI5 开发里命令行 ui5 serve 和 npx fiori run 有什么区别？](https://jerry.blog.csdn.net/article/details/130475423)

# 参考文献

- [How To Use SAP Fiori Elements](https://sapui5.hana.ondemand.com/#/topic/20de9506339949c7bd16b789e8352f26)