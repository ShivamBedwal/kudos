sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator"
  ],
  function (BaseController, BusyIndicator) {
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
        this.kudosButtonChange();
        var oKudos = this.byId("idKudosList");
        var oEmpData = {
          "email": email,
          "text": oKudos.getItems()[0].getCells()[1].getValue()
        }

        this.createKudos(oEmpData);
      },

      createKudos: function (oEmpData) {
        var oModel = this.getOwnerComponent().getModel();
        var emailFilter = new sap.ui.model.Filter({
          path: "email",
          operator: sap.ui.model.FilterOperator.EQ,
          value1: oEmpData.email
        });

        var oEmployeeList = oModel.bindList("/Employees").filter(emailFilter);
        oEmployeeList.requestContexts().then(function (aContexts) {
          aContexts.forEach(function (oContext) {
            var kudosToID = oContext.getProperty("ID");
            var oKudosList = oModel.bindList("/Kudos");
            oKudosList.create(
              {
                "kudos_from": {
                  "ID": 1289
                },
                "kudos_to": {
                  "ID": kudosToID
                },
                "text": oEmpData.text
              }
            );

            this.refreshUITable(1000, 0);

          }.bind(this));
        }.bind(this));
      },

      refreshUITable: function (iDuration, iDelay) {
        BusyIndicator.show(iDelay);
        if (iDuration && iDuration > 0) {
          if (this._sTimeoutId) {
            clearTimeout(this._sTimeoutId);
            this._sTimeoutId = null;
          }

          this._sTimeoutId = setTimeout(function () {
            this.byId("idKudosTable").getBinding("items").refresh();
            this.clearKudos();
            BusyIndicator.hide();
          }.bind(this), iDuration);
        }
      },

      clearKudos: function () {
        var oEmpName = this.byId("idColleagueInput");
        var oInpText = this.byId("idInpText");
        oEmpName.setValue("");
        oInpText.setValue("");
        this.kudosButtonChange();
      }
    });
  }
)
