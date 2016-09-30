var countries = null;
var selectedCountries = ['Hungary', 'Spain', 'United Kingdom', 'Italy'];
var population = [];
var area = [];

var getPopulationArea = function(){
  selectedCountries.forEach(function(selectedCountry) {
    for ( var i=0; i<countries.length; i++ ) {
      if (countries[i].name === selectedCountry) {
        population.push(countries[i].population);
        area.push(countries[i].area);
      }
    }
  });
}

var start = function(){
  getPopulationArea();
  new BarChart(selectedCountries, population, area);
  new PieChart(selectedCountries, population);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var app = function(){
  var url = "https://restcountries.eu/rest/v1/all";
  makeRequest(url, function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var data = JSON.parse(jsonString); 
    countries = data;
    start();
  });
}


window.onload = app;