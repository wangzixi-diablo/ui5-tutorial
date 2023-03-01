sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Page", {
		onInit: function () {
			this.oJSONModel = new JSONModel();
			this.oJSONModel.loadData("books.json", null, false);
			this.oRawData = this.oJSONModel.oData;
			var aUniqueAuthor = this.getUniqueAuthor(this.oJSONModel.oData.BookCollection);

			var oModelData = {
				AuthorCollection: aUniqueAuthor,
				Books: this.getBooksByAuthor(aUniqueAuthor[0].AuthorName)
			};
			this.oJSONModel.setData(oModelData);

			this.getView().setModel(this.oJSONModel);
		},

		getUniqueAuthor: function(aBooks){
			const uniqueAuthors = new Set();
			let index = 0;
			aBooks.forEach(book => uniqueAuthors.add(book.Author));
			var aAuthorForSelect = [];
			Array.from(uniqueAuthors).forEach(author => {
				aAuthorForSelect.push(
				{
					AuthorID: 'Author' + index,
					AuthorName: author
				});
				index++});
			return aAuthorForSelect;
		},

		getBooksByAuthor:function(sAuthorName){
			return this.oRawData.BookCollection.filter(book => book.Author === sAuthorName);
		},
		onChange: function(oEvent){
			var oSelected = oEvent.getParameter("selectedItem");
			var sSelectedText = oSelected.getText();
			var aFilteredBooks = this.getBooksByAuthor(sSelectedText);
			this.oJSONModel.getData().Books = aFilteredBooks;
			this.oJSONModel.refresh();
		}
	});
});