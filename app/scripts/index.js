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

function searchButtonHandler(urlstring){
	event.preventDefault();
	var urlsearch = "https://api.etsy.com/v2/listings/active.js?api_key=5yxi1qcwb15eq1ftvgybzl6k&keywords=";
	var urlend = "&includes=Images,Shop";

	var keyword = $('#search-button').val();

	

	urlstring = urlsearch + keyword + urlend;
	
fetchJSONP(urlstring, logData);

buildTemplates(data);
	


}




function buildTemplates(data){

  var numberofresults = data.count;
  var searchTerm = data['params'].keywords;

  var source = $('#image-template').html();
  var template = handlebars.compile(source);
  var context = {"numberofresults": numberofresults, "searchTerm": searchTerm};
  var renderedTemplate = template(context);

//category results #
$('.etsy-template').html(renderedTemplate);

var resultslist = data["results"];

var sourcePhoto = $('#photo-template').html();
var templatePhoto = handlebars.compile(sourcePhoto);
var contextPhoto = {"results": resultslist};
var renderedTemplatePhoto = templatePhoto(contextPhoto);

//images
$('.etsy-template').append(renderedTemplatePhoto);

var searchData = data["params"];

var sourceSearch = $('#search-button').html();
var templateSearch = handlebars.compile(sourceSearch);
var contextSearch = {"params": searchData};
var $renderedTemplateSearch = $(templateSearch(contextSearch));

$renderedTemplateSearch.find('#search-button').on('click', searchButtonHandler);

$('#search-button').append($renderedTemplateSearch);

 




}



