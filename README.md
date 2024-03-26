[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

# Aspire Payment Gateway Node JS
Welcome to Aspire Payment Gateway Node JS Example Project Implementation Page, Integrate this Aspire Payment Gateway Node JS to start transaction using Aspire Payment Gateway in your Web or Application.


![flow_aspire_payment](https://user-images.githubusercontent.com/13087322/138187049-1a28ed5b-e9e8-48c9-aada-fa6f978c6e64.gif)



<h3>Demo Project</h3>
Go To  <a target="_blank" href="https://api-sandbox.gateway.aspireapp.com/demoduitku/">Demo Aspire Payment Gateway-Pop</a>

Go To  <a target="_blank" href="https://sandbox.gateway.aspireapp.com/payment/demopage.aspx">Demo Aspire Payment Gateway-Api</a>


<h3>Full Step Docs</h3>
Go To  <a target="_blank" href="https://docs.gateway.aspireapp.com/pop/id">Aspire Payment Gateway Docs-Pop</a>

Go To  <a target="_blank" href="https://docs.gateway.aspireapp.com/api/id">Aspire Payment Gateway Docs-Api</a>

## Installation

Install aspire-payment-gateway npm by following command below:

```command-line
npm install aspire-payment-gateway
```

or add it manually in your `package.json` file.

```json
"dependencies": {
    "aspire-payment-gateway": "^0.0.1"
  }
```

then run this command below
 
```command-line
npm install
```

## Configuration Settings

Aspire Payment Gateway configuration will read on your root project config folder. It should be like `project/config/aspire-configuration.js`. Please create the file first.

```javascript
const aspireConfig = {
    merchantCode : "DXXXX",
    apiKey : "XXXc6XXX31829bXXX74cd5XXXXX869XX",
    passport : true,
    callbackUrl : "https://example/route/callback",
    returnUrl : "https://example/route/return",
    accountLinkReturnUrl : "https://localhost/dashboard/user",
    expiryPeriod: 1440
};

module.exports = aspireConfig;
```

or `project/config/aspire-configuration.json`

```json
{
    "merchantCode" : "DXXXX",
    "apiKey" : "XXXc6XXX31829bXXX74cd5XXXXX869XX",
    "passport" : true,
    "callbackUrl" : "https://example/route/callback",
    "returnUrl" : "https://example/route/return",
    "accountLinkReturnUrl" : "https://localhost/dashboard/user",
    "expiryPeriod": 1440
}
```

## Aspire Payment Gateway POP
### Create Invoice (Aspire Payment Gateway-Pop)

Parameter paymentMethod is optional,

First you need to require aspire module to use method and class for create invoice aspire.

You can require like on below:
```javascript
const aspirePg = require('aspire-payment-gateway');
const createInvoice = aspire.createInvoice;
```

Then, you need to instance class object of Invoice aspire
```javascript
let invoice = new aspire.Invoice(10000, "test_payment_01", "Test Payment");
```

you need to pass 3 pass value, there is payment amount, order id and product details in order. After that you could set other parameter through your invoice object instance.

```javascript
invoice.setEmail("email@value.com");
```

Here full example of Create Invoice

```javascript
const {
    createInvoice,
    Invoice,
    ItemDetail
    } = require('aspire-payment-gateway');

let invoice = new Invoice(10000, "test_payment_01", "Test Payment")

// Customer Detail
let firstName          = "John";
let lastName           = "Doe";
let email              = "customer@gmail.com"
let phoneNumber        = "081234567890"

// Address
let address             = "Jl. Kembangan Raya";
let city               = "Jakarta";
let postalCode         = "11530";
let countryCode        = "ID";

invoice.setEmail(email); // your customer email
invoice.setPhoneNumber(phoneNumber); // your customer phone number (optional)
invoice.setCustomerVaName(`${firstName} ${lastName}`); // display name on bank confirmation display
invoice.getCustomerDetail().setFirstName(firstName);
invoice.getCustomerDetail().setLastName(lastName);
invoice.getCustomerDetail().setEmail(email);
invoice.getCustomerDetail().setPhoneNumber(phoneNumber);
invoice.getCustomerDetail().setShippingAddress(
    firstName,
    lastName,
    address,
    city,
    postalCode,
    phoneNumber,
    countryCode
)
invoice.getCustomerDetail().setShippingAddressEqualBillingAddress();

// Item Details
let item = new ItemDetail("Test Item", 0, 10000);

invoice.addItemDetails(item.get());

//This is for VC or MG creditCardDetail
// invoice.getCreditCardDetail().addBinWhiteList("4455")
// invoice.getCreditCardDetail().setAcquirer("022")

createInvoice(invoice.get(), (resp, err) => {
            if(err){
                console.log(err)
            }else{
                console.log(resp)
                }
            })
```

### Frontend Integration (Aspire Payment Gateway-Pop)

You need to import script to your main html project.

```html
<!-- sandbox environtment -->
<script src="https://app-sandbox.gateway.aspireapp.com/lib/js/aspire_pg.js"></script>
<!-- passport environtment -->
<script src="https://app-prod.gateway.aspireapp.com/lib/js/aspire_pg.js"></script>
```

```javascript
checkout.process(result.reference, {
    successEvent: function(result){
    // Add Your Action
        console.log('success');
        console.log(result);
        alert('Payment Success');
    },
    pendingEvent: function(result){
    // Add Your Action
        console.log('pending');
        console.log(result);
        alert('Payment Pending');
    },
    errorEvent: function(result){
    // Add Your Action
        console.log('error');
        console.log(result);
        alert('Payment Error');
    },
    closeEvent: function(result){
    // Add Your Action
        console.log('customer closed the popup without finishing the payment');
        console.log(result);
        alert('customer closed the popup without finishing the payment');
    }
});    
```

## Aspire Payment Gateway API V2
### Request Transaction (Aspire Payment Gateway-Api)
First you need to require aspire module to use method and class for create invoice aspire.

You can require like on below:
```javascript
const aspirePg = require('aspire-payment-gateway');
const requestTransaction = aspire.requestTransaction;
```

Then, you need to instance class object of Transaction aspire
```javascript
let transaction = new aspire.Transaction(10000, "I1", "test_payment_01", "Test Payment");
```

you need to pass 4 pass value, there is payment amount, payment method code, order id and product details in order. After that you could set other parameter through your invoice object instance.

```javascript
invoice.setEmail("email@value.com");
```

Here full example of Request Transaction

```javascript
const {
    requestTransaction,
    Transaction,
    ItemDetail
    } = require('aspire-payment-gateway');

let transaction = new Transaction(10000, "I1", "test_payment_01", "Test Payment")

// Customer Detail
let firstName          = "John";
let lastName           = "Doe";
let email              = "customer@gmail.com"
let phoneNumber        = "081234567890"

// Address
let address             = "Jl. Kembangan Raya";
let city               = "Jakarta";
let postalCode         = "11530";
let countryCode        = "ID";

transaction.setEmail(email); // your customer email
transaction.setPhoneNumber(phoneNumber); // your customer phone number (optional)
transaction.setCustomerVaName(`${firstName} ${lastName}`); // display name on bank confirmation display
transaction.getCustomerDetail().setFirstName(firstName);
transaction.getCustomerDetail().setLastName(lastName);
transaction.getCustomerDetail().setEmail(email);
transaction.getCustomerDetail().setPhoneNumber(phoneNumber);
transaction.getCustomerDetail().setShippingAddress(
    firstName,
    lastName,
    address,
    city,
    postalCode,
    phoneNumber,
    countryCode
)
transaction.getCustomerDetail().setShippingAddressEqualBillingAddress();

// Item Details
let item = new ItemDetail("Test Item", 0, 10000);

transaction.addItemDetails(item.get());

//This is how you add ovo and shopee for accountLinking
// transaction.addOvoAccount("credentialCode");
// transaction.addShopeeAccount("credentialCode", false, "promo_id");

//This is for VC or MG creditCardDetail
// transaction.getCreditCardDetail().addBinWhiteList("4455")
// transaction.getCreditCardDetail().setAcquirer("022")

requestTransaction(transaction.get(), (resp, err) => {
    if(err){
        console.log(err)
    }else{
        console.log(resp)
        }
    }
)
```

### Callback (Aspire Payment Gateway-Api)

Callback function will receive string or object and validate the callback value.

```javascript
let dummyCallback = `{"merchantCode":"DXXXX","amount":"10000","merchantOrderId":"test_payment_01","productDetail":"Test Payment","additionalParam":"","resultCode":"00","signature":"0ad994db2be2629b71151403423c8a8b","paymentCode":"VA","merchantUserId":"John Doe","reference":"D90997SHEKFH3T08QJE1","issuer_name":"","issuer_bank":""}`;
let callbackObj = callback(dummyCallback);

console.log(callbackObj)
```

### Check Transaction (Aspire Payment Gateway-Api)

Check transaction function will need string order ID parameter and then give a response data.

```javascript
checkTransaction("test_payment_01", (resp, err) => {
    if(err){
        console.log(err)
    }else{
        console.log(resp)
        }
    }
)
```

### Get Payment Method (Aspire Payment Gateway-Api)

Get payment method function will need number amount parameter and then give a response bank list that available.

```javascript
getPaymentMethod(10000, (resp, err) => {
    if(err){
        console.log(err)
    }else{
        console.log(resp)
        }
    }
)
```



### Create Account Link (Aspire Payment Gateway-API)

Connect an account using userConnectsAccountLink method. 

```javascript
userConnectsAccountLink("phone_number", "customer_unique_id/email","channel_method",  (resp, err) => {
    if(err){
        console.log(err)
    }else{
        console.log(resp)
        }
    });
```

Then redirect user to input and validate account link connection to webViewUrl. You'll get credentialCode at the account link return URL. 
> don't forget to add the return URL to aspire configuration

To disconnect the account use userDisconnectsAccountLink method.

```javascript
userDisconnectsAccountLink("credential_code", "channel_method",  (resp, err) => {
if(err){
    console.log(err)
}else{
    console.log(resp)
    }
});
```

Or you can get user linked account data like this.

```javascript
getUserInfoAccountLink("credential_code", "channel_method",  (resp, err) => {
    if(err){
        console.log(err)
    }else{
        console.log(resp)
        }
    });
```

For ovo method only, you can get the top up instruction by using method getTopUpInstructionOvo.

```javascript
getTopUpInstructionOvo("credential_code", "OL", (resp, err) => {
    if(err){
        console.log(err)
    }else{
        console.log(resp)
    }
})
```

## Cheat sheet

|*function* | *example*|
|--------|--------|
|requestTransaction(object, function)|requestTransaction(transaction, (resp, err) => {}))
|checkTransaction(string, function)|checkTransaction("string", (resp, err) => {}))
|getPaymentMethod(number, function)|getPaymentMethod(10000, (resp, err) => {}))
|createInvoice(object, function)|createInvoice(invoice, (resp, err) => {}))
|callback(string/object)|callback(req.body)

