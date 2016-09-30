var BarChart = function(selectedCountries, population, area) {

  var container = document.getElementById('barChart');

  var chart = new Highcharts.Chart({

    chart: {
              type: 'bar',
              renderTo: container
            },
            title: {
                text: 'Places and their Peeps'
            },
            // subtitle: {
            //     text: ''
            // },
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
            // tooltip: {
            //     valueSuffix: ' millions'
            // },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'right',
            //     verticalAlign: 'top',
            //     x: -40,
            //     y: 80,
            //     floating: true,
            //     borderWidth: 1,
            //     backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            //     shadow: true
            // },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Population',
                data: population
            }
            // {
            //     name: 'Area (km2)',
            //     data: area
            // }
            ]

  })

}


