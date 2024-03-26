const crypto = require('crypto-js');
const appRoot = require('app-root-path');
const aspireConfig = require(`${appRoot}/config/aspire-configuration`);

module.exports = function callback(request){
    if (!request) {
        throw new Exception('Access denied');
    }

    if(typeof request == "string") {
        request = JSON.parse(request)
    }

    if(!request.merchantCode || !request.amount || !request.merchantOrderId || request.signature){
        throw new Error("Bad Parameter")
    }

    if(request.signature != crypto.MD5(`${aspireConfig.merchantCode}${callback.amount}${callback.merchantOrderId}${aspireConfig.apiKey}`).toString()){
        throw new Error("Wrong Signature")
    }

    return request;
}