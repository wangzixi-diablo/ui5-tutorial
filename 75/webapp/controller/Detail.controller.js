sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui5.walkthrough.controller.Detail", {
       onShowHello : function () {
          MessageToast.show('111');
       },
       onInit: function(){
          console.log('Jerry in init');
          var oTable = this.byId("detailList");
          console.log("Jerry table: " , oTable);
       }
    });
 });