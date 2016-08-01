// var myJson = [
//     {_id: 'Health', count: 42 },
//     { _id: 'Education', count: 26 },
//     { _id: 'Communities and Local Government', count: 24 },
//     { _id: 'Environment, Food and Rural Affairs', count: 21 },
//     { _id: 'Defence', count: 20 },
//     { _id: 'Home Office', count: 20 },
//     { _id: 'Cabinet Office', count: 18 },
//     { _id: 'Exiting the European Union', count: 18 },
//     { _id: 'International Development', count: 18 },
//     { _id: 'Foreign and Commonwealth Office', count: 18 },
//     { _id: 'Transport', count: 17 },
//     { _id: 'Treasury', count: 12 },
//     { _id: 'Justice', count: 9 },
//     { _id: 'Culture, Media and Sport', count: 9 },
//     { _id: 'Work and Pensions', count: 7 } ]

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
    
$.getJSON( "/dept-data", function( data ) {
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

