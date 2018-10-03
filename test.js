var ChannelAdvisor = require('./index')({
    apiEndPoint: 'https://api.channeladvisor.com/',
    profileID : '',
    appCredentials: {
        client_id: '',
        client_secret: '',
        refresh_token: '',
        scope: ['orders', 'inventory']
    },
    debugLogs: true // Only use this for testing purposes
});





ChannelAdvisor.orders.get.$(null, null, function(err, body){ //{$filter: 'BuyerEmailAddress eq \' buyer@example.com\''}
    console.log(err, body);

});



ChannelAdvisor.products.get.$(72176, null, function(err, body){ //{$filter: 'BuyerEmailAddress eq \' buyer@example.com\''}
    console.log(err, body);

});






ChannelAdvisor.orders.post.$({
    SiteName: 'Wanelo',
    BuyerEmailAddress: 'buyer@example.com',
    TotalShippingPrice: 6,
    TotalPrice: 7,
    Items:[{
        Sku: 'PLSB_TEST_PRODUCT',
        UnitPrice: 3,
        ShippingPrice: 6,
        Quantity: 1,
        Promotions:[{
            Code: 'freebie',
            ShippingAmount: -2
        }]
    }]
}, function(err, body){

    console.log(err, body);

});
