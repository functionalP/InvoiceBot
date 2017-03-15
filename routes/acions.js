/**
 * Created by i855845 on 2/13/17.
 */

var context="";

module.exports = {
    // recommend:  function(bot, message)  {
    //     console.log("Inside recommend");
    //     context="UnitsUpdate";
    //     bot.reply(message, messageBuilderAskHelp());
    // },
    // Ok: function(bot, message)   {
    //     console.log("Inside Ok");
    //     if (context == "UnitsUpdate")    {
    //         bot.reply(message, messageBuilderProvideOptions());
    //     } else if (context == "OptionProvided")   {
    //         submitInvoice(bot, message);
    //     } else   {
    //         bot.reply(message, "Sorry, I don't understand");
    //     }
    // },
    // submitInvoice: function(bot, message)  {
    //     console.log("Inside submitInvoice ");
    //     if (context == "UnitsUpdate")    {
    //         bot.reply(message, messageBuilderProvideOptions());
    //     } else if (context == "OptionProvided")   {
    //         submitInvoice(bot, message);
    //     }else   {
    //         bot.reply(message, "Sorry, I don't understand");
    //     }
    // },
    current_payment_info:  function(bot, message)   {
        if(context != "InvoiceSubmitted")   {
            bot.reply(message, "Sorry, I don't understand");
            return;
        }
        console.log("Inside current_payment_info");
        // context="CurrentPaymentInfo";
        bot.reply(message,"If you are approved today, you are scheduled to get paid $20,000 by April 30th, 2017");
    },
    get_payments:  function(bot, message)   {
        if(context != "InvoiceSubmitted")   {
            bot.reply(message, "Sorry, I don't understand");
            return;
        }
        console.log("Inside current_payment_info");
        // context="RemainingPaymentInfo";
        bot.reply(message,messageBuilderPaymentImage(), function(){
            bot.reply(message, "Is there anything else that I can help with ?");
        });
    },
    final_regards: function(bot, message)   {
        console.log("Final Regards.");
    },
    // recommendations_callback: function(bot, message)    {
    //     console.log("Inside recommendations callback");
    //     if(message.actions[0].name == "Accept") {
    //         this.Ok(bot, message);
    //     }
    // },
    // help2FixInvoice: function(bot, message) {
    //     console.log("Inside help2FixInvoice");
    //     if(message.actions[0].name == "Yes") {
    //         this.Ok(bot, message);
    //     }
    // },
    // submitWithOption1: function(bot, message)   {
    //     console.log("Inside submitWithOption1");
    //     if(message.actions[0].name == "Accept") {
    //         this.Ok(bot, message);
    //     }
    // },
    // submitWithOption2: function(bot, message)   {
    //     console.log("Inside submitWithOption1");
    //     if(message.actions[0].name == "Accept") {
    //         this.Ok(bot, message);
    //     }
    // },
    seeIssues: function(bot, message)   {
        console.log("Inside seeIssues");
        console.log(message);
        var _message = constructShowIssuesMessage(message);
        bot.replyInteractive(message, _message);
    },
    provideOptions: function(bot, message) {
        console.log("Inside provideOptions");
        console.log(message);
        var _message = constructOptionsMessage(message);
        bot.replyInteractive(message, _message);
    },
    applyFix: function(bot, message)    {
        console.log("Inside applyFix");
        console.log(message);
        submitInvoice(bot, message);
    }
};

