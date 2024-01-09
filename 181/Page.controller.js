sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		"sap/ui/core/HTML"
	], function(Controller, JSONModel,HTML) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Page", {
		onInit: function () {
			this.oPageData = {
				"PageCollection": [
					{
						"PageId": "p1",
						"Name": "百度",
						"Url": 'http://localhost:8080/baidu.html'
					},
					{
						"PageId": "p2",
						"Name": "Bing",
						"Url": 'http://localhost:8080/bing.html'
					},
					{
						"PageId": "p3",
						"Name": "QQ",
						"Url": 'http://localhost:8080/qq.html'
					}
				]
			};
			var oModel = new JSONModel(this.oPageData);
			this.getView().setModel(oModel);
		},
		onChange: function(oEvent){
			var oSelected = oEvent.getParameter("selectedItem");
			var sSelectedKey = oSelected.getKey();

			var oContainer = this.getView().byId("selectContainer");
			var sIFrameId = "iFrameId1";

			var sUrl = "";
			for( var i = 0; i < this.oPageData.PageCollection.length; i++){
				var oSelectedPage = this.oPageData.PageCollection[i];
				if( oSelectedPage.PageId === sSelectedKey ){
					sUrl = oSelectedPage.Url;
				}
			}
			var sContent = '<iframe id="' + sIFrameId + '" height="98%" width="100%" frameborder="0" src="' + sUrl + '" ></iframe>';

			if( this.oPageHtmliFrame != null){
				oContainer.removeItem(this.oPageHtmliFrame);
			}
			this.oPageHtmliFrame = new HTML({
				preferDOM: true,
				content: sContent
			});
			oContainer.addItem(this.oPageHtmliFrame);
		}
	});
});