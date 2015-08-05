var util = require('util');
var _ = require('underscore');
var querystring = require('querystring');
var request = require('request');
var TokenProvider = require('refresh-token');




module.exports = function() {

    var settings = {
        apiEndPoint: 'https://api.channeladvisor.com/',
        profileID : '',
        appCredentials: {
            client_id: '',
            client_secret: '',
            refresh_token: '',
            scope: ['orders', 'inventory']
        },
        debugLogs: false // Only use this for testing purposes
    };


    var currentTokken = null;
    var tokenProvider = new TokenProvider(settings.apiEndPoint + "oauth2/token", {
        client_id: settings.appCredentials.client_id,
        client_secret: settings.appCredentials.client_secret,
        refresh_token: settings.appCredentials.refresh_token,
        access_token: currentTokken
    });




    var channelAdvisorAPI = {

        settings: processSettings
    };

    if (settings.appCredentials.scope.indexOf('orders') != -1) {
        var orderScope = {
            orders: {
                get: {
                    $: function(id, query, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, query, cb);
                    },
                    fulfillments: function(id, query, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, 'Fulfillments', query, cb);
                    }

                },
                patch: function(id, query, cb) {
                    var endpoint = 'orders';
                    if (id) endpoint += '(' + id + ')';
                    makeRequests('PATCH', endpoint, null, query, cb);
                },
                post: {
                    $: function(query, cb) {
                        makeRequests('POST', 'orders', null, query, cb);
                    },
                    ship: function(id, query, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, 'ship', query, cb);
                    },
                    export: function(id, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, 'export', null, cb);
                    },
                    adjust: function(id, query, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, 'adjust', query, cb);
                    },
                    items: function(id, query, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, 'items', query, cb);
                    }
                },
                del: {
                    export: function(id, cb) {
                        var endpoint = 'orders';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('DELETE', endpoint, 'export', null, cb);
                    }
                }

            },
            ordersItems: {
                get: {
                    bundleComponents: function(id, query, cb) {
                        var endpoint = 'OrderItems';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, 'BundleComponents', query, cb);
                    }
                },
                post: {
                    adjust: function(id, query, cb) {
                        var endpoint = 'OrderItems';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, 'adjust', query, cb);
                    }
                }
            },

            fulfillments: {
                get: {
                    $: function(id, query, cb) {
                        var endpoint = 'Fulfillments';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, query, cb);
                    },
                    items: function(id, query, cb) {
                        var endpoint = 'Fulfillments';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, 'items', query, cb);
                    }
                },
                patch: {
                    $: function(id, cb) {
                        var endpoint = 'Fulfillments';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, null, cb);
                    }

                },
                post: {
                    $: function(id, query, cb) {
                        var endpoint = 'Fulfillments';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, null, query, cb);
                    },
                    move: function(id, query, cb) {
                        var endpoint = 'Fulfillments';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, 'move', query, cb);
                    }

                }
            },
            fulfillmentItems: {
                get: {
                    $: function(id, query, cb) {
                        var endpoint = 'FulfillmentsItems';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, query, cb);
                    }
                },
                patch: {
                    $: function(id, cb) {
                        var endpoint = 'FulfillmentsItems';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, null, cb);
                    }
                },
                post: {
                    move: function(id, query, cb) {
                        var endpoint = 'FulfillmentsItems';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('POST', endpoint, 'move', query, cb);
                    }
                }
            }
        };
        channelAdvisorAPI = _.extend(channelAdvisorAPI, orderScope);

    }

    //still in progress

    if (settings.appCredentials.scope.indexOf('inventory') != -1) {
        var inventoryScope = {
            products: {
                get: {
                    $: function(id, query, cb) {
                        var endpoint = 'Products';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, query, cb);
                    },
                    attributes: {
                        $: function(productId, name, query, cb) {
                            var endpoint = 'Products(' + productId + ')';
                            var opp = 'Attributes';
                            if (name) opp += '(' + name + ')';
                            makeRequests('GET', endpoint, opp, query, cb);
                        }
                    },
                    images: {
                        $: function(productId, placementName, query, cb) {
                            var endpoint = 'Products(' + productId + ')';
                            var opp = 'Images';
                            if (placementName) opp += '(' + placementName + ')';
                            makeRequests('GET', endpoint, opp, query, cb);
                        }
                    },
                    labels: {
                        $: function(productId, name, query, cb) {
                            var endpoint = 'Products(' + productId + ')';
                            var opp = 'Labels';
                            if (name) opp += '(' + name + ')';
                            makeRequests('GET', endpoint, opp, query, cb);
                        }
                    },
                    bundleComponents: {
                        $: function(productId, componentID, query, cb) {
                            var endpoint = 'Products(' + productId + ')';
                            var opp = 'Labels';
                            if (componentID) opp += '(' + componentID + ')';
                            makeRequests('GET', endpoint, opp, query, cb);
                        }
                    },
                    dCQuantities: {}
                },
                patch: {
                    $: function(id, query, cb) {
                        var endpoint = 'Products';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, query, cb);
                    }
                },
                post: {
                    $: function(id, query, cb) {
                        var endpoint = 'Products';
                        if (id) endpoint += '(' + id + ')';
                        makeRequests('GET', endpoint, null, query, cb);
                    }
                },
                del: {}

            },
            productLabels: {}
        };

        channelAdvisorAPI = _.extend(channelAdvisorAPI, inventoryScope);
    }
    return channelAdvisorAPI;


    /*		Auxiliary functions		*/

    function processSettings(options) {
        settings =  _.extend(settings, options);
    }

    /*
     type(STRING)* = GET,PUT || PATCH,POST,DELETE;
     endPoint(STRING)* = Orders;
     id(int || NULL)* = int (if the query is happening on a specific id)
     query(OBJECT || NULL) = {
     $filter : ''
     };
     callback(function)* = function(err, body);
     */

    function makeRequests(type, endpoint, operation, query, callback) {
        if (!_.isString(type)) new Error('What Type of request is this? You passed in: ' + type);
        if (!_.isString(endpoint)) new Error('Where is this request going? You passed in: ' + endpoint);
        if (!_.isFunction(callback)) new Error('This must be a Function you passed in:' + callback);
        operation = operation || '';
        query = query || {};
        //query.ProfileID = settings.profileID;
        getToken(function(token) {
            var params = {
                url: 'https://api.channeladvisor.com/v1/' + endpoint + '/' + operation,
                auth: {
                    'bearer': token
                },
                body: query,
                json: true
            };
            switch (type) {
                case 'GET':
                    request.get(params, function(err, request, body) {
                        if (request.statusCode === 401) return callback(new Error('ACCESS DENIED'), request);
                        return callback(err, body);
                    });
                    break;
                case 'PUT' || 'PATCH':
                    request.patch(params, function(err, request, body) {
                        if (request.statusCode === 401) return callback(new Error('ACCESS DENIED'));
                        return callback(err, body);
                    });
                    break;
                case 'POST':
                    request.post(params, function(err, request, body) {
                        if (request.statusCode === 401) return callback(new Error('ACCESS DENIED'));
                        return callback(err, body);
                    });
                    break;
                case 'DELETE':
                    request.del(params, function(err, request, body) {
                        if (request.statusCode === 401) return callback(new Error('ACCESS DENIED'));
                        return callback(err, body);
                    });
                    break;
            }

        });

    }

    function getToken(callback) {
        callback = callback || noop;
        tokenProvider.getToken(function(err, token) {
            if (err) {
                debugLog("Get Token Refresh Failed", err);
                return callback(err);
            }
            debugLog("Token Refresh Success, new access token", token);
            return callback(currentTokken = token);
        });
    }

    function debugLog(title, msg) {
        var msg = util.inspect(msg, {
            depth: null
        });
        if (settings.debugLogs) {
            console.log('\n    ChannelAdvisor.com Connector DEBUG log' + '\n  · ' + title + ':\n\n ', msg, '\n');
        }
    }
}();