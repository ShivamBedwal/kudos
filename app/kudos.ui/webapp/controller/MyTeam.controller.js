sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("kudos.ui.controller.MyTeam", {

            onInit: function () { },

            async addTeamMember(oEvent) {

                var oInput = await this.loadFragment({
                    name: "kudos.ui.view.NewTeamMember"
                });

                var oItem = new sap.m.ColumnListItem({
                    cells: [oInput]
                });

                var oMyTeamTable = this.byId("idMyTeamTable");
                oMyTeamTable.addItem(oItem);
            }

        });
    }
)