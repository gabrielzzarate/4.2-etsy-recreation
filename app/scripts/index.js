var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');






 //(url: String, callback: Function) -> undefined

  //Execute a callback function with the JSON results from the url specified.

  //Examples
var url = "https://api.etsy.com/v2/listings/active.js?api_key=5yxi1qcwb15eq1ftvgybzl6k&keywords=michael%20jordan&includes=Images,Shop";

      

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function logData(data) {
	console.log(data);
  buildTemplates(data);
      }


fetchJSONP(url, logData);


function buildTemplates(data){

  var numberofresults = data.count;
  var searchTerm = data['params'].keywords;

  var source = $('#image-template').html();
  var template = handlebars.compile(source);
  var context = {"numberofresults": numberofresults, "searchTerm": searchTerm};
  var renderedTemplate = template(context);


$('.container').html(renderedTemplate);

var resultslist = data["results"];

var sourcePhoto = $('#each photo').html();
var templatePhoto = handlebars.compile(source);
var contextPhoto = {resultslist};
var renderedTemplatePhoto = template(contextPhoto);


$('.container').append(renderedTemplatePhoto);


 


 

}



