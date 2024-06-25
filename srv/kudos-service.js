
const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {
    const { Kudos} = this.entities;
    this.after("READ", Kudos, (data) => {
        const kudos = Array.isArray(data) ? data : [data];
        kudos.forEach((kudos) => {
            if (kudos) {

            }
        })
    })
});