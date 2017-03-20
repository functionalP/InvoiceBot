/**
 * Created by i854911 on 2/20/17.
 */

module.exports = function(app)  {

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    app.post('/reject/:id(\\d+)', function(req, res, next)  {

        var bot = require('./bot')();

        console.log(bot);

        global.invoice = req.params.id;

        bot.postNotification(constructNotificationMessage(req.params.id));

        res.send("Rejected Invoice: " + req.params.id);
    });
};

function constructNotificationMessage(invoiceId) {
    console.log("****Constructing Notification Message****");
    return {
        "text": "*<https://fwefwefwef.com|Invoice " + invoiceId + ">* from <https://ssdfwefwe.com|Herge Oil> has been rejected",
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
                        "value": "$560,000",
                        "short": true
                    }
                ]
            },
            {
                "mrkdwn_in": ["text", "pretext"],
                "color": "#ff0000",
                "text": "*1* Exception reported with this invoice"
            },
            {
                "color": "#f2c407",
                "text": "",
                "callback_id": "seeIssues",
                "attachment_type": 'default',
                "actions": [
                    {
                        "name": "details",
                        "text": "Show Exception",
                        "type": "button",
                        "value": "details"
                    }
                ]
            }
        ]
    };
}
