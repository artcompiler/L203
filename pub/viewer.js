/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright (c) 2015, Jeff Dyer, Art Compiler LLC */
// This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).

window.exports.viewer = (function () {
  function update(el, obj, src, pool) {
    obj = JSON.parse(obj);
    var str;
    var graphs = null;//array of graph objects, rather than a single object full of arrays.
    //in this case I can do this because icicle makes sure all parameters have defaults.
    if (obj.error && obj.error.length > 0) {
      str = "ERROR";
    } else {
      data = obj.data;
      if(!(obj.data instanceof(Array))){
        obj.data = [obj.data];
      }//edge case for a single object because the parser likes to unwrap arrays.
    }
    obj.data.forEach(function (element, index, array) {
      if (typeof element === "object" && element.projection) {
        graphs = element;
      }
    });
    //partition looks for children arrays starting from root and positions and scales based on number of children and their values.
    var svgd = d3.select(el)
    svgd.selectAll("path")
      .remove();//clear each time
    svgd.selectAll("g")
      .remove();
    function styles(selection, these){
      these.forEach(function (p){
        selection
          .style(p.key, p.val);
      });
    }
    var color = d3.scale.ordinal()
      .range(graphs.color);
    var projection = null;
    switch(graphs.projection){
      case "albers":
        projection = d3.geo.albers()
          
        break;
    }
    projection
      .center([graphs.latitude, graphs.longitude])
      .scale(graphs.scale);
    if(graphs.parallels){projection.parallels(graphs.parallels);}
    var path = d3.geo.path()
      .projection(projection);
    var graticule = d3.geo.graticule();
    svgd
      .attr("width", graphs.width)
      .attr("height", graphs.height)
      .style("background-color", "rgb("+graphs.bgcolor.r+","+graphs.bgcolor.g+","+graphs.bgcolor.b+")");
    svgd.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path)
      .style("fill-opacity", 0)
      .style("stroke", "#777")
      .style("stroke-width", 0.5+"px")
      .style("stroke-opacity", 0.5);

    svgd.insert("path", ".graticule")
      .datum(graphs.feature)
      .attr("class", "land")
      .attr("d", path)
      .style("fill", function (d, i) {
        var tt = color(i);
        if(isNaN(tt.a)){tt.a = graphs.opacity;}
        return "rgba("+tt.r+","+tt.g+","+tt.b+","+tt.a+")";
      });
      
    svgd.insert("path", ".graticule")
      .datum(graphs.mesh)
      .attr("class", "boundary")
      .attr("d", path)
      .style("fill-opacity", 0)
      .style("stroke", "rgba("+graphs.bcolor.r+","+graphs.bcolor.g+","+graphs.bcolor.b+","+graphs.bcolor.a+")")
      .style("stroke-width", 0.5+"px");
  }
  function capture(el) {
    var mySVG = $(el).html();
    return mySVG;
  }
  return {
    update: update,
    capture: capture,
  };
})();
