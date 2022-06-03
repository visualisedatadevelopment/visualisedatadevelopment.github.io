d3.csv("./mpdata.csv", function(data){

var width = 800;
var height = 600;

window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

var pause = 2000



var svg = d3.select("#myfig").append("svg")
                            .attr("id", "plot")
                            .attr("width", width)
                            .attr("height", height);


var color = d3.scaleOrdinal()
  .domain(["Conservative", "Labour", "Other"])
  .range([ "#5768AC", "#FA5A50", "#69b3a2"])


function posy(i, w){
  if (i < w){
    return i
  }
  else {
    if (i%w==0){
      return(w)
    }
    else {
      return(i%w)
    }
  }
}


function posx(i, w){
  if (i%w == 0){
    return Math.floor(i/w)-1
  }
  else {
  	return Math.floor(i/w)
  }
 }

 // Build color scale
 var myColor = d3.scaleSequential()
   .interpolator(d3.interpolateInferno)
   .domain([1,100])

 // create a tooltip
var tooltipbox = svg
    .append("rect")
    .attr("class", "tooltip")
    .attr("x", 10)
    .attr("y", 490)
    .attr("height", 50)
    .attr("width", 300)
    .style("fill", "white")
    .style("opacity", 0)
    .style("stroke", "black");


 var tooltipname = svg
   .append("text")
   .style("opacity", 0)
   .attr("class", "tooltip")
   .attr("x", 20)
   .attr("y", 510);

 var tooltipnum = svg
   .append("text")
   .style("opacity", 0)
   .attr("class", "tooltip")
   .attr("x", 20)
   .attr("y", 530);


var node = svg.append("g")
  .attr("class", "circlelayer")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("class", "mpcircle")
    .attr("r", function(d){return (d.Total/20000)+5;})
    .attr("cx", width/2)
    .attr("cy", height/2)
    .style("fill", "#69b3a2")
    .style("fill-opacity", 1)
    .attr("stroke", "black")
    .style("stroke-width", 0.5)
    .on("mouseover", function(d){
        d3.select(this).style("stroke-width", 2)
        tooltipnum.text("£" + d3.format("d")(d.Total)).style("opacity", 1)
        tooltipname.text(d.MP + "    (" + d.Party + ")").style("opacity", 1)
        tooltipbox.style("opacity", 1)
        tooltipname.raise()
    })
    .on("mouseleave", function(d){
        d3.select(this).style("stroke-width", 0.5)
        tooltipnum.style("opacity", 0)
        tooltipname.style("opacity", 0)
        tooltipbox.style("opacity", 0)
    });


var simulation = d3.forceSimulation()
  .force("x", null)
  .force("y", null)
  .force("center", d3.forceCenter().x(width / 2).y(height / 2.3)) // Attraction to the center of the svg area
  .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
  .force("collide", d3.forceCollide().strength(0.1).radius(function(d){return (d.Total/20000)+10}).iterations(1)) // Force that avoids circle overlapping


var swarmsimulation = d3.forceSimulation()
  .force("x", d3.forceX().x(function(d){return swarmx(d.Total)}).strength(1))
  .force("y", d3.forceY().y(function(d){return swarmy(d.Party)}).strength(1))
  .force("charge", d3.forceManyBody().strength(0.5))
  .force("collide", d3.forceCollide().radius(5).iterations(1))
  .alphaDecay(0.1)


simulation
    .nodes(data)
    .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    })

  var zerodata = data.filter(function(d){return d.Total == 0});
  var nonzerodata = data.filter(function(d){return d.Total > 0});

  var k = 11
  var delay = 0

function scrollupdate(obj, attr_name, end_value, prog){
  if (attr_name == "opacity"){
    var start_value = obj.style["fill-opacity"]
  }
  else {
    var start_value = obj.getAttribute(attr_name)
  }
  var update = d3.interpolateNumber(start_value, end_value)
  return update(prog)
}

