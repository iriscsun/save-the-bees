function drawSimulation(){
    console.log("in step 3");
    var w = d3.select('#vis').node().getBoundingClientRect().width,
    h = w,
    eps = 0.01,
    N = 20;
    var blue = d3.rgb(100,100,200),
        red = d3.rgb(200,100,100),
        //green = d3.rgb(100,200,100);
        green = d3.rgb(200,200,200);
    var grid = d3.layout.grid()
    .nodeSize([h*0.8/(N*2), h*0.8/(N*2)])
    .padding([h*0.8/(N*2), h*0.8/(N*2)]);

    var beta = eps*1,
        gamma = eps*0.5;

    var nodes = [];
    var force,root,svg,button;
    var pause = false;

    function startSim(){
        pause = false;
        //resetGraph();

        d3.select("svg").remove();
        svg = d3.select("#vis").append("svg")
            .attr("width", w)
            .attr("height", h);
        console.log();
        
        //create id
        var count = 0;

        nodes = d3.range(N*N).map(function() { return {id: count++, radius: h*0.8/(N*2), infected: Math.random()<0.01, immune:false}; });
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
                    nodes[i].immune = true;
      
            });
        }
        $('#pause').on('click',function(){
            pause = !pause;
          });
          $('#reset').on('click',startSim);
          startSim();

        latticeNeighbors = function(ind,N){
            /*
            Takes in index and calculates where in the lattice it is
            2. calculates its neighbors.
               - first calculate left,right,up,down
               - next check if these are outside the boundary if so discard.
            3. converts these neighbors back into a lattice form.
            lattice indexes 0,...,N-1 by 0,...,N-1
            */
            var i = Math.floor(ind/N), j = (ind%N);
            neighbors =[];
            // if (i-1>=0){ neighbors.push([i-1,j]); } //left
            // if (i+1<N){  neighbors.push([i+1,j]); }//right
            // if (j+1<N){  neighbors.push([i,j+1]); } //up
            // if (j-1>=0){ neighbors.push([i,j-1]); } //down
            neighbors.map(function(item,index){ //convert back into index.
              return N*item[0] + item[1];
            });

            console.log(neighbors);
            return neighbors;
        }
        indNeighbors = function(ind,N){
            var inds = latticeNeighbors(ind,N).map(function(item,index){ //convert back into index.
                return N*item[0] + item[1];
            });
            
            return inds
        }

    setInterval(function () {
        if (!pause) {
            var i = 0,
                n = nodes.length,
                I = 0,
                S = 0;
            for (var j = 0; j < n; j++) {
                I += nodes[j].infected & !nodes[j].immune;
                S += !nodes[j].infected & !nodes[j].immune;
            }
            //t += eps;
            if (!(I == 0 || S == 0)) {
                //data[0].x.push(t); data[0].y.push(S);
                //data[1].x.push(t); data[1].y.push(I);
                //Plotly.redraw('graphDiv');
            }
            for (i = 0; i < n; i++) {
                if (nodes[i].infected) {

                    var neighbors = indNeighbors(i, N);
                    for (var ni = 0; ni < neighbors.length; ni++) {
                        if (Math.random() < beta & !nodes[neighbors[ni]].immune) {
                            nodes[neighbors[ni]].infected = true;
                        }
                    }

                    if (Math.random() < gamma) {
                        nodes[i].infected = false;
                        nodes[i].immune = true;
                    }

                }
            }
            svg.selectAll("circle").style("fill", function (d, i) {
                var col = blue;
                if (nodes[i].infected & !nodes.immune) {
                    col = red;
                }
                if (nodes[i].immune) {
                    col = green;
                }
                return col;
            });

            if (I == 0 || S == 0) {

                button.style("visibility", "visible");
            }
        }
    }, 100);
}