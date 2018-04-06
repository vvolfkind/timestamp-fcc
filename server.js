var express = require('express');
var app = express();
var strftime = require('strftime');

app.get('', function (req, res) {
  res.send("Timestamp microservice.");
})

app.get('/:date', function (req, res) {
  var num = Number(req.params.date);
  if (isNaN(num)) {
    var time = Date.parse(req.params.date);
  }
  else{
    var time = new Date(num*1000);
  }
  if (isNaN(time)) {
    res.send({'unix':null,'natural':null});
  }
  else{
    res.send({'unix':time/1000,'natural':strftime('%B %d, %Y', new Date(time))});
  }
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 8080!');
});
