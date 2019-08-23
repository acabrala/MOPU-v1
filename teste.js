const moment = require('moment')


const data_atual = moment().subtract(180, "minutes").format("DD/MM/YYYY HH:mm:ss")
console.log(data)