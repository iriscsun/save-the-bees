


var w = d3.select('#vis').node().getBoundingClientRect().width,
h = w,
N = 20;
var speed = 100;
var alive = N*N;
var blue = d3.rgb(100,100,200),
    red = d3.rgb(200,100,100),
    green = d3.rgb(255,255,255);
var grid = d3.layout.grid()
.nodeSize([h*0.8/(N*2), h*0.8/(N*2)])
.padding([h*0.8/(N*2), h*0.8/(N*2)]);

var sick = 0.04;
    die = 0.03;

var nodes = [];
// var force,root,svg,button;
var pause = false;

d3.select("#pesticides-slider").on("input", function () {
		sick = this.value / 1000;
		pause = false;
		startSim();
});

d3.select("#playpause").on("click", function () {
	pause = !pause;
});

d3.select("#speed").on("input", function () {
		speed = this.value;
});

function startSim(){
    pause = false;
    //resetGraph();

    d3.select("svg").remove();
    svg = d3.select("#vis").append("svg")
        .attr("id", "simulation")
        .attr("width", w)
        .attr("height", h);

    //create id
    var count = 0;

    nodes = d3.range(N*N).map(function() { return {id: count++, radius: h*0.8/(N*2), infected: Math.random()<0.01, dead:false}; });
        svg.selectAll("circle")
        .data(grid(nodes), function(d) {return d.id; })
        .enter().append("svg:circle")
        .attr("transform", function(d) {return "translate(" +(d.x+w/20) + "," + (d.y+h/20) + ")"; })
        .attr("r", function(d) { return d.radius; })
        .attr("id",function(d,i) {return 'individual-'+i;})
        .style("fill", function(d, i) {return blue; })
        .on("click", function(d,i){
                d.radius=20;
                d3.select(this).attr('stroke','black');
                nodes[i].dead = true;

        });
    }
    // $('#pause').on('click',function(){
    //     pause = !pause;
    //   });
    //   $('#reset').on('click',startSim);

    infected = function (i, N) {
      function getRandomArbitrary(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
      }

      return([getRandomArbitrary(0, 400)]);

    }

    setInterval(function () {

    if (!pause) {
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].infected) {
                var colony = infected(i, N);
                for (var k = 0; k < colony.length; k++) {
                    if (Math.random() < sick & !nodes[colony[k]].dead) {
                        nodes[colony[k]].infected = true;
                    }
                }

                if (Math.random() < die) {
                    nodes[i].infected = false;
                    nodes[i].dead = true;
                }
            }
        }
        svg.selectAll("circle").style("fill", function (d, i) {
            var col = blue;
            if (nodes[i].infected & !nodes.dead) {
                col = red;
            }
            if (nodes[i].dead) {
                col = green;
                alive--;
            }
            return col;
        });

    }
}, speed);
