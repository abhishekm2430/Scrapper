var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://medium.com";
console.log("Visiting page " + pageToVisit);
request(pageToVisit, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     //console.log($('body').html());
     console.log("Page title:  " + $('title').text());
     collectInternalLinks($);
   }
});

function collectInternalLinks($) {
  var relativeLinks = [];
  var absoluteLinks = [];

  var relLinks = $("a[href^='/']");
  relLinks.each(function() {
      relativeLinks.push($(this).attr('href'));

  });

  var absLinks = $("a[href^='http']");
  //console.log(absLinks);
  absLinks.each(function() {
      absoluteLinks.push($(this).attr('href'));
  });

  console.log("Found " + relativeLinks.length + " relative links");
  console.log("Found " + absoluteLinks.length + " absolute links");
  console.log(relativeLinks);
  console.log("..............................................................................");
  console.log(absoluteLinks);
}