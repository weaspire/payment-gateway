// CONFIG EXAMPLE */
// const aspireConfig = {
//     merchantCode : "DXXXX",
//     apiKey : "XXXc6XXX31829bXXX74cd5XXXXX869XX",
//     passport : true,
//     callbackUrl : "https://example/route/callback",
//     returnUrl : "https://example/route/return",
//     expiryPeriod: 1440
// };
// module.exports = aspireConfig;
// merchantCode = Your Project Code ID From Aspire Dashboard
// apiKey = String of API Key
// passport = A boolean value that will execute which environtment you would like to use.
// callbackUrl = An URL for you receive notification payment from Aspire server.
// returnUrl = An URL for landing page after user redirect from payment confirmation page.
// expiryPeriod = An Integer used for set how long expiry period for virtual account number or retail number.

/**HOW TO USE METHOD REQUEST TRANSACTION
* requestTransactionObj = An Object data for request to the API 
* cb = A javascript callback function to catch response data from API */
const requestTransaction = require('./api/requestTransaction.js')

/**HOW TO USE METHOD CHECK TRANSACTION
* merchantOrderId = A string of your transaction that have been generated on Aspire side, for you to check the transaction status.
* cb = A javascript callback function to catch response data from API */
const checkTransaction = require('./api/checkTransaction.js')

/**HOW TO USE METHOD GET PAYMENT METHOD
* amount = A Number variable, required because it would be check the payment fee 
* cb = A javascript callback function to catch response data from API */
const getPaymentMethod = require('./api/getPaymentMethod.js')

/**HOW TO USE METHOD CREATE INVOICE
* createInvoiceObj = An Object data for request to the API 
* cb = A javascript callback function to catch response data from API */
const createInvoice = require('./api/createInvoice.js')

/**HOW TO USE METHOD CALLBACK
* request = A string data from callback notification to check signature 
* return object JSON*/
const callback = require('./api/callback.js')

/**HOW TO USE METHOD TOP UP OVO 
* credentialCode = A string credential code account link 
* channel = A string channel or payment method, only support ovo (OL) 
* cb = A javascript callback function to catch response data from API */
const getTopUpInstructionOvo = require('./api/getTopUpInstructionOvo.js')

/**HOW TO USE METHOD GET ACCOUNT LINK USER INFO 
* credentialCode = A string credential code account link 
* channel = A string channel or payment method, only support ovo (OL) 
* cb = A javascript callback function to catch response data from API */
const getUserInfoAccountLink = require('./api/getUserInfoAccountLink.js')

/**HOW TO USE METHOD CONNECT ACCOUNT LINK 
* phoneNumber = A string credential code account link 
* customerUniqueId = A string user ID on ovo or shopee, usually a phone number, an email, account id, etc. 
* channel = A string channel or payment method, only support ovo (OL) 
* cb = A javascript callback function to catch response data from API */
const userConnectsAccountLink = require('./api/userConnectsAccountLink.js')

/**HOW TO USE METHOD DISCONNECT ACCOUNT LINK 
* credentialCode = A string credential code account link 
* channel = A string channel or payment method, only support ovo (OL) 
* cb = A javascript callback function to catch response data from API */
const userDisconnectsAccountLink = require('./api/userDisconnectsAccountLink.js')

// OBJECT INSTANCE
/** REQUEST TRANSACTION CONSTRUCTOR, , , 
 * "paymentAmount": 10000,
 * "paymentMethod": "sample string",
 * "merchantOrderId": "sample string",
 * "productDetails": "sample string",
 */
const Transaction = require('./model/Transaction.js')

/** CREATE INVOICE CONSTRUCTOR, , , 
 * "paymentAmount": 10000,
 * "merchantOrderId": "sample string",
 * "productDetails": "sample string",
 */
const Invoice = require('./model/Invoice.js')

/** CREATE ITEM DETAIL, , , 
 * "price": 10000,
 * "name": "sample string",
 * "qty": 1,
 */
const ItemDetail = require('./model/ItemDetail.js')

const aspirePg = {
    requestTransaction,
    checkTransaction,
    getPaymentMethod,
    createInvoice,
    callback,
    getTopUpInstructionOvo,
    getUserInfoAccountLink,
    userConnectsAccountLink,
    userDisconnectsAccountLink,
    Transaction,
    Invoice,
    ItemDetail
}
module.exports = aspirePg;