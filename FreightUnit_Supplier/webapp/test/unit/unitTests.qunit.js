/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"inc/FUS/FreightUnit_Supplier/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});