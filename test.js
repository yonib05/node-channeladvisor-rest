var ChannelAdvisor = require('./lib/channelAdvisor');//();//.settings({debug:true})

//var api = ChannelAdvisor.settings({
//	applicationID: process.env.CHANNEL_ADVISOR_DEVELOPER_ID,
//	sharedSecret: process.env.CHANNEL_ADVISOR_SHARED_SECRET,
//	redirect_uri: process.env.CHANNEL_ADVISOR_REDIRECT_URI,
//	access_type : process.env.CHANNEL_ADVISOR_ACCESS_TYPE,
//	scope: process.env.CHANNEL_ADVISOR_ACCESS_SCOPE,
//	debug : true
//});




ChannelAdvisor.orders.get.$(null, null, function(err, body){ //{$filter: 'BuyerEmailAddress eq \' buyer@example.com\''}
    console.log(err, body);

});


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