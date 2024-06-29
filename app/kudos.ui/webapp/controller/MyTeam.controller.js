sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/BusyIndicator"
    ],
    function (BaseController, BusyIndicator) {
        "use strict";
        var email;
        return BaseController.extend("kudos.ui.controller.MyTeam", {

            onInit: function () { },

            onBeforeRendering: function () {
                this.byId("idMyTeamTable").getBinding("items").refresh();
            },

            onColleagueChange: function (oEvent) {
                var oValue = oEvent.getParameter('value');
                this.addMemberButtonChange(oValue);
            },

            onColleagueSelected: function (oEvent) {
                var oSelectedRow = oEvent.getParameters().selectedRow;
                email = oSelectedRow.getCells()[1].getText();
            },

            onAddTeamMember() {
                this.addMemberButtonChange();
                var oEmpData = {
                    "email": email
                }
                this.createTeamMember(oEmpData);
            },

            addMemberButtonChange: function (oValue) {
                var addMemberButton = this.byId("idAddMemberButton");
                if (oValue) {
                    addMemberButton.setEnabled(true);
                } else {
                    addMemberButton.setEnabled(false);
                }
            },

            createTeamMember: function (oEmpData) {
                var oModel = this.getOwnerComponent().getModel();
                var emailFilter = new sap.ui.model.Filter({
                    path: "email",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oEmpData.email
                });

                var oEmployeeList = oModel.bindList("/Employees").filter(emailFilter);
                oEmployeeList.requestContexts().then(function (aContexts) {
                    aContexts.forEach(function (oContext) {
                        var memberID = oContext.getProperty("ID");
                        var oMemberList = oModel.bindList("/Team");
                        oMemberList.create(
                            {
                                "team_emp": {
                                    "ID": 1289
                                },
                                "team_member": {
                                    "ID": memberID
                                }
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
                        this.byId("idMyTeamTable").getBinding("items").refresh();
                        this.clearAddMember();
                        BusyIndicator.hide();
                    }.bind(this), iDuration);
                }
            },

            clearAddMember: function () {
                var oEmpName = this.byId("idColleagueInput");
                oEmpName.setValue("");
                this.addMemberButtonChange();
            }
        });
    }
)