const crypto = require('crypto-js');
const axios = require('axios');
const appRoot = require('app-root-path');
const aspireConfig = require(`${appRoot}/config/aspire-configuration`);

module.exports = function checkTransaction(merchantOrderId, cb){
    if(typeof merchantOrderId != "string" && typeof merchantOrderId != "number") {
        throw new Error("Your Order Id data type isn't a string or number")
    }
    let passport = aspireConfig.passport;
    let data = {
        merchantCode: aspireConfig.merchantCode,
        merchantOrderId
    }
    let signature = `${aspireConfig.merchantCode}${merchantOrderId}${aspireConfig.apiKey}`
    let url = 'https://passport.gateway.aspireapp.com/webapi/api/merchant/transactionStatus';
    if(!passport) url = 'https://sandbox.gateway.aspireapp.com/webapi/api/merchant/transactionStatus';
    data.signature = crypto.MD5(signature).toString();

    axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                }
    })
    .then(response => cb(response.data))
    .catch(err =>{
        let errorJson = {
            error: err.code,
            status: err.response.status,
            statusMessage: err.response.statusText,
            reason: err.response.data.Message,
        }
        cb({}, errorJson)
    })
}