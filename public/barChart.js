var BarChart = function(selectedCountries, population) {

  var container = document.getElementById('barChart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'bar',
      renderTo: container
    },
    xAxis: {
        categories: selectedCountries
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Peeps',
            align: 'middle'
        },
        labels: {
            overflow: 'justify'
        }
    },
    title: {
        text: ' ',
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: false
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Population',
        data: population
    }]

  })

}


