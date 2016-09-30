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
  var createdSegments = createSegments(selectedCountries, population);
  var chart = new Highcharts.Chart({

    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: container
    },
    title: {
        text: 'Places and their Peeps',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'SOMETHING',
        colorByPoint: true,
        data: createdSegments
    }]
  })

}