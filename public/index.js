var countries = null;
var images = null;
var selectedCountries = [];
var population = [];


var hideCharts = function() {
  graphs = document.querySelector('#charts');
  graphs.style.display = 'none';
}

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
    item.value = countries[i].name;
    selectCountry.appendChild(item);
  }
}

var addCountry = function() {
  var selected = document.getElementById('selectCountry').value;
  selectedCountries.push(selected);
  var list = document.getElementById('added_countries');
  var listItem = document.createElement('li');
  listItem.innerText = selected;
  list.appendChild(listItem);
}


var resetSelect = function() {
  var options = document.querySelectorAll('#selectCountry option');
  for (var i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
  }
}

var removeChildNodes = function(parent) {
  while (parent.hasChildNodes()) {   
      parent.removeChild(parent.firstChild);
  }
}

var clearSelectedCountries = function() {
  selectedCountries = [];
  population = [];
  var list = document.getElementById('added_countries');
  removeChildNodes(list);
  resetSelect();
}


var start = function() {
  
  var selectCountry = document.getElementById('selectCountry');
  populateCountriesDropdown();

  getGraphs = document.getElementById('getGraphs');
  getGraphs.onclick = function() {
    getPopulation();
    new BarChart(selectedCountries, population);
    new PieChart(selectedCountries, population);
    graphs.style.display = 'flex';
    clearSelectedCountries();
  }

  img = document.getElementById("flickrImg");
  img.src = images.photos.photo[0].url_o;


}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var app = function(){

  hideCharts();

  var url = "https://restcountries.eu/rest/v1/all";
  makeRequest(url, function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var data = JSON.parse(jsonString); 
    countries = data;
    start();
  });

  var flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[APIKEY]&lon=26&format=json&nojsoncallback=1&per_page=1&extras=url_o";
  makeRequest(flickr, function(){
    if(this.status !== 200) return;
    var flickrJsonString = this.responseText;
    var flickrData = JSON.parse(flickrJsonString); 
    images = flickrData;
    console.log(images.photos.photo[0].url_o);
    console.log(images)
  });

}




window.onload = app;

// "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[APIKEY]&lon=26&format=json&nojsoncallback=1&per_page=1&extras=url_o"