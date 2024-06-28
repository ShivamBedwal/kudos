sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("kudos.ui.controller.TopKudoed", {

            onInit: function () { },

            onBeforeRendering: function () {
                this.byId("idTopKudoedTable").getBinding("items").refresh();
            }
        });
    }
)