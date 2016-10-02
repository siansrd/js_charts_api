var countries = null;
var images = [];
var selectedCountries = [];
var selectedCountriesObjs = [];
var population = [];


var hideCharts = function() {
  graphs = document.querySelector('#charts');
  graphs.style.display = 'none';
}

// TODO: Refactor functions
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
  var selected = document.getElementById('selectCountry');
  selectedCountries.push(selected.value);
  selectedCountriesObjs.push(selected);
  var list = document.getElementById('added_countries');
  var listItem = document.createElement('li');
  listItem.innerText = selected.value;
  list.appendChild(listItem);
  flickrRequest();
}


var flickrRequest = function() {
  var flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[APIKEY]&lon=26&format=json&nojsoncallback=1&per_page=1&extras=url_o";
  makeRequest(flickr, function(){
    if(this.status !== 200) return;
    var flickrJsonString = this.responseText;
    var flickrData = JSON.parse(flickrJsonString); 
    images.push(flickrData);
    // console.log(images.photos.photo[0].url_o);
  });
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
  selectedCountriesObjs = [];
  population = [];
  var list = document.getElementById('added_countries');
  removeChildNodes(list);
  resetSelect();
}


var start = function() {
  
  var selectCountry = document.getElementById('selectCountry');
  populateCountriesDropdown();

  getInfo = document.getElementById('getInfo');
  getInfo.onclick = function() {
    // Graphs
    getPopulation();
    new BarChart(selectedCountries, population);
    new PieChart(selectedCountries, population);
    graphs.style.display = 'flex';
    
    // Images
    img = document.getElementById("flickrImg");
    image = images[0];
    console.log(image.photos.photo[0].url_o)
    img.src = image.photos.photo[0].url_o;
    console.log(images)

    // Clear
    clearSelectedCountries();
  }


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

}




window.onload = app;

// "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[APIKEY]&lon=26&format=json&nojsoncallback=1&per_page=1&extras=url_o"