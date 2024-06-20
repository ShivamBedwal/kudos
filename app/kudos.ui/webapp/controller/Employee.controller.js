sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    var email;

    return BaseController.extend("kudos.ui.controller.Employee", {
      onInit: function () {

      },

      onColleagueSelected: function (oEvent) {
        var oSelectedRow = oEvent.getParameters().selectedRow;
        email = oSelectedRow.getCells()[1].getText();
      },

      onColleagueChange: function (oEvent) {
        var oValue = oEvent.getParameter('value');
        this.kudosButtonChange(oValue);
      },

      kudosButtonChange: function (oValue) {
        var kudosButton = this.byId("idKudosButton");
        if (oValue) {
          kudosButton.setEnabled(true);
        } else {
          kudosButton.setEnabled(false);
        }
      },

      onPressKudos: function (oEvent) {
        var oKudos = this.byId("idKudosList");
        var oEmpData = {
          "email": email,
          "text": oKudos.getItems()[0].getCells()[1].getValue()
        }

        var oModel = this.getOwnerComponent().getModel();
        var emailFilter = new sap.ui.model.Filter({
          path: "email",
          operator: sap.ui.model.FilterOperator.EQ,
          value1: email
        });

        oModel.read("/Employees", {
          filters: [emailFilter],
          success: function (oData) {
            this.kudosToEmp(oData);
          },
          error: function (oError) { }
        });
      },

      kudosToEmp: function (oData) {
        var aData = oData;
      }
    });
  }
)
