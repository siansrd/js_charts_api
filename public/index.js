var countries = null;
var images = [];
var selectedCountries = [];
var selectedCountriesObjs = [];
var population = [];



var hideInfo = function() {
  var graphs = document.querySelector('#charts');
  graphs.style.display = 'none';
  var outputImages = document.querySelector('#images');
  outputImages.style.display = 'none';
}

var displayInfo = function() {
  var graphs = document.querySelector('#charts');
  graphs.style.display = 'flex';
  var outputImages = document.querySelector('#images');
  outputImages.style.display = 'block';
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

var urlGenerator = function(lat, lng){
 var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[APIKEY]&lat=" + lat + "&lon=" + lat + "&accuracy~3&format=json&nojsoncallback=1&per_page=1&extras=url_o"
 return url;
}


var flickrRequest = function(lat, lng) {
  var flickr = urlGenerator(lat, lng);
  makeRequest(flickr, function(){
    if(this.status !== 200) return;
    var flickrJsonString = this.responseText;
    var flickrData = JSON.parse(flickrJsonString); 
    if (flickrData.photos.photo[0].url_o) {
    images.push(flickrData)};  
  });
}

var addCountry = function() {
  var selected = document.getElementById('selectCountry').value;
  selectedCountries.push(selected);

  for ( var i=0; i<countries.length; i++ ) {
    if (countries[i].name === selected) {
      country = countries[i]
      selectedCountriesObjs.push(country);
      var flickrData = flickrRequest(country.latlng[0], country.latlng[1]);    
    }
  }

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
  selectedCountriesObjs = [];
  population = [];
  image = [];
  var list = document.getElementById('added_countries');
  removeChildNodes(list);
  resetSelect();
}


var start = function() {
  
  var selectCountry = document.getElementById('selectCountry');
  populateCountriesDropdown();

  getInfo = document.getElementById('getInfo');
  getInfo.onclick = function() {
    // GRAPHS
    getPopulation();
    new BarChart(selectedCountries, population);
    new PieChart(selectedCountries, population);
    displayInfo();
    
    // IMAGES
    // TODO Dnamically create imgs from array and append to #images
    var img = document.getElementById("flickrImg");
    if (images.length > 0) {
      var image = images[0];
      img.src = image.photos.photo[0].url_o;
    }
    images = [];
  

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

  hideInfo();

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

