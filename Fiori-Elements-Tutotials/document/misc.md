http 请求：http://localhost:8080/sap/opu/odata/sap/ESH_SEARCH_SRV/ServerInfos?$expand=Services/Capabilities

这个请求如果一直处于 `pending` 状态，则应用无法继续渲染。正常情况会遇到 403 错误，然后调用 `http://localhost:8080/sap/es/ina/GetServerInfo?_=1690621846842`.

- [open SAP Course](https://open.sap.com/courses/fiori-ea1)

- [blogs](https://blogs.sap.com/tags/ed5c1ef6-932f-4c19-b2ba-1be375109ff5/)

- [SAP Fiori Tools](https://help.sap.com/docs/SAP_FIORI_tools)

# 写作进度

- 2024/1/1: Working With UI Annotations

[odata vocabularies](https://www.odata.org/vocabularies/)

On the SAP Gateway front-end server, you can find SAP-specific vocabularies in the SAP Gateway Service Builder (transaction SEGW) under Extras Vocabulary Repository .

The following types of vocabulary-based annotations are available:

- In-place: These are part of the service's metadata document.

- Ex-place: These are composed of an Annotation Provider Class (APC) outside the metadata document. The APC is bound to the service using a registration in transaction /IWBEP/REG_VOCAN.

These annotations are available using a query to the SAP Gateway catalog service, /sap/opu/odata/IWFND/CATALOGSERVICE;v=2/. Entity Set: ‚Annotations‘.