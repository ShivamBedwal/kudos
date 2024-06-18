sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("kudos.ui.controller.Employee", {
      onInit: function () {
      },

      onPressKudos: function (oEvent) {
        var oKudos = this.byId("idKudosList");
        var oData = {
          "email": oKudos.getItems()[0].getCells()[0].getValue(),
          "text": oKudos.getItems()[0].getCells()[1].getValue()
        }
      }
    });
  }
)
