const crypto = require('crypto-js');
const axios = require('axios');
const appRoot = require('app-root-path');
const aspireConfig = require(`${appRoot}/config/aspire-configuration`);

module.exports = function userConnectsAccountLink(phoneNumber, customerUniqueId, channel, cb){
    let timestamp = new Date().getTime();
    let passport = aspireConfig.passport
    let url = 'https://accountlink-prod.gateway.aspireapp.com/api/accountlinking/v1/connect';
    if(!passport) url = 'https://api-sandbox.gateway.aspireapp.com/accountlinking/api/accountlinking/v1/connect';
    let data = {
        phoneNumber,
        customerUniqueId,
        channel,
        returnUrl: aspireConfig.accountLinkReturnUrl
    }
    
    axios({
        method: 'POST',
        url: url,
        data,
        headers: {
                    "Accept": "application/json",
                    "Content-type" : "application/json; charset=UTF-8",
                    "X-duitku-signature": crypto.SHA256(`${aspireConfig.merchantCode}${timestamp}${JSON.stringify(data)}${aspireConfig.apiKey}`).toString(),
                    "X-duitku-timestamp": `${timestamp}`,
                    "X-duitku-merchant": `${aspireConfig.merchantCode}`,
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