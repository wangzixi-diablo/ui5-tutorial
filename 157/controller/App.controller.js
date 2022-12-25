sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/vk/ContentResource"
], function(Controller, JSONModel, ContentResource) {
	"use strict";

	var loadModelIntoViewer = function(viewer, sourceType, localFile) {
		viewer.destroyContentResources();
		var source = localFile;
		
		if (source) {
			var contentResource = new ContentResource({
				source: source,
				sourceType: sourceType,
				sourceId: "abc"
			});
			viewer.addContentResource(contentResource);
		}
	};

	return Controller.extend("sap.ui5.walkthrough.controller.App", {

	onInit: function() {
		var sourceData = {
			localFile: undefined,
			remoteUrl: undefined
		};
		
		var model = new JSONModel();
		model.setData(sourceData);
		this.getView().setModel(model, "source");
	},

	onPressLoadSampleFile: function(event) {
		var view = this.getView();
		var viewer = view.byId("viewer");
		loadModelIntoViewer(viewer, "vds","models/test.vds");
	},

	onChangeFileUploader: function(event) {
			var view = this.getView();
			var viewer = view.byId("viewer");
			var localFile = event.getParameter("files")[0];
			if (localFile) {
				var fileName = localFile.name;
				var index = fileName.lastIndexOf(".");
				if (index >= 0 && index < fileName.length - 1) {
					var sourceType = fileName.substr(index + 1);
					loadModelIntoViewer(viewer, sourceType, localFile);
				}
			}
		}
	});
});
