sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("inc.FUS.FreightUnit_Supplier.controller.View1", {
		onInit: function () {
			var that = this;
			var oModel1 = this.getOwnerComponent().getModel("oDataModel");
			/*	var sSelectedKey = "";
				var oModel3 = new JSONModel();
				oModel3.setProperty("/sSelectedKey", sSelectedKey);
				this.getView().setModel(oModel3, "oViewModel");*/
			var oModel2 = new JSONModel();
			var sUrl = "/FU_Supplier/dashboard";
			var oPayload = {
				"id": "SUP1001",
				"start": 0
			};
			/*$.ajax({
				beforeSend: function (xhrObj) {
					xhrObj.setRequestHeader("Content-Type", "application/json");
					xhrObj.setRequestHeader("Accept", "application/json");
				},
				url: sUrl,
				type: "POST",
				data: JSON.stringify(oPayload),
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					console.log("success" + data);
					var oModel3 = new JSONModel(data);
					that.getView().setModel(oModel3, "oTableEntries");
				},
				error: function (e) {
					console.log("error: " + e);
				}
			});
*/
			/*$.ajax({
				type: "POST",
				url: "/FU_Supplier/dashboard",
				data: {
					"id": "SUP1001",
					"start": 0
				},

				contentType: "application/json; charset=utf-8",
				error: function (err) {
					sap.m.MessageToast.show("Destination Failed");
					console.log("error: " + err);
				},
				success: function (data) {
					//oModel1.setData(data);
					sap.m.MessageToast.show(" Congtz! you succussfully consumed destination from CF!");
					console.log("success" + data);
					oModel2.setData(data);
					that.getView().setModel(oModel2, "oTableModel");

				}
			});
*/
				$.ajax({
					url: "/FU_Supplier/getcountries",
					data: null,
					async: true,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					error: function (err) {
						sap.m.MessageToast.show("Destination Failed");
					},
					success: function (data) {
						sap.m.MessageToast.show(" Congtz! you succussfully consumed destination from CF!");
						var oModel3= new JSONModel(data);
						that.getView().setModel(oModel3,"oCountries");
					},
					type: "GET"
				});

		}
	});
});