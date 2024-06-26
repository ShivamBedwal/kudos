
const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {
    const { Kudos } = this.entities;
    this.after("READ", Kudos, (data) => {
        console.log("Hello from js implementation");
    })
});