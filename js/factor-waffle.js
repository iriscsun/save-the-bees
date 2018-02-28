// SVG to work with
var data2 = [
  { "name": "Mortgage ($84,911)", "value": 84911},
  { "name": "Auto and\ntuition loans ($14,414)", "value": 14414},
  { "name": "Home equity loans ($10,062)", "value": 10062},
  { "name": "Credit Cards ($8,565)", "value": 8565}
]

/* to color elements we use the class name ( slugigy(name) ) */
var domain = data2.map(function(d){ return slugify(d.name); })
var range = ["#c7d4b6", "#a3aabd", "#a0d0de", "#97b5cf"]
var palette = d3.scale.ordinal().domain(domain).range(range);

var chart4 = d3waffle()
                .rows(10)
                .scale(1/392/2)
                .colorscale(palette)
                .appearancetimes(function(d, i){ return i*10 + Math.random()*250;})
                .height(320);


d3.select("svg")
  .datum(data2)
  .call(chart4);
