/**
The data source for obtaining information from https://api.nal.usda.gov. Code modified from: 
https://github.com/mementodatabase/scripts/blob/master/data-sources/discogs.js
Not changing all of the comments and variable names because I'm lazy.


@param {string} apiKey - Consumer key.
@param {string} apiSecret - Consumer secret. 
@param {string} type - One of release, master, artist.
Consumer key and Consumer secret can be obtained by this link : https://www.discogs.com/settings/developers
More info about Discogs API see here: https://www.discogs.com/developers
@example 
var discogs = new Discogs("Consumer key" ,"Consumer secret" , "release" );
var r = discogs.search(query);
result( r , function(id) { return discogs.extra(id);});
*/
function Discogs (apiKey ) {
    this.apiKey = apiKey;
}


/**
Issue a search query to Discogs database.
@param {string} query - Search query.
*/
Discogs.prototype.search = function(query) {
  var result = http().get("https://api.nal.usda.gov/ndb/search/?format=json&q=" + encodeURIComponent(query) + "&sort=n&max=25&offset=0&api_key=" + this.apiKey);
  var json = JSON.parse(result.body);
  return json.results;  
}

/**
Issue a search query to Discogs database.
@param {string} code - Search barcodes.
*/
Discogs.prototype.barcode = function(code) {
  var result = http().get("https://api.nal.usda.gov/ndb/reports/?ndbno=" + encodeURIComponent(code) + "&type=b&format=json&api_key=" + this.apiKey);
  var json = JSON.parse(result.body);
  return json.results;  
}

/**
@param {string} id - The resource identifier.
*/
Discogs.prototype.extra = function(id) {
    var resultJson = http().get("https://api.nal.usda.gov/ndb/reports/?ndbno=" + id + "&type=b&format=json&api_key=" + this.apiKey);
    var result = JSON.parse(resultJson.body); 
    return result;
}
