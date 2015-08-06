var ChannelAdvisor = require('./lib/channelAdvisor')({
    apiEndPoint: 'https://api.channeladvisor.com/',
    profileID : '',
    appCredentials: {
        client_id: 'gdjw3u9akzep5zuxfw8utb536o8rbil6',
        client_secret: 'Ikk5tfCP4Ey7l_pwDywOYw',
        refresh_token: 'yEvlqTUplxLPEMBs4itfk5phnl4G2G1DEB02Obux1SY',
        scope: ['orders', 'inventory']
    },
    debugLogs: true // Only use this for testing purposes
});





//ChannelAdvisor.orders.get.$(null, null, function(err, body){ //{$filter: 'BuyerEmailAddress eq \' buyer@example.com\''}
//    console.log(err, body);
//
//});

//ChannelAdvisor.products.get.$(72176, null, function(err, body){ //{$filter: 'BuyerEmailAddress eq \' buyer@example.com\''}
//    console.log(err, body);
//
//});

//
//ChannelAdvisor.orders.post.create({
//    SiteName: 'Wanelo',
//    BuyerEmailAddress: 'buyer@example.com',
//    TotalShippingPrice: 6,
//    TotalPrice: 7,
//    Items:[{
//        Sku: 'PLSB_TEST_PRODUCT',
//        UnitPrice: 3,
//        ShippingPrice: 6,
//        Quantity: 1,
//        Promotions:[{
//            Code: 'freebie',
//            ShippingAmount: -2
//        }]
//    }]
//}, function(err, body){
//
//    console.log(err, body);
//
//});
