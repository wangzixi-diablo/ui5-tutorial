sap.ui.define(['sap/ui/core/mvc/Controller'],
	function(Controller) {
	"use strict";

	var PageController = Controller.extend("sap.ui5.walkthrough.V", {

        onBeforeRendering: function(){
            var view = this.byId("beginView1");
            view.setHeight(window.innerHeight+'px');
        }
	});
	return PageController;
});