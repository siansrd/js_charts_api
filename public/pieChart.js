var Segment = function(name, number) {
  this.name= name
  this.y = number
}


var createSegments = function(selectedCountries, population) {
  var allSegments = [];
  for (var i = 0; i < selectedCountries.length; i++ ) {
    var newSegment = new Segment(selectedCountries[i], population[i]);
    allSegments.push(newSegment);
  }
  return allSegments;
}


var PieChart = function(selectedCountries, population) {

  var container = document.getElementById('pieChart');
  var createdSegments = createSegments(selectedCountries, population)


  var chart = new Highcharts.Chart({

    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: container
    },
    title: {
        text: ' ',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: false
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Population',
        colorByPoint: true,
        data: createdSegments
    }]
  })

}