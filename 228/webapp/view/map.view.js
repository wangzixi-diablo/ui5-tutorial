sap.ui.jsview("sap.ui5.walkthrough.view.map", {

      getControllerName : function() {
         return "sap.ui5.walkthrough.controller.map";
      },

      createContent : function(oController) {
        var oMap = new mymap({
          id: "nlp-map",
          title: "Custom view demo",
          mapDataPath: "file/CHN.json"});
        var oVLayout = new sap.ui.commons.layout.VerticalLayout("v-layout-map", {
        width: "100%"
      });
        oVLayout.addContent(oMap);
       return oVLayout;
      }
});