function update(s, direction){
  if(s == "step2"){
    simulation.stop()

    d3.selectAll(".label")
      .remove();

    node.filter(function(d){return d.Total == 0})
        .transition().duration(1000)
        .attr("r", 5)
        .style("opacity", 0.25)
        .style("fill", "#69b3a2")
        .attr("cx", function(d,i){return 100 + posx(i+1, 10)*k})
        .attr("cy", function(d,i){return 50 + posy(i+1, 10)*k})

    node.filter(function(d){return d.Total > 0})
        .transition().duration(1000)
        .attr("r", 5)
        .style("opacity", 1)
        .style("fill", "#69b3a2")
        .attr("cx", function(d,i){return 100 + posx(i+1, 10)*k})
        .attr("cy", function(d,i){return 200 + posy(i+1, 10)*k})

    // Scroll update version:
    // node.filter(function(d){return d.Total == 0})
    //     .attr("r", function(d){
    //       return scrollupdate(this, "r", 5, p)
    //     })
    //     .style("opacity", function(d){
    //       return scrollupdate(this, "opacity", 0.25, p)
    //     })
    //     .attr("cx", function(d,i){
    //       return scrollupdate(this, "cx", 100 + posx(i+1, 10)*k, p)
    //     })
    //     .attr("cy", function(d,i){
    //       return scrollupdate(this, "cy", 100 + (posy(i+1, 10)*k)-30, p)
    //     })
    //
    // node.filter(function(d){return d.Total > 0})
    //     .attr("r", function(d){
    //       return scrollupdate(this, "r", 5, p)
    //     })
    //     .attr("cx", function(d,i){
    //       return scrollupdate(this, "cx", 100 + posx(i+1, 10)*k, p)
    //     })
    //     .attr("cy", function(d,i){
    //       return scrollupdate(this, "cy", 250 + (posy(i+1, 10)*k)-30, p)
    //     })

    svg.append("text")
        .attr("class", "zero label")
        .attr("x", 0)
        .attr("y", 90)
        .text("No extra")
        .attr("alignment-baseline", "middle")
        .style("font-size", "15px")

  svg.append("text")
      .attr("class", "zero label")
      .attr("x", 0)
      .attr("y", 110)
      .text("income")
      .attr("alignment-baseline", "middle")
      .style("font-size", "15px")

    svg.append("text")
        .attr("class", "nonzero label")
        .attr("x", 0)
        .attr("y", 240)
        .text("Extra")
        .attr("alignment-baseline", "middle")
        .style("font-size", "15px")

    svg.append("text")
        .attr("class", "nonzero label")
        .attr("x", 0)
        .attr("y", 260)
        .text("income")
        .attr("alignment-baseline", "middle")
        .style("font-size", "15px")

    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 200)
        .attr("y", 110)
        .text("57%")
        .style("font-size", "21px")

    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 200)
        .attr("y", 260)
        .text("43%")
        .style("font-size", "21px")

    d3.selectAll(".label")
      .style("opacity", 0)
      .transition().duration(1000)
      .style("opacity", 1)

    svg.transition().duration(1000).attr("transform", "translate(0,50)")

  };


if(s == "step3"){

  d3.selectAll(".label")
    .remove()

  svg.transition().duration(1000).attr("transform", "translate(0,0)")

  node.filter(function(d){return d.Total == 0})
      .transition("t1").duration(1000)
      .attr("r", 5)
      .style("opacity", 0.25)

  node.filter(function(d){return d.Party == "Labour"})
      .transition("t2").duration(1000).delay(function(d,i){return i*delay})
      .attr("r", 5)
      .style("fill", "#FA5A50")
      .attr("cx", function(d,i){return (100 + posx(i+1, 6)*k)})
      .attr("cy", function(d,i){return (100 + posy(i+1, 6)*k)-30})

  node.filter(function(d){return d.Party == "Conservative"})
      .transition("t2").duration(1000).delay(function(d,i){return i*delay})
      .attr("r", 5)
      .style("fill", "#5768AC")
      .attr("cx", function(d,i){return 100 + posx(i+1, 6)*k})
      .attr("cy", function(d,i){return (250 + posy(i+1, 6)*k)-30})

  node.filter(function(d){return d.Party != "Conservative" & d.Party != "Labour"})
      .transition("t2").duration(1000).delay(function(d,i){return i*delay})
      .attr("r", 5)
      .attr("cx", function(d,i){return 100 + posx(i+1, 6)*k})
      .attr("cy", function(d,i){return 400 + (posy(i+1, 6)*k)-30})

  svg.append("text")
      .attr("class", "lab label")
      .attr("x", 30)
      .attr("y", 100)
      .text("Lab")
      .attr("alignment-baseline", "middle")

  svg.append("text")
      .attr("class", "con label")
      .attr("x", 30)
      .attr("y", 250)
      .text("Con")
      .attr("alignment-baseline", "middle")

  svg.append("text")
      .attr("class", "other label")
      .attr("x", 30)
      .attr("y", 400)
      .text("Other")
      .attr("alignment-baseline", "middle")


  svg.append("text")
      .attr("class", "label")
      .attr("x", 593)
      .attr("y", 120)
      .text("38%")
      .style("font-size", "21px")

  svg.append("text")
      .attr("class", "label")
      .attr("x", 692)
      .attr("y", 270)
      .text("47%")
      .style("font-size", "21px")

  svg.append("text")
      .attr("class", "label")
      .attr("x", 263)
      .attr("y", 420)
      .text("39%")
      .style("font-size", "21px")

  d3.selectAll(".label")
      .style("opacity", 0)
      .transition().duration(1000)
      .style("opacity", 1)

};