|*class* |*method*|*parameter*|*return*|
|--------|--------|-----------|--------|
|Transaction|get|-|Object
| |getMerchantCode|-|String
| |getPaymentAmount|-|Number
| |getPaymentMethod|-|String
| |getMerchantOrderId|-|String
| |getProductDetails|-|String
| |getAdditionalParam|-|String
| |getMerchantUserInfo|-|String
| |getCustomerVaName|-|String
| |getEmail|-|String
| |getPhoneNumber|-|String
| |getItemDetails|-|Array
| |getCustomerDetail|-|Object
| |getCustomerDetail.get|-|Object
| |getCustomerDetail.getFirstName|-|String
| |getCustomerDetail.getLastName|-|String
| |getCustomerDetail.getEmail|-|String
| |getCustomerDetail.getPhoneNumber|-|String
| |getCustomerDetail.getBillingAddress|-|Object
| |getCustomerDetail.getBillingAddress.get|-|Object
| |getCustomerDetail.getBillingAddress.getFirstName|-|String
| |getCustomerDetail.getBillingAddress.getLastName|-|String
| |getCustomerDetail.getBillingAddress.getAddress|-|String
| |getCustomerDetail.getBillingAddress.getCity|-|String
| |getCustomerDetail.getBillingAddress.getPostalCode|-|String
| |getCustomerDetail.getBillingAddress.getPhone|-|String
| |getCustomerDetail.getBillingAddress.getCountryCode|-|String
| |getCustomerDetail.getBillingAddress.setFirstName|String|-
| |getCustomerDetail.getBillingAddress.setLastName|String|-
| |getCustomerDetail.getBillingAddress.setAddress|String|-
| |getCustomerDetail.getBillingAddress.setCity|String|-
| |getCustomerDetail.getBillingAddress.setPostalCode|String|-
| |getCustomerDetail.getBillingAddress.setPhone|String|-
| |getCustomerDetail.getBillingAddress.setCountryCode|String|-
| |getCustomerDetail.getShippingAddress|-|Object
| |getCustomerDetail.getShippingAddress.get|-|Object
| |getCustomerDetail.getShippingAddress.getFirstName|-|String
| |getCustomerDetail.getShippingAddress.getLastName|-|String
| |getCustomerDetail.getShippingAddress.getAddress|-|String
| |getCustomerDetail.getShippingAddress.getCity|-|String
| |getCustomerDetail.getShippingAddress.getPostalCode|-|String
| |getCustomerDetail.getShippingAddress.getPhone|-|String
| |getCustomerDetail.getShippingAddress.getCountryCode|-|String
| |getCustomerDetail.getShippingAddress.setFirstName|String|-
| |getCustomerDetail.getShippingAddress.setLastName|String|-
| |getCustomerDetail.getShippingAddress.setAddress|String|-
| |getCustomerDetail.getShippingAddress.setCity|String|-
| |getCustomerDetail.getShippingAddress.setPostalCode|String|-
| |getCustomerDetail.getShippingAddress.setPhone|String|-
| |getCustomerDetail.getShippingAddress.setCountryCode|String|-
| |getCustomerDetail.setFirstName|String|-
| |getCustomerDetail.setLastName|String|-
| |getCustomerDetail.setEmail|String|-
| |getCustomerDetail.setPhoneNumber|String|-
| |getCustomerDetail.setShippingAddress|String, String, String, String, String, String, String|-
| |getCustomerDetail.setBillingAddress|String, String, String, String, String, String, String|-
| |getCustomerDetail.setBillingAddressEqualShippingAddress|-|-
| |getCustomerDetail.setShippingAddressEqualBillingAddress|-|-
| |getCallbackUrl|-|String
| |getReturnUrl|-|String
| |getSignature|-|String
| |getExpiryPeriod|-|Number
| |getDiscount|-|Object
| |getTax|-|Object
| |getShopeeAccount.get|-|Object
| |getShopeeAccount.getPromoId|-|String
| |getShopeeAccount.getUseCoin|-|Boolean
| |getShopeeAccount.setPromoId|String|-
| |getShopeeAccount.setUseCoin|Boolean|-
| |getOvoAccount.get|-|Object
| |getOvoAccount.getPaymentDetails|-|Object
| |getOvoAccount.setAmount|Number|-
| |getCreditCardDetail.get|-|Object
| |getCreditCardDetail.getAcquirer|-|String
| |getCreditCardDetail.getBinWhiteList|-|Array
| |getCreditCardDetail.setAcquirer|String|-
| |getCreditCardDetail.addBinWhiteList|String|-
| |getCreditCardDetail.removeBinWhiteList|String|-
| |setPaymentMethod|String|-
| |setPaymentAmount|Number|-
| |setMerchantOrderId|String|-
| |setProductDetails|String|-
| |setAdditionalParam|String|-
| |setMerchantUserInfo|String|-
| |setCustomerVaName|String|-
| |setEmail|String|-
| |setPhoneNumber|String|-
| |addItemDetails|Object|-
| |createAnItemDetail|String, Number, Number|-
| |createDiscount|Number, String|-
| |createTax|Number, String|-
| |removeItemDetails|index|-
| |removeDiscount|index|-
| |removeTax|index|-
| |clearItemDetails|-|-
| |clearDiscount|-|-
| |clearTax|-|-
| |addOvoAccount|-|-
| |addShopeeAccount|-|-
| |request|-|-
|Invoice|get|-|Object
| |getPaymentAmount|-|Number
| |getMerchantOrderId|-|String
| |getProductDetails|-|String
| |getEmail|-|String
| |getAdditionalParam|-|String
| |getMerchantUserInfo|-|String
| |getCustomerVaName|-|String
| |getPhoneNumber|-|String
| |getItemDetails|-|Array
| |getCustomerDetail|-|Object
| |getCustomerDetail.getBillingAddress.get|-|Object
| |getCustomerDetail.getBillingAddress.getFirstName|-|String
| |getCustomerDetail.getBillingAddress.getLastName|-|String
| |getCustomerDetail.getBillingAddress.getAddress|-|String
| |getCustomerDetail.getBillingAddress.getCity|-|String
| |getCustomerDetail.getBillingAddress.getPostalCode|-|String
| |getCustomerDetail.getBillingAddress.getPhone|-|String
| |getCustomerDetail.getBillingAddress.getCountryCode|-|String
| |getCustomerDetail.getBillingAddress.setFirstName|String|-
| |getCustomerDetail.getBillingAddress.setLastName|String|-
| |getCustomerDetail.getBillingAddress.setAddress|String|-
| |getCustomerDetail.getBillingAddress.setCity|String|-
| |getCustomerDetail.getBillingAddress.setPostalCode|String|-
| |getCustomerDetail.getBillingAddress.setPhone|String|-
| |getCustomerDetail.getBillingAddress.setCountryCode|String|-
| |getCustomerDetail.getShippingAddress|-|Object
| |getCustomerDetail.getShippingAddress.get|-|Object
| |getCustomerDetail.getShippingAddress.getFirstName|-|String
| |getCustomerDetail.getShippingAddress.getLastName|-|String
| |getCustomerDetail.getShippingAddress.getAddress|-|String
| |getCustomerDetail.getShippingAddress.getCity|-|String
| |getCustomerDetail.getShippingAddress.getPostalCode|-|String
| |getCustomerDetail.getShippingAddress.getPhone|-|String
| |getCustomerDetail.getShippingAddress.getCountryCode|-|String
| |getCustomerDetail.getShippingAddress.setFirstName|String|-
| |getCustomerDetail.getShippingAddress.setLastName|String|-
| |getCustomerDetail.getShippingAddress.setAddress|String|-
| |getCustomerDetail.getShippingAddress.setCity|String|-
| |getCustomerDetail.getShippingAddress.setPostalCode|String|-
| |getCustomerDetail.getShippingAddress.setPhone|String|-
| |getCustomerDetail.getShippingAddress.setCountryCode|String|-
| |getCustomerDetail.setFirstName|String|-
| |getCustomerDetail.setLastName|String|-
| |getCustomerDetail.setEmail|String|-
| |getCustomerDetail.setPhoneNumber|String|-
| |getCustomerDetail.setShippingAddress|String, String, String, String, String, String, String|-
| |getCustomerDetail.setBillingAddress|String, String, String, String, String, String, String|-
| |getCustomerDetail.setBillingAddressEqualShippingAddress|-|-
| |getCustomerDetail.setShippingAddressEqualBillingAddress|-|-
| |getReturnUrl|-|String
| |getCallbackUrl|-|String
| |getExpiryPeriod|-|Number
| |getPaymentMethod|-|String
| |getCreditCardDetail.get|-|Object
| |getCreditCardDetail.getAcquirer|-|String
| |getCreditCardDetail.getBinWhiteList|-|Array
| |getCreditCardDetail.setAcquirer|String|-
| |getCreditCardDetail.addBinWhiteList|String|-
| |getCreditCardDetail.removeBinWhiteList|String|-
| |setPaymentAmount|Number|-
| |setMerchantOrderId|String|-
| |setProductDetails|String|-
| |setEmail|String|-
| |setAdditionalParam|String|-
| |setMerchantUserInfo|String|-
| |setCustomerVaName|String|-
| |setPhoneNumber|String|-
| |addItemDetails|Object|-
| |createAnItemDetail|String, Number, Number|-
| |createDiscount|Number, String|-
| |createTax|Number, String|-
| |removeItemDetails|index|-
| |removeDiscount|index|-
| |removeTax|index|-
| |clearItemDetails|-|-
| |clearDiscount|-|-
| |clearTax|-|-
| |create|function|-
|ItemDetail|get|-|Object
| |getName|-|String
| |getQuantity|-|Number
| |getPrice|-|Number
| |set|String, Number, Number|-
| |setName|String|-
| |setQuantity|Number|-
| |setPrice|Number|-
