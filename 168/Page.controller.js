sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Page", {

		onInit: function () {
			this.oRawData = {
				"BookCollection": [
					{
						"BookId": "A001",
						"Name": "射雕英雄传",
						"Author":"金庸"
					},
					{
						"BookId": "A002",
						"Name": "神雕侠侣",
						"Author":"金庸"
					},
					{
						"BookId": "A003",
						"Name": "倚天屠龙记",
						"Author":"金庸"
					},
					{
						"BookId": "A004",
						"Name": "风云第一刀",
						"Author":"古龙"
					},
					{
						"BookId": "A005",
						"Name": "绝代双骄",
						"Author":"古龙"
					},
					{
						"BookId": "A006",
						"Name": "笑傲江湖",
						"Author":"金庸"
					}
				]
			};
			var aUniqueAuthor = this.getUniqueAuthor(this.oRawData.BookCollection);
			var oModelData = {
				AuthorCollection: aUniqueAuthor,
				Books: this.getBooksByAuthor(aUniqueAuthor[0].AuthorName)
			};

			this.oJSONModel = new JSONModel(oModelData);
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