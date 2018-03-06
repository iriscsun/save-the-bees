function drawTreeMap() {
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;


      //json data
  var treeData =    [ {
      "name": "Top Level 1 ",
      "parent": "null",
      "img": "https://www.shareicon.net/data/128x128/2016/04/12/748601_insect_512x512.png",
      "name": "Top Level 2",
      "parent": "null",
      "img": "https://www.shareicon.net/data/128x128/2016/04/12/748601_insect_512x512.png",
      "children": [
        {
          "name": "Crops",
          "parent": "Top Level",
          "img": "https://image.flaticon.com/icons/svg/616/616572.svg",
          "children": [
            {
              "name": "Fruits",
              "parent": "Level 2: A",
              "img": "https://image.flaticon.com/icons/svg/755/755261.svg",
                "children": [
                  {
                    "name": "Apples",
                    "parent": "Level 2: A",
                    "img": "https://image.flaticon.com/icons/svg/135/135728.svg",
                  },
                  {
                    "name": "Oranges",
                    "parent": "Level 2: A",
                    "img": "https://image.flaticon.com/icons/svg/135/135620.svg",
                  },
                ]
            },
            {
              "name": "Vegetables",
              "parent": "Level 2: A",
              "img": "https://image.flaticon.com/icons/svg/498/498229.svg",
              "children": [
                {
                  "name": "Broccoli",
                  "parent": "Level 2: A",
                  "img": "https://image.flaticon.com/icons/svg/135/135694.svg",
                },
                {
                  "name": "Onion",
                  "parent": "Level 2: A",
                  "img": "https://image.flaticon.com/icons/svg/184/184506.svg",
                },
              ]
            }
          ]
        },
        {
          "name": "Habitats",
          "parent": "Top Level",
          "img": "https://image.flaticon.com/icons/svg/119/119591.svg",
          "children": [
            {
              "name": "Wild Flowers",
              "parent": "Level 2: A",
              "img": "https://image.flaticon.com/icons/svg/740/740899.svg",
            },
            {
              "name": "Animal Life",
              "parent": "Level 2: A",
              "img": "https://image.flaticon.com/icons/svg/235/235353.svg",
            },
          ]
        }
      ]
    }
  ];

  var i = 0,
  	duration = 750,
  	root;

  var tree = d3.layout.tree()
  	.size([height, width]);

  var diagonal = d3.svg.diagonal()
  	.projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("#vis").append("svg")
    .attr("id", "treemap")
  	.attr("width", width + margin.right + margin.left)
  	.attr("height", height + margin.top + margin.bottom)
    .append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;

  update(root);

  d3.select(self.frameElement).style("height", "500px");

  function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
  	  links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
  	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
  	  .attr("class", "node")
  	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
  	  .on("click", click);

    nodeEnter.append("circle")
  	  .attr("r", 1e-6)
  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);

    nodeEnter.append("text")
  	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
  	  .attr("dy", ".35em")
  	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
  	  .text(function(d) { return d.name; })
  	  .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
  	  .duration(duration)
  	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
  	  .attr("r", 10)
  	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
  	  .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
  	  .duration(duration)
  	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
  	  .remove();

    nodeExit.select("circle")
  	  .attr("r", 1e-6);

    nodeExit.select("text")
  	  .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
  	  .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
  	  .attr("class", "link")
  	  .attr("d", function(d) {
  		var o = {x: source.x0, y: source.y0};
  		return diagonal({source: o, target: o});
  	  });

    // Transition links to their new position.
    link.transition()
  	  .duration(duration)
  	  .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
  	  .duration(duration)
  	  .attr("d", function(d) {
  		var o = {x: source.x, y: source.y};
  		return diagonal({source: o, target: o});
  	  })
  	  .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
  	d.x0 = d.x;
  	d.y0 = d.y;
    });
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
  	d._children = d.children;
  	d.children = null;
    } else {
  	d.children = d._children;
  	d._children = null;
    }
    update(d);
  }
};