if(s == "step4"){

  d3.selectAll(".xgrid, .ygrid, .xaxis, .arrow, .label, .borisjohnsonlab").remove();

  node.filter(function(d){return d.Party == "Labour"})
      .transition("t1").duration(1000).delay(function(d,i){return i*delay})
      .attr("r", 5)
      .style("fill", "#FA5A50")
      .attr("cx", function(d,i){return (100 + posx(i+1, 6)*k)})
      .attr("cy", function(d,i){return (100 + posy(i+1, 6)*k)-30})

  node.filter(function(d){return d.Party == "Conservative"})
      .transition("t1").duration(1000).delay(function(d,i){return i*delay})
      .attr("r", 5)
      .style("fill", "#5768AC")
      .attr("cx", function(d,i){return 100 + posx(i+1, 6)*k})
      .attr("cy", function(d,i){return (250 + posy(i+1, 6)*k)-30})

  node.filter(function(d){return d.Party != "Conservative" & d.Party != "Labour"})
      .transition("t1").duration(1000).delay(function(d,i){return i*delay})
      .attr("r", 5)
      .attr("cx", function(d,i){return 100 + posx(i+1, 6)*k})
      .attr("cy", function(d,i){return 400 + (posy(i+1, 6)*k)-30})

  svg.append("text")
      .attr("class", "lab label")
      .attr("x", 30)
      .attr("y", 100)
      .text("Lab")
      .attr("alignment-baseline", "middle")

  svg.append("text")
      .attr("class", "con label")
      .attr("x", 30)
      .attr("y", 250)
      .text("Con")
      .attr("alignment-baseline", "middle")

  svg.append("text")
      .attr("class", "other label")
      .attr("x", 30)
      .attr("y", 400)
      .text("Other")
      .attr("alignment-baseline", "middle")

  d3.selectAll(".label")
      .style("opacity", 0)
      .transition().duration(1000)
      .style("opacity", 1)

  node.filter(function(d){return d.Total == 0})
      .transition("t2").duration(500)
      .style("opacity", 0)
      .transition("61").duration(1000)
      .attr("cx", 0)
      .attr("cy", 0);



};


