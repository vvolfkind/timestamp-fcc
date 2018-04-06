/*
 * Modulos
 */
var express = require("express");
var url = require("url");
var moment = require("moment");

/*
 * App
 */
var app = express();
app.get('/*', function (req, res) {
	//Extraer parametros de la URL
	var date = req.params[0];
	var month = date.split(' ')[0];
	//condicion query no vacia
	if (date.length) {
		res.writeHead(200, {'content-type':'application/JSON'});
		//chekeo si el formato es valido (strict mode) para matchear los formatos especificados 
		var isValid = moment(date, ['MMM DD, YYYY', 'MMM DD YYYY', 'MMMM DD, YYYY', 'MMMM DD YYYY'], true).isValid(); 
		//Si el formato es valido y el mes es una string valida o un numero, es opcion unix
		if (isValid == true || !isNaN(month)){
			//Si la fecha es una string, split con ' '  y join con ' ', luego calculo la fecha en formato UNIX
			if (isNaN(date.split(' ')[0]) == true) {
				var naturalTime = date;
				//Armo unix time y lo convierto a segundos
				var unixTime = (new Date(naturalTime).getTime())/1000;
			//"else", si es un numero (unix), lo convierto al formato adecuado
			} else {
				var unixTime = date;
				var naturalTime = moment.unix(unixTime).format("MMMM DD, YYYY");
			}
		//"else", si mandan fruta, reciben fruta (null)
		} else {
			var naturalTime = null;
			var unixTime = null;
		}
		//creo objeto JSON y lo mando al cliente
		var JSONres = {
			"unix" : unixTime,
			"natural" : naturalTime
		}
		res.end(JSON.stringify(JSONres));
	//"else", query vacia, devuelvo index
	} else {
		res.sendFile(__dirname + '/index.html');
	}
});
app.listen(80, function () {
  console.log('Microservice listening on port 80!');
});



