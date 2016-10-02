var BarChart = function(selectedCountries, population) {

  var container = document.getElementById('barChart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'bar',
      renderTo: container
    },
    title: {
        text: 'Places and their Peeps'
    },
    xAxis: {
        categories: selectedCountries,
        title: {
            text: 'Places'
        }
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