if(s == "step5"){


  var labnodes = node.filter(function(d){return d.Party == "Labour" & d.Total > 0})
  var connodes = node.filter(function(d){return d.Party == "Conservative" & d.Total > 0})
  var othernodes = node.filter(function(d){return d.Party != "Labour" & d.Party != "Conservative" & d.Total > 0})

  var swarmradius = 1.5

  var swarmx = d3.scaleLinear()
    .domain([0,800000])
    .range([100, width-50]);

  var swarmy = d3.scaleOrdinal()
    .domain(["Conservative", "Labour", "SNP"])
    .range([250, 100, 400])

  var xaxis = d3.axisBottom(swarmx).tickFormat(d3.format("d")).ticks(9);

  var arby = d3.scaleLinear()
                .domain([0,100])
                .range([450,10])

  var yaxis = d3.axisLeft(arby).tickFormat("").tickSize(0);

  var xgriddata = [{"x":0},{"x":20000},{"x":40000},{"x":60000},{"x":80000},{"x":100000},{"x":120000},{"x":140000},{"x":160000},{"x":180000},{"x":200000},{"x":220000},{"x":240000},{"x":260000},{"x":280000},{"x":300000},{"x":320000},{"x":340000},{"x":360000},{"x":380000},{"x":400000},{"x":420000},{"x":440000},{"x":460000},{"x":480000},{"x":500000},{"x":520000},{"x":540000},{"x":560000},{"x":580000},{"x":600000},{"x":620000},{"x":640000},{"x":660000},{"x":680000},{"x":700000},{"x":720000},{"x":740000},{"x":760000},{"x":780000},{"x":800000}];

  var ygriddata = [{"y":0},{"y":5},{"y":10},{"y":15},{"y":20},{"y":25},{"y":30},{"y":35},{"y":40},{"y":45},{"y":50},{"y":55},{"y":60},{"y":65},{"y":70},{"y":75},{"y":80},{"y":85},{"y":90},{"y":95},{"y":100}] ;

  svg.selectAll("line.xgrid")
      .data(xgriddata)
      .enter()
      .append("line")
      .attr("class", "xgrid")
      .attr("x1", function(d){return swarmx(d.x)})
      .attr("x2", function(d){return swarmx(d.x)})
      .attr("y1", 10)
      .attr("y2", 450);

  svg.selectAll("line.ygrid")
      .data(ygriddata)
      .enter()
      .append("line")
      .attr("class", "ygrid")
      .attr("y1", function(d){return arby(d.y)})
      .attr("y2", function(d){return arby(d.y)})
      .attr("x1", 100)
      .attr("x2", width - 50);


  var swarmlabour = d3
    .beeswarm()
    .data(data.filter(function(d){return d.Party == "Labour" & d.Total > 0})) // set the data to arrange
    .distributeOn(function(d) {
      // set the value accessor to distribute on
      return swarmx(d.Total); // evaluated once on each element of data
    }) // when starting the arrangement
    .radius(swarmradius) // set the radius for overlapping detection
    .orientation('horizontal') // set the orientation of the arrangement
    // could also be 'vertical'
    .side('symetric') // set the side(s) available for accumulation
    // could also be 'positive' or 'negative'
    .arrange(); // launch arrangement computation;
  // return an array of {datum: , x: , y: }
  // where datum refers to an element of data
  // each element of data remains unchanged

    labnodes
    .data(swarmlabour)
    .transition().duration(1000)
    //.attr("transform", "translate(00,100)")
    .style("opacity", 1)
    .attr('cx', function(bee) {
      return bee.x;
    })
    .attr('cy', function(bee) {
      return 100 + bee.y;
    })
    .attr('r',swarmradius)
    //.style("stroke-width", 0);


    var swarmconservative = d3
      .beeswarm()
      .data(data.filter(function(d){return d.Party == "Conservative" & d.Total > 0})) // set the data to arrange
      .distributeOn(function(d) {
        // set the value accessor to distribute on
        return swarmx(d.Total); // evaluated once on each element of data
      }) // when starting the arrangement
      .radius(swarmradius) // set the radius for overlapping detection
      .orientation('horizontal') // set the orientation of the arrangement
      // could also be 'vertical'
      .side('symetric') // set the side(s) available for accumulation
      // could also be 'positive' or 'negative'
      .arrange(); // launch arrangement computation;
    // return an array of {datum: , x: , y: }
    // where datum refers to an element of data
    // each element of data remains unchanged


      connodes
      .data(swarmconservative)
      .transition().duration(1000)
      //.attr("transform", "translate(0,250)")
      .style("opacity", 1)
      .attr('cx', function(bee) {
        return bee.x;
      })
      .attr('cy', function(bee) {
        return 250 + bee.y;
      })
      .attr('r',swarmradius)
      //.style("stroke-width", 0);

      var swarmother = d3
        .beeswarm()
        .data(data.filter(function(d){return d.Party != "Conservative" & d.Party != "Labour" & d.Total > 0})) // set the data to arrange
        .distributeOn(function(d) {
          // set the value accessor to distribute on
          return swarmx(d.Total); // evaluated once on each element of data
        }) // when starting the arrangement
        .radius(swarmradius) // set the radius for overlapping detection
        .orientation('horizontal') // set the orientation of the arrangement
        // could also be 'vertical'
        .side('symetric') // set the side(s) available for accumulation
        // could also be 'positive' or 'negative'
        .arrange(); // launch arrangement computation;
      // return an array of {datum: , x: , y: }
      // where datum refers to an element of data
      // each element of data remains unchanged

      othernodes
      .data(swarmother)
      .transition().duration(1000)
      //.attr("transform", "translate(0,400)")
      .style("opacity", 1)
      .attr('cx', function(bee) {
        return bee.x;
      })
      .attr('cy', function(bee) {
        return 400 + bee.y;
      })
      .attr('r',swarmradius)
      //.style("stroke-width", 0);

      d3.select(".circlelayer").raise();

      node.data(data)

      if(direction == "down"){

        svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(00," + (height-150) + ")")
        .call(xaxis);

        svg.append("text")
            .attr("class", "label")
            .attr("x", 350)
            .attr("y", height - 100)
            .text("Extra income (£)")
            .style("font-size", "12px")
      }

      if(direction == "up"){

        d3.selectAll(".xaxis").transition().duration(1000).call(xaxis)

        d3.selectAll(".legend").transition().duration(500).style("opacity", 0).remove()

      }

      var arrowline = d3.line().curve(d3.curveNatural);
      var arrowpoints = [[swarmx(790000),245], [swarmx(750000),200], [swarmx(690000),180], [swarmx(660000),175]]

      svg.append("g")
          .attr("class", "arrow")
          .style("opacity", 0)
          .append("path")
          .attr("d", arrowline(arrowpoints))
          .attr("fill", "none")


        svg.append("text")
            .attr("class", "borisjohnsonlab")
            .attr("x", swarmx(510000))
            .attr("y", 178)
            .text("Boris Johnson")
            .style("opacity",0)
            .transition().duration(2000)
            .style("opacity", 1)

        var arrow = d3.arrow10()
          .id("my-arrow")
          .attr("stroke", "#868686")
          .attr("fill", "none");

        svg.call(arrow);

        d3.select(".arrow").append("polyline")
            .attr("marker-end", "url(#my-arrow)")
            .attr("points", [[swarmx(789400),244], [swarmx(790000),245]])
            .attr("fill", "none");


        d3.select(".arrow")
          .transition().duration(2000)
          .style("opacity", 1)
          .attr("transform", "translate(3,0)")

};

