http 请求：http://localhost:8080/sap/opu/odata/sap/ESH_SEARCH_SRV/ServerInfos?$expand=Services/Capabilities

这个请求如果一直处于 `pending` 状态，则应用无法继续渲染。正常情况会遇到 403 错误，然后调用 `http://localhost:8080/sap/es/ina/GetServerInfo?_=1690621846842`.

