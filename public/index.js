var countries = null;
var selectedCountries = ['Hungary', 'Spain', 'United Kingdom', 'Italy', 'Estonia', 'France'];
var population = [];

var getPopulation = function() {
  selectedCountries.forEach(function(selectedCountry) {
    for ( var i=0; i<countries.length; i++ ) {
      if (countries[i].name === selectedCountry) {
        population.push(countries[i].population);
      }
    }
  });
}

var populateCountriesDropdown = function() {
  for (var i=0; i<countries.length; i++) {
    var item = document.createElement('option');
    item.textContent = countries[i].name;
    item.value = item;
    selectCountry.appendChild(item);
  }
}

var start = function(){
  getPopulation();
  new BarChart(selectedCountries, population);
  new PieChart(selectedCountries, population);

  var selectCountry = document.getElementById('selectCountry');
  populateCountriesDropdown();

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