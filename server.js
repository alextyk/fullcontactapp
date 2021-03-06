var request = require("request");
var app = require("express")();
var server = require("http").Server(app);


app.get("/contact/:handle", function(req, res){
  var options = { method: 'GET',
    url: 'https://api.fullcontact.com/v2/person.json',
    qs: { twitter: req.params.handle },
    headers:
     { 'postman-token': '2e0b0608-dc9f-8460-2661-d62dcbe133a3',
       'cache-control': 'no-cache',
       'x-fullcontact-apikey': '18a5d54501b1f6da' } };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});



server.listen(8888);