function constructShowIssuesMessage(message) {
    console.log("inside constructIssuesMessage");
    return {
        // "token": global.app_token,
        // "ts": message.message_ts,
        // "channel": message.channel,
        "text": "*<https://fwefwefwef.com|Invoice 1411>* from <https://ssdfwefwe.com|Herge Oil> has been rejected",
        "replace_original":true,
        "attachments": [
            {
                "color": "#f2c407",
                "fields": [
                    {
                        "title": "Payment Due Date",
                        "value": "04/30/2017",
                        "short": true
                    },
                    {
                        "title": "Total Amount",
                        "value": "$21,000",
                        "short": true
                    }
                ]
            },
            {
                "mrkdwn_in": ["text", "pretext"],
                "color": "#ff0000",
                "text": "*2* exceptions are reported with this invoice"
            },
            {
                "mrkdwn_in": ["text"],
                "color": "#f2c407",
                "text": "•  Buyer rejected the invoice due to quantity mismatch –  5 laptops received instead of 10 invoiced *<https://www.ariba.com|more>*\n• I have also identified price variance of 5%. PO Price for laptop is $2000 vs invoiced price is $2100 *<https://www.ariba.com|more>*",
                "attachment_type": 'default',
                "callback_id": "provideOptions",
                "actions": [
                    {
                        "name": "fix",
                        "text": "Need Help?",
                        "type": "button",
                    }
                ]
            }
        ]
    };
}

