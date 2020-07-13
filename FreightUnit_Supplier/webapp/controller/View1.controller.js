sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("inc.FUS.FreightUnit_Supplier.controller.View1", {
		onInit: function () {

			var oDuplicateModel = new JSONModel("model/navigation.json");
			this.getView().setModel(oDuplicateModel, "oNavigationModel");

			this.fnPOST();

		},
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		},
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("FU_supplier");
			var bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId("sideNavigationToggleButton");
			if (bLarge) {
				oToggleButton.setTooltip("Large Size Navigation");
			} else {
				oToggleButton.setTooltip("Small Size Navigation");
			}
		},
		fnPOST: function () {
			var that = this;
			var sUrl = "/FU_Supplier/getPreference";
			var oPayload = {
				"supplierId": "SUP1001"

			};
			$.ajax({
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", that.fnToken());
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Accept", "application/json");

				},
				url: sUrl,
				type: "POST",
				data: oPayload,
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					console.log("success" + data);
					var oModel4 = new JSONModel(data);
					that.getView().setModel(oModel4, "oTableEntries");
				},
				error: function (e) {
					console.log("error: " + e);
				}
			});
		},
		fnToken: function () {
			this.token = "";
			var that = this;
			jQuery.ajax("/FU_Supplier/getcountries", {
				type: "GET",
				contentType: 'application/json',
				data: null,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-CSRF-Token', 'fetch');
				},
				success: function (data, response, jQxhr) {
					that.token = jQxhr.getResponseHeader('X-CSRF-Token');
					/*jQuery.ajaxSetup({
						beforeSend: function (xhr) {
							xhr.setRequestHeader("X-CSRF-Token", jQxhr.getResponseHeader('X-CSRF-Token'));
							sap.m.MessageToast.show("CSRF token set");
							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.setRequestHeader("Accept", "application/json");

						}
					});*/
				},
				error: function (e) {
					sap.m.MessageToast.show("CSRF token not set");
					that.token = e.getResponseHeader('X-CSRF-Token');
				}
			});
			return that.token;
		},
		fnGET: function () {
			var that = this;

			var sUrl = "/FU_Supplier/dashboard";
			var oPayload = {
				"supplierId": "SUP1001",
				"start": 0
			};
			jQuery.ajax("/FU_Supplier", {
				type: "GET",
				contentType: 'application/json',
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-CSRF-Token', 'fetch');
				},
				complete: function (response) {
					jQuery.ajaxSetup({
						beforeSend: function (xhr) {
							xhr.setRequestHeader("X-CSRF-Token", response.getResponseHeader('X-CSRF-Token'));
							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.setRequestHeader("Accept", "application/json");

						}
					});
				}
			});
			$.ajax({
				url: sUrl,
				type: "GET",
				data: oPayload,
				contentType: "application/json; charset=utf-8",
				success: function (data) {

					var oModel4 = new JSONModel(data);
					that.getView().setModel(oModel4, "oTableEntries");
				},
				error: function (e) {
					sap.m.MessageToast.show("Destination Failed");
				}
			});

		}
	});
});