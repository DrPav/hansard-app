var getX = function(json){
    var series = []
    json.forEach(function(item){
        series.push(item._id)
    })
    return series }

var getSeries = function(json){
    var series = []
    json.forEach(function(item){
        series.push(item.count)
    })
    return series }
    
$.getJSON( "/dept-data?limit=10", function( data ) {
    // Chart
    $(function () { 
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Questions answered by department'
            },
            xAxis: {
                categories: getX(data)
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            series: [{
                name: 'Questions answered',
                data: getSeries(data)
            }],
            legend: {
                enabled: false
            }
        });
    });
})

