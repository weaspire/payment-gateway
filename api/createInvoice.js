const crypto = require('crypto-js');
const axios = require('axios');
const appRoot = require('app-root-path');
const aspireConfig = require(`${appRoot}/config/aspire-configuration`);

module.exports = function createInvoice(createInvoiceObj, cb){
    let timestamp = new Date().getTime();
    let passport = aspireConfig.passport
    let url = 'https://api-prod.gateway.aspireapp.com/api/merchant/createInvoice';
    if(!passport) url = 'https://api-sandbox.gateway.aspireapp.com/api/merchant/createInvoice';

    axios({
        method: 'POST',
        url: url,
        data: createInvoiceObj,
        headers: {
                    "Accept": "application/json",
                    "Content-type" : "application/json; charset=UTF-8",
                    "x-duitku-signature": crypto.SHA256(`${aspireConfig.merchantCode}${timestamp}${aspireConfig.apiKey}`).toString(),
                    "x-duitku-timestamp": `${timestamp}`,
                    "x-duitku-merchantcode": `${aspireConfig.merchantCode}`,
                }
    })
    .then(response => cb(response.data))
    .catch(err =>{
        console.log(err)
        let errorJson = {
            error: err.code,
            status: err.response.status,
            statusMessage: err.response.statusText,
            reason: err.response.data,
        }
        cb({}, errorJson)
    })
}