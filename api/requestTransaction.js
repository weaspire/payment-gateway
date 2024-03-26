const axios = require('axios');
const appRoot = require('app-root-path');
const aspireConfig = require(`${appRoot}/config/aspire-configuration`);

module.exports = function requestTransaction(requestTransactionObj, cb){
    let passport = aspireConfig.passport
    let url = 'https://passport.gateway.aspireapp.com/webapi/api/merchant/v2/inquiry';
    if(!passport) url = 'https://sandbox.gateway.aspireapp.com/webapi/api/merchant/v2/inquiry';

    axios({
        method: 'POST',
        url: url,
        data: requestTransactionObj,
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