if(s == "step6"){

  if (direction == "up"){

    d3.selectAll(".label").remove();

    svg.append("text")
        .attr("class", "label")
        .attr("x", 350)
        .attr("y", height - 100)
        .text("Extra income (£)")
        .style("font-size", "12px");

    svg.append("text")
        .attr("class", "lab label")
        .attr("x", 30)
        .attr("y", 100)
        .text("Lab")
        .attr("alignment-baseline", "middle")

    svg.append("text")
        .attr("class", "con label")
        .attr("x", 30)
        .attr("y", 250)
        .text("Con")
        .attr("alignment-baseline", "middle")

    svg.append("text")
        .attr("class", "other label")
        .attr("x", 30)
        .attr("y", 400)
        .text("Other")
        .attr("alignment-baseline", "middle")

      d3.selectAll(".label")
        .style("opacity", 0)
        .transition().duration(1000)
        .style("opacity", 1)

  }

  d3.selectAll(".regline").remove()
  d3.selectAll(".corlabel").remove()
  d3.selectAll(".yaxis").remove()
  d3.selectAll(".arrow").transition().duration(1000).style("opacity",0).remove()
  d3.selectAll(".borisjohnsonlab").transition().duration(1000).style("opacity",0).remove()

  var labnodes = node.filter(function(d){return d.Party == "Labour" & d.Total > 0})
  var connodes = node.filter(function(d){return d.Party == "Conservative" & d.Total > 0})
  var othernodes = node.filter(function(d){return d.Party != "Labour" & d.Party != "Conservative" & d.Total > 0})

  var swarmx = d3.scaleLog().base(10)
    .domain([100,1000000])
    .range([100, width-50]);


  var logxaxis = d3.axisBottom(swarmx).tickValues([100, 1000, 10000, 100000, 1000000]).tickFormat(d3.format("d"));

  d3.selectAll(".xaxis")
  .transition().duration(1000)
  .call(logxaxis)
  .style("opacity", 1);


  var swarmradius = 5

    var swarmlabour = d3
      .beeswarm()
      .data(data.filter(function(d){return d.Party == "Labour" & d.Total > 0})) // set the data to arrange
      .distributeOn(function(d) {
        // set the value accessor to distribute on
        return swarmx(d.Total); // evaluated once on each element of data
      }) // when starting the arrangement
      .radius(swarmradius) // set the radius for overlapping detection
      .orientation('horizontal') // set the orientation of the arrangement
      // could also be 'vertical'
      .side('symetric') // set the side(s) available for accumulation
      // could also be 'positive' or 'negative'
      .arrange(); // launch arrangement computation;
    // return an array of {datum: , x: , y: }
    // where datum refers to an element of data
    // each element of data remains unchanged

      labnodes
      .data(swarmlabour)
      .transition().duration(1000)
      //.attr("transform", "translate(00,100)")
      .style("opacity", 1)
      .attr('cx', function(bee) {
        return bee.x;
      })
      .attr('cy', function(bee) {
        return 100 + bee.y;
      })
      .attr('r',swarmradius)
      .style("stroke-width", 0.5);


      var swarmconservative = d3
        .beeswarm()
        .data(data.filter(function(d){return d.Party == "Conservative" & d.Total > 0})) // set the data to arrange
        .distributeOn(function(d) {
          // set the value accessor to distribute on
          return swarmx(d.Total); // evaluated once on each element of data
        }) // when starting the arrangement
        .radius(swarmradius) // set the radius for overlapping detection
        .orientation('horizontal') // set the orientation of the arrangement
        // could also be 'vertical'
        .side('symetric') // set the side(s) available for accumulation
        // could also be 'positive' or 'negative'
        .arrange(); // launch arrangement computation;
      // return an array of {datum: , x: , y: }
      // where datum refers to an element of data
      // each element of data remains unchanged


        connodes
        .data(swarmconservative)
        .transition().duration(1000)
        //.attr("transform", "translate(0,250)")
        .style("opacity", 1)
        .attr('cx', function(bee) {
          return bee.x;
        })
        .attr('cy', function(bee) {
          return 250 + bee.y;
        })
        .attr('r',swarmradius)
        .style("stroke-width", 0.5);

        var swarmother = d3
          .beeswarm()
          .data(data.filter(function(d){return d.Party != "Conservative" & d.Party != "Labour" & d.Total > 0})) // set the data to arrange
          .distributeOn(function(d) {
            // set the value accessor to distribute on
            return swarmx(d.Total); // evaluated once on each element of data
          }) // when starting the arrangement
          .radius(swarmradius) // set the radius for overlapping detection
          .orientation('horizontal') // set the orientation of the arrangement
          // could also be 'vertical'
          .side('symetric') // set the side(s) available for accumulation
          // could also be 'positive' or 'negative'
          .arrange(); // launch arrangement computation;
        // return an array of {datum: , x: , y: }
        // where datum refers to an element of data
        // each element of data remains unchanged

        othernodes
        .data(swarmother)
        .transition().duration(1000)
        //.attr("transform", "translate(0,400)")
        .style("opacity", 1)
        .attr('cx', function(bee) {
          return bee.x;
        })
        .attr('cy', function(bee) {
          return 400 + bee.y;
        })
        .attr('r',swarmradius)
        .style("stroke-width", 0.5);

        d3.select(".circlelayer").raise();

        node.data(data)

        node.filter(function(d){return d.MP == "Cheryl Gillan" | d.MP == "Barbara Keeley"})
          .style("fill", "#ffe400")

        svg.append("circle")
           .attr("class", "legend")
           .attr("cx", swarmx(100000))
           .attr("cy", 50)
           .attr("r", swarmradius+1)
           .style("fill", "#ffe400")
           .style("stroke-width", "0.5px")
           .style("stroke", "black")

        svg.append("text")
          .attr("class", "legend")
          .attr("x", swarmx(100000)+20)
          .attr("y", 55)
          .text("= median MP")

        d3.selectAll(".legend")
          .style("opacity", 0)
          .transition().duration(1000)
          .style("opacity", 1)

      };

      if (s=="step7"){

        d3.selectAll(".regline").remove()
        d3.selectAll(".corlabel").remove()
        d3.selectAll(".legend").transition().duration(500).style("opacity", 0).remove()

        node.filter(function(d){return d.MP == "Cheryl Gillan"})
          .style("fill", color("Conservative"))

          node.filter(function(d){return d.MP == "Barbara Keeley"})
            .style("fill", color("Labour"))


        var majpy = d3.scaleLog()
                      .domain([100,1000000])
                      .range([height-150,10])

        var yaxis = d3.axisLeft(majpy).tickValues([100, 1000, 10000, 100000, 1000000]).tickFormat(d3.format("d"));

        var swarmx = d3.scaleLog().base(10)
          .domain([100,1000000])
          .range([100, width-50]);

        d3.selectAll(".xaxis text")
          .remove()

        d3.selectAll(".xaxis line")
          .remove()

        d3.select(".xaxis path")
          .transition().duration(1000)
          .attr("transform", "rotate(-90,100,0)")
          .transition().duration(1000)
          .style("opacity", 0)
          .remove()

        svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(100,0)")
            .call(yaxis)
            .style("opacity", 0)
            .transition().delay(1000).duration(1000)
            .style("opacity", 1)

        node.filter(function(d){return d.Total > 0})
          .transition().duration(1000)
          .attr("cx", swarmx(100))
          .attr("cy", function(d){return majpy(d.Total)})
          .style("opacity", 1)
          .attr("transform", "translate(0,0)")


        d3.selectAll(".label").transition("60").duration(500)
          .style("opacity", 0)
          .remove();

        svg.append("text")
            .attr("class", "label")
            .attr("x", 300)
            .attr("y", height - 100)
            .text("MPs Lead in 2017 GE (percentage points)")
            .style("font-size", "12px");

        svg.append("text")
            .attr("class", "label")
            .attr("x", 0)
            .attr("y", 150)
            .attr("transform-origin", "60px 200px")
            .attr("transform", "rotate(-90)")
            .text("Extra income (£)")
            .style("font-size", "12px");

        var majpx = d3.scaleLinear()
                      .domain([0,80])
                      .range([100,width-50])

        var xaxis = d3.axisBottom(majpx)

        svg.append("g")
            .attr("transform", "translate(0,450)")
            .attr("class", "xaxis")
            .call(xaxis)
            .style("opacity", 0)
            .transition().delay(1000).duration(1000)
            .style("opacity", 1)

        node.transition().delay(1100).duration(1000)
            .attr("cx", function(d){return majpx(d.majp)})

        node.filter(function(d){return d.majp == "NA"})
            .style("opacity", 0)

        svg.append("path")
            .datum(data.filter(function(d){return d.totalfit != "NA"}))
            .attr("class", "regline")
            .attr("d", d3.line()
              .x(function(d) { return majpx(d.majp) })
              .y(function(d) { return majpy(d.totalfit)})
            )
            .style("opacity", 0)
            .transition().delay(2100).duration(1000)
            .style("opacity", 1);

        svg.append("text")
            .attr("class", "corlabel")
            .attr("x", majpx(65))
            .attr("y", majpy(18000))
            .text("R sqrd: 0.01")
            .style("opacity", 0)
            .transition().delay(2100).duration(1000)
            .style("opacity", 1);

        svg.append("text")
            .attr("class", "corlabel")
            .attr("x", majpx(65))
            .attr("y", majpy(10000))
            .text("p-value: 0.14")
            .style("opacity", 0)
            .transition().delay(2100).duration(1000)
            .style("opacity", 1);
      }

    if (s=="step8"){


      var majpx = d3.scaleLinear()
                    .domain([0,80])
                    .range([100,width-50])

      var majpy = d3.scaleLog()
                    .domain([100,1000000])
                    .range([height-150,10])

      var yaxis = d3.axisLeft(majpy).tickValues([100, 1000, 10000, 100000, 1000000]).tickFormat(d3.format("d"));

      var xaxis = d3.axisBottom(majpx)

      if (direction == "up"){

        node.transition("t4").duration(1000)
            .style("fill", function(d){return(color(d.PGroup))})
            .style("stroke-width", 0.5);

        svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(100,0)")
            .call(yaxis)
            .style("opacity", 0)
            .transition().delay(1000).duration(1000)
            .style("opacity", 1)


        svg.append("g")
            .attr("transform", "translate(0,450)")
            .attr("class", "xaxis")
            .call(xaxis)
            .style("opacity", 0)
            .transition().delay(1000).duration(1000)
            .style("opacity", 1)

        svg.append("text")
            .attr("class", "label")
            .attr("x", 300)
            .attr("y", height - 100)
            .text("MP's Lead in 2017 GE (percentage points)")
            .style("font-size", "12px");

        svg.append("text")
            .attr("class", "label")
            .attr("x", 0)
            .attr("y", 150)
            .attr("transform-origin", "60px 200px")
            .attr("transform", "rotate(-90)")
            .text("Extra income (£)")
            .style("font-size", "12px");


      }

      d3.selectAll(".regline").transition().duration(1000).style("opacity",0).remove()
      d3.selectAll(".corlabel").transition().duration(1000).style("opacity",0).remove()

      node.filter(function(d){return d.Total > 0})
        .transition("t1").duration(1000)
        .attr("cx", function(d){return majpx(d.majp)})
        .attr("cy", function(d){return majpy(d.Total)})

      node.filter(function(d){return d.Party != "Conservative" & d.Total > 0})
          .transition("t2").duration(1000)
          .style("opacity", 0.2)

      node.filter(function(d){return d.Total == 0})
          .transition("t3").duration(1000)
          .style("opacity", 0);




      svg.append("path")
          .datum(data.filter(function(d){return d.confit != "NA"}))
          .attr("class", "regline")
          .attr("d", d3.line()
            .x(function(d) { return majpx(d.majp) })
            .y(function(d) { return majpy(d.confit)})
          )
          .style("opacity", 0)
          .style("stroke", "#6C91D6")
          .transition().delay(2100).duration(1000)
          .style("opacity", 1);

      svg.append("text")
          .attr("class", "corlabel")
          .attr("x", majpx(51))
          .attr("y", majpy(18000))
          .text("R sqrd: 0.03")
          .style("opacity", 0)
          .transition().delay(2100).duration(1000)
          .style("opacity", 1);

      svg.append("text")
          .attr("class", "corlabel")
          .attr("x", majpx(51))
          .attr("y", majpy(10000))
          .text("p-value: 0.03")
          .style("opacity", 0)
          .transition().delay(2100).duration(1000)
          .style("opacity", 1);


    }

    if (s == "step9"){

      d3.selectAll(".label").remove();
      d3.selectAll(".regline").transition().duration(1000).style("opacity",0).remove()
      d3.selectAll(".corlabel").transition().duration(1000).style("opacity",0).remove()
      d3.selectAll(".yaxis").transition().duration(1000).style("opacity",0).remove()
      d3.selectAll(".xaxis").transition().duration(1000).style("opacity",0).remove()

      var majpx = d3.scaleLinear()
                    .domain([0,80])
                    .range([100,width-50])

      var majpy = d3.scaleLog()
                    .domain([100,1000000])
                    .range([height-150,10])

      var xgeo = d3.scaleLinear()
                    .domain([-8,3])
                    .range([250, width-100])

      var ygeo = d3.scaleLinear()
                    .domain([50,58])
                    .range([height-150,10])


      var chloroscale = d3.scaleLog()
                          .domain([1, 1000000])
                          .range([0,1])
      // node.remove()
      //
      // var newnode = d3.select("g.circlelayer").selectAll("circle")
      //         .data(data)
      //         .enter()
      //         .append("circle")
      //         .attr("cx", function(d){return majpx(d.majp)})
      //         .attr("cy", function(d){
      //           if (d.Total > 0){
      //             return majpy(d.Total)
      //           }
      //           else{
      //             return 0
      //           }})
      //         .attr("r", 5)
      //         .style("opacity", function(d){
      //           if(d.Total>0){
      //             return 1
      //           }
      //           else{
      //             return 0
      //           }
      //         })
      //         .style("fill", function(d){return color(d.Party)})
      //         .attr("stroke", "black")
      //         .style("stroke-width", 0.5)
      //         .on("mouseover", function(d){
      //             d3.select(this).style("stroke-width", 2)
      //             tooltipnum.text("£" + d3.format("d")(d.Total)).style("opacity", 1)
      //             tooltipname.text(d.MP + "    (" + d.Party + ")").style("opacity", 1)
      //             tooltipbox.style("opacity", 1)
      //             tooltipname.raise()
      //         })
      //         .on("mouseleave", function(d){
      //             d3.select(this).style("stroke-width", 0)
      //             tooltipnum.style("opacity", 0)
      //             tooltipname.style("opacity", 0)
      //             tooltipbox.style("opacity", 0)
      //         })
              node.transition("t6").duration(1000).delay(1000)
              .attr("cx", function(d){return xgeo(d.xcentre)})
              .attr("cy", function(d){return ygeo(d.ycentre)})
              .attr("class", function(d){return typeof(ygeo(d.ycentre))})
              .style("fill", function(d){return d3.interpolateGnBu(chloroscale(1+ d.Total))})
              .style("opacity", 1)


    }
}


var scroller = scrollama();

var $step = d3.selectAll('.step');

function handleStepEnter(response) {

  $step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  update(response.element.getAttribute("stepdata"), response.direction);
  console.log(response);

};


function init() {

  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.6,
      debug: false,
      progress: false
    })
    .onStepEnter(handleStepEnter);

}

init();


// var shapedata1 = d3.superformula()
//                   .type("rectangle")
//                   .size(100)
//                   .segments(360);
//
//
// var mypath1 = svg.selectAll(".mp")
//     .data(data)
//     .enter()
//     .append("path")
//     .attr("class", "myshape")
//     .attr("transform", function(d,i){return "translate(" + i*100 + ",50)"})
//     .attr("d", shapedata1)
//     .on("mouseover", function(){d3.select(this)
//                                   .transition().duration(100)
//                                   .attr("d", shapedata1.type("circle").size(10000))})
//     .on("mouseout", function(){d3.select(this)
//                                   .transition().duration(1000)
//                                   .attr("d", shapedata1.type("rectangle").size(100))});

});