function constructOptionsMessage(message)   {
    var attachments = getAttachments();
    attachments.push({
        "pretext": "*Make the selection to resubmit the invoice*",
        "mrkdwn_in": ["pretext"],
        "callback_id": "applyFix",
        "actions": [
            {
                "name": "Option 1",
                "text": "1",
                "type": "button",
                "value": "Option 1",
                "confirm": {
                    "title": "Are you sure you want to re-submit the invoice?",
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            },
            {
                "name": "Option 2",
                "text": "2",
                "type": "button",
                "value": "Option 2",
                "confirm": {
                    "title": "Are you sure you want to re-submit the invoice?",
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            },
            {
                "name": "Option 3",
                "text": "3",
                "type": "button",
                "value": "Option 3",
                "style": "primary",
                "confirm": {
                    "title": "Are you sure you want to re-submit the invoice?",
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            }
        ]
    });
    return {
        "replace_original":true,
        "attachments": attachments
    }
}

function messageBuilderPaymentImage() {
    console.log("-----messageBuilderPaymentImage Called----")
    var jsonObj = {
        "attachments": [
            {
                "text": "Payment schedule",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/PaymentSchedule",
                "color": "#3AA3E3"
            }
        ]
    };
    return jsonObj;
}

function submitInvoice(bot, message) {
    context = "InvoiceSubmitted";
    var attachments = getAttachments();
    attachments.push(
        {
            "color": "#f2c407",
            "text": "Checking rules....",
            "mrkdwn_in": ["text"]
        });
    var rules_check = {
        "attachments": attachments
    };
    bot.replyInteractive(message, rules_check, function()   {
        var attachments = getAttachments();
        attachments.push(
            {
                "color": "#f2c407",
                "text": "Prices :white_check_mark:",
                "mrkdwn_in": ["text"]
            });
        var rules_check = {
            "attachments": attachments
        };
        setTimeout(function()   {
            bot.replyInteractive(message, rules_check, function()    {
                setTimeout(function () {
                    var attachments = getAttachments();
                    attachments.push(
                        {
                            "color": "#f2c407",
                            "text": "Quantities :white_check_mark:",
                            "mrkdwn_in": ["text"]
                        });
                    var rules_check = {
                        "attachments": attachments
                    };
                    bot.replyInteractive(message, rules_check, function()    {
                        setTimeout(function()   {
                            var attachments = getAttachments();
                            attachments.push(
                                {
                                    "color": "#f2c407",
                                    "text": "Other rules :white_check_mark:",
                                    "mrkdwn_in": ["text"]
                                });
                            var rules_check = {
                                "attachments": attachments
                            };
                            bot.replyInteractive(message, rules_check, function()   {
                                setTimeout(function()   {
                                    var invoice = parseInt(global.invoice) + Math.floor((Math.random() * 100) + 1);
                                    bot.api.users.info({user: message.user}, (error, response) => {
                                        if(error)   {
                                            console.log("Got error" + error);
                                            return;
                                        }
                                        console.log("Got response from api.info" + response);
                                        let {name, real_name} = response.user;
                                        console.log(name, real_name);
                                        var attachments = getAttachments();
                                        attachments.push({
                                            "color": "#f2c407",
                                            "text": "*@" + real_name + "* selected " + message.text +". \n All rules checked :white_check_mark: \n *Success!* *<https://123123.com|Invoice #" + invoice + ">* created and submitted to <https://google.com|Herge Oil> :white_check_mark: ",
                                            "mrkdwn_in": ["text"]
                                        });
                                        attachments.push({
                                            "pretext" : "What else can I do for you ?",
                                            "mrkdwn_in": ["pretext"]
                                        });
                                        var rules_check = {
                                            "attachments": attachments
                                        };
                                        var _message = {
                                            "attachments": attachments
                                        };
                                        bot.replyInteractive(message, _message);
                                    }, 3500);
                                });
                            });
                        }, 3500);
                    });
                }, 3500);
            });
        }, 3500)
    });
}

function getAttachments()   {
    return [
        {
            "mrkdwn_in": ["pretext"],
            "pretext": "*<https://slack.com|Invoice 1411>* from <https://google.com|Herge Oil> has been rejected",
            "color": "#f2c407",
            "fields": [
                {
                    "title": "Payment Due Date",
                    "value": "04/30/2017",
                    "short": true
                },
                {
                    "title": "Total Amount",
                    "value": "$21,000",
                    "short": true
                }
            ]
        },
        {
            "mrkdwn_in": ["text"],
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#ff0000",
            "text": "*2* exceptions are reported with this invoice"
        },
        {
            "mrkdwn_in": ["text"],
            "color": "#f2c407",
            "text": "•  Buyer rejected the invoice due to quantity mismatch –  5 laptops received instead of 10 invoiced *<https://www.ariba.com|more>*\n• I have also identified price variance of 5%. PO Price for laptop is $2000 vs invoiced price is $2100 *<https://www.ariba.com|more>*",
        },
        {
            "color": "#f2c407",
            "pretext": "Here are the *recommendations* to fix the issues",
            "mrkdwn_in": ["pretext"]
        },
        {
            "color": "#f2c407",
            "text": "*1.* Change Invoice Quantity to 5 laptops or 5 units\n*2.* Adjust the invoice price to PO Price $2000\n*3.* Apply both changes *recommended*",
            "mrkdwn_in": ["text"]
        },
    ];
}

function messageBuilderAskHelp() {
    var jsonObj = {
        "text": "You invoiced 10 external HD-55 hard drive's, but Herge Oil had rejected 5 units due to wrong specifications.",
        "attachments": [
            {
                "text":"Do you want my help to fix the issue?",
                "fallback": "Sorry for the trouble. Please type Yes or No",
                "callback_id": "help2FixInvoice",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Yes",
                        "text": "Yes",
                        "style": "primary",
                        "type": "button",
                        "value": "Yes"
                    },
                    {
                        "name": "No",
                        "text": "No",
                        "style": "danger",
                        "type": "button",
                        "value": "No"
                    },
                    {
                        "name": "CallSupport",
                        "text": "Call Support",
                        "style": "primary",
                        "type": "button",
                        "value": "CallSupport"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderProvideOptions() {
    context = "OptionProvided";
    var jsonObj = {
        "text":"Select the appropriate option and re-submit the invoice",
        "attachments": [
            {
                "text":"• 80% - Change quantity 10 to 5 units",
                "fallback": "Type, Change 10 to 5",
                "callback_id": "submitWithOption1",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Accept",
                        "text": "Accept",
                        "style": "primary",
                        "type": "button",
                        "value": "Accept"
                    }
                ]
            },
            {
                "text":"• 90% - Option 1 + Change bill-to address to 3420 Hillview Ave, Palo Alto, 3410 ",
                "fallback": "Type, Change Billing Address and Quantity",
                "callback_id": "submitWithOption2",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Accept",
                        "text": "Accept",
                        "style": "primary",
                        "type": "button",
                        "value": "Accept"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

