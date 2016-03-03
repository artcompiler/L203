/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright (c) 2015, Jeff Dyer, Art Compiler LLC */
// This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).
"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _assert = require("./assert");

var _topojson = require("topojson");

var topojson = _interopRequireWildcard(_topojson);

var _react = require("react");

var React = _interopRequireWildcard(_react);

window.exports.viewer = (function () {
  var Map = React.createClass({
    componentDidMount: function() {
    },

    componentDidUpdate: function() {
      var svgd = d3.select(window.exports.ReactDOM.findDOMNode(this));
      svgd.selectAll("path").remove(); //clear each time
      svgd.selectAll("g").remove();
      svgd.selectAll("text").remove();
      var data = this.props.data ? this.props.data[0] : null;
      if(data){
        if(!data.height){
          data.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          data.height -= 100;
        }
        if(!data.width){
          data.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          data.width -= 20;
        }
        svgd
          .attr("height", data.height)
          .attr("width", data.width)
          .style("background_color", "rgb(" + data.mapstyle.background.r + "," + data.mapstyle.background.g + "," + data.mapstyle.background.b + ")");
        //do initial tooltip stuff here
        var projection = this.projection(data.projection);
        projection.center(data.center).scale(data.scale).translate([data.width/2, data.height/2]).rotate(data.rotation);
        if(data.parallels){
          projection.parallels(data.parallels);
        }
        var path = d3.geo.path().projection(projection);
        var graticule = d3.geo.graticule();
        var g = svgd.append("g");
        if(data.title){
          this.title(svgd, data.title, data.width, data.height);
        }
        var csv = null;
        if(data.csv){
          csv = {};
          d3.csv.parse(data.csv, function(d) {
            csv[d.id] = d;
            delete csv[d.id].id;
            return null;
          });
          this.setinfo(svgd, g, data, csv);
        }
        g.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path)
          .style("fill-opacity", 0)
          .style("stroke", "#777")
          .style("stroke-width", 0.5 + "px")
          .style("stroke-opacity", 0.5);
        if(data.zoom){
          this.zoom(data.zoom, svgd, g);
        }
        if (data.map) {
          var self = this;
          d3.json(data.map, function(error, json){
            self.draw(error, json, g, data, path, projection, csv);
          });
        } else if (data.tree) {
          var parsedmap = JSON.parse(data.tree);
          this.draw(parsedmap.error, parsedmap, g, data, path, projection, csv);
        }
      }
    },

    setinfo: function(svgd, g, data, csv){//tooltip does not exist
      var t = g.append("g")
        .attr("class","tooltip")
        .style("pointer-events", "none");
      t.append("rect")
        .style('fill', function (d) {
          var col = data.info['background'] || {r: 255, g: 255, b: 255};
          if(!col.a){
            col.a = 100;
          }
          return "rgba(" + col.r + "," + col.g + "," + col.b + "," + col.a + ")";
        });
      if(data.info.position){//not a tooltip
        var largest = [0, 0];
        Object.keys(csv).forEach(function (id){//for each ID location
          Object.keys(csv[id]).forEach(function (element){//for each element in that ID location
            if(element === "county_name"){
              if(csv[id][element].length > largest[1]){//if it's larger replace
                largest[0] = id;
                largest[1] = csv[id][element].length;
              }
            } else {
              var str = element+': '+csv[id][element];
              if(str.length > largest[1]){
                largest[0] = id;
                largest[1] = str.length;
              }
            }
          });
        });//we know which one has the highest width now (largest[0])
        var id = largest[0];
        var tex = t.append("text")
          .attr('fill', function (d) {
            return "rgba(255,255,255,0)";
          })
          .style('font-family', data.info['font-family'] || 'auto')
          .style('font-weight', data.info['font-weight'] || 'normal')
          .style('font-size', data.info['font-size'] || 16+'px')
          .style('font-style', data.info['font-style'] || 'normal')
          .style('text-decoration', data.info['text-decoration'] || 'none');
        var titlet = tex.append('tspan')
          .text(csv[id].county_name)
          .attr("alignment-baseline", "before-edge");
        if(data.info.title){
          titlet
            .style('font-family', data.info.title['font-family'] || data.info['font-family'] || 'auto')
            .style('font-weight', data.info.title['font-weight'] || data.info['font-weight'] || 'normal')
            .style('font-size', data.info.title['font-size'] || data.info['font-size'] || 16+'px')
            .style('font-style', data.info.title['font-style'] || data.info['font-style'] || 'normal')
            .style('text-decoration', data.info.title['text-decoration'] || data.info['text-decoration'] || 'none');
        }
        var h = titlet.node().getBBox().height;
        var h1 = titlet.node().getBBox().height;
        for (var key in csv[id]){
          if(key !== 'county_name' && Object.prototype.hasOwnProperty.call(csv[id], key)){
            if(tem && h === h1){
              h = tem.node().getBBox().height - (h + 2);
            }
            var tem = tex.append('tspan')
              .attr('class','rep')
              .attr('x', 0)
              .attr('dy', h)
              .data([{name: key, votes: +csv[id][key]}])
              .attr("alignment-baseline", "before-edge");
            if(key === 'repnopref'){
              tem.text('No Preference: ' + csv[id][key]);
            } else if (key === 'repother'){
              tem.text('Other: ' + csv[id][key]);
            } else {
              tem.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + csv[id][key]);
            }
          }
        }
        var rec = t.select("rect");
        var textwidth = tex.node().getBBox().width;
        var textheight = tex.node().getBBox().height;
        //set the new height and width only in svg; height and width keep being used for the map
        //if it's on the top or left the map needs to be pushed over.
        if(data.info.position < 3){//top or bottom
          svgd
            .attr("height", data.height + textheight + 5);
          if(data.info.position === 1){//push it down
            svgd.selectAll('g')
              .attr("transform", "translate("+[0, (textheight+5)]+")");
            svgd.selectAll('text')
              .attr("transform", "translate("+[0, (textheight+5)]+")");
            t.attr("transform", "translate("+[(data.width-(textwidth+10))/2, -(textheight+5)]+")");
          } else {
            t.attr("transform", "translate("+[(data.width-(textwidth+10))/2, data.height]+")"); 
          }
        } else {//we know it exists so we just need 'not top or bottom'
          svgd
            .attr("width", data.width + textwidth + 10);
          if(data.info.position === 4){//push it right
            svgd.selectAll('g')
              .attr("transform", "translate("+[(textwidth+10), 0]+")");
            svgd.selectAll('text')
              .attr("transform", "translate("+[(textwidth+10), 0]+")");
            t.attr("transform", "translate("+[-(textwidth+10), (data.height-(textheight+5))/2]+")");
          } else {
            t.attr("transform", "translate("+[data.width, (data.height-(textheight+5))/2]+")");
          }
        }
        rec
          .attr("height", textheight + 5)
          .attr("width", textwidth + 10)
          .attr("x", -5)
          .attr("stroke", 'grey');
      }
    },

    projection: function(projection){
      switch (projection) {
        case "albers":
          return d3.geo.albers();
          break;
        case "azimuthal equal area":
          return d3.geo.azimuthalEqualArea().clipAngle(180 - 1e-3);
          break;
        case "azimuthal equidistant":
          return d3.geo.azimuthalEquidistant().clipAngle(180 - 1e-3);
          break;
        case "conic conformal":
          return d3.geo.conicConformal();
          break;
        case "conic equal area":
          return d3.geo.conicEqualArea();
          break;
        case "conic equidistant":
          return d3.geo.conicEquidistant();
          break;
        case "equirectangular":
          return d3.geo.equirectangular();
          break;
        case "gnomonic":
          return d3.geo.gnomonic().clipAngle(90 - 1e-3);
          break;
        case "mercator":
          return d3.geo.mercator();
          break;
        case "transverse mercator":
          return d3.geo.transverseMercator();
          break;
        case "orthographic":
          return d3.geo.orthographic().clipAngle(90);
          break;
        case "stereographic":
          return d3.geo.stereographic().clipAngle(180 - 1e-4).clipExtent([[0, 0], [graphs.width, graphs.height]]);
          break;
      }
    },

    title: function(svgd, title, width, height){
      var theight = 0;
      var twidth = 0;
      if(!title.pos){
        title.pos = ['top', 'middle'];
      }
      svgd.append("text")
        .text(title.text)
        .attr('fill', function (d) {
          var col = title['font-color'] || title['color'] || title['fill'] || {r: 0, g: 0, b: 0};
          return "rgb(" + col.r + "," + col.g + "," + col.b + ")";
        })
        .style('font-family', title['font-family'] || 'auto')
        .style('font-weight', title['font-weight'] || 'bold')
        .style('font-size', title['font-size'] || 40+'px')
        .style('font-style', title['font-style'] || 'normal')
        .style('text-decoration', title['text-decoration'] || 'none')
        .style("text-anchor", title.pos[1])
        .each(function () {
          var b = this.getBBox();
          theight = b.height;
          twidth = b.width;
        })
        .attr("x", function () {
          switch (title.pos[1]) {
            case "start":
              return 0;
            case "middle":
              return width / 2;
            case "end":
              return width;
          }
        })
        .attr("y", function () {
        switch (title.pos[0]) {
          case "top":
            return theight;
          case "middle":
            return (height + theight) / 2;
          case "bottom":
            return height;
        }
        });
    },

    zoom: function(zoomamount, svgd, g){
      var zoomed = function zoomed() {
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        svgd.selectAll(".points").attr("r", function (d) {
          return d.size / d3.event.scale;
        }).style("stroke-width", 2 / d3.event.scale + "px");
        svgd.selectAll(".route").style("stroke-width", function (d) {
          return d.size / d3.event.scale + "px";
        });
        svgd.selectAll(".text").attr("y", 10 / d3.event.scale).style("font", 11 / d3.event.scale + "px sans-serif");
      };

      var zoom = d3.behavior.zoom().scaleExtent(zoomamount).on("zoom", zoomed);
      svgd.call(zoom).call(zoom.event);
    },

    draw: function(error, world, g, graphs, path, projection, csv){
      //things that need replacing:
      //props: graphs.color, graphs.opacity, graphs.bcolor (border)
      if (error && error.length > 0) return error;
      var dat = world.objects[Object.keys(world.objects)[0]];
      var feat = topojson.feature(world, dat);
      var color = d3.scale.ordinal().range(graphs.mapstyle.color);
      function coordcheck(elt, index) {//only used in here.
        //finds all the coordinate pairs in the mess of arrays.
        if (elt.length == 2 && !isNaN(elt[0]) && !isNaN(elt[1])) {
          //actual coordinates
          return elt[0] >= graphs.limits[0][0] && elt[0] <= graphs.limits[0][1] && elt[1] >= graphs.limits[1][0] && elt[1] <= graphs.limits[1][1]; //compare to min and max for long and lat
        } else if (elt instanceof Array) {
          //just a sanity check so we don't break things
          return elt.some(coordcheck);
        }
      }
      self = this;
      g.insert("g", 'g.tooltip')
        .attr("class", "land")
        .selectAll("path").data(feat.features, function (d, i) {
          if (graphs.limits) {
            if (d.geometry.coordinates.some(coordcheck)) {
              return i;
            } else {
              return null;
            }
          } else {
            return i;
          }
        }).enter()
        .append("path")
          .style("fill", function (d, i) {
            var tt = (self.props.click ? self.props.click[d.id] : null) || graphs.hl[d.id] || color(i);
            if(csv && graphs.dhl){
              var max = [null, 0];
              for(var key in csv[d.id]){
                if(key !== 'county_name' && Object.prototype.hasOwnProperty.call(csv[d.id], key)){
                  if(+csv[d.id][key] > max[1]){//highest votes so far
                    max[0] = key;
                    max[1] = +csv[d.id][key];
                  }
                }
              }
              if(graphs.dhl[max[0]]){
                tt = graphs.dhl[max[0]];
              }
            }
            if (isNaN(tt.a)) {
              tt.a = graphs.mapstyle.opacity;
            }
            return "rgba(" + tt.r + "," + tt.g + "," + tt.b + "," + tt.a + ")";
          })
          .style("stroke", "rgba(" + graphs.borders.color.r + "," + graphs.borders.color.g + "," + graphs.borders.color.b + "," + graphs.borders.color.a + ")")
          .style("stroke-width", graphs.borders.thickness || 0.5)
          .attr("d", path)
          .on("click", function (d, i) {
            if (graphs.chl.length) {
              var click = {};
              var tt = graphs.chl[d.id] || graphs.chl[0] || prev;
              if (isNaN(tt.a)) {
                tt.a = graphs.mapstyle.opacity;
              }
              click[d.id] = tt;
              window.dispatcher.dispatch({
                data: {
                  click: click
                }
              });
            }
          })
          .on("mouseover", function (d, i){
            if(csv){
              var t = g.select('g.tooltip');
              t.style("visibility", "visible");
              if(!graphs.info.position){//it should already be in position otherwise
                t.attr("transform", "translate("+path.centroid(d)+")");
              }
              t.selectAll("text")
                .remove();
              var tex = t.append("text")
                .attr('fill', function (d) {
                  var col = graphs.info['font-color'] || graphs.info['color'] || graphs.info['fill'] || {r: 0, g: 0, b: 0};
                  return "rgb(" + col.r + "," + col.g + "," + col.b + ")";
                })
                .style('font-family', graphs.info['font-family'] || 'auto')
                .style('font-weight', graphs.info['font-weight'] || 'normal')
                .style('font-size', graphs.info['font-size'] || 16+'px')
                .style('font-style', graphs.info['font-style'] || 'normal')
                .style('text-decoration', graphs.info['text-decoration'] || 'none');
              var titlet = tex.append('tspan')
                .text(csv[d.id].county_name)
                .attr("alignment-baseline", "before-edge");
              if(graphs.info.title){
                titlet
                  .attr('fill', function (d) {
                    var col = graphs.info.title['font-color'] || graphs.info.title['color'] || graphs.info.title['fill'] || graphs.info['font-color'] || graphs.info['color'] || graphs.info['fill'] || {r: 0, g: 0, b: 0};
                    return "rgb(" + col.r + "," + col.g + "," + col.b + ")"; 
                  })
                  .style('font-family', graphs.info.title['font-family'] || graphs.info['font-family'] || 'auto')
                  .style('font-weight', graphs.info.title['font-weight'] || graphs.info['font-weight'] || 'normal')
                  .style('font-size', graphs.info.title['font-size'] || graphs.info['font-size'] || 16+'px')
                  .style('font-style', graphs.info.title['font-style'] || graphs.info['font-style'] || 'normal')
                  .style('text-decoration', graphs.info.title['text-decoration'] || graphs.info['text-decoration'] || 'none');
              }
              //first is always equal to titlet.node().getBBox().height
              //second seems to be tem height + dy
              //so to get the real height we just subtract the previous dy
              //so we need to get the second one, keep it, and that's it.
              var h = titlet.node().getBBox().height;
              var h1 = titlet.node().getBBox().height;
              for (var key in csv[d.id]){
                if(key !== 'county_name' && Object.prototype.hasOwnProperty.call(csv[d.id], key)){
                  if(tem && h === h1){
                    h = tem.node().getBBox().height - (h + 2);
                  }
                  var tem = tex.append('tspan')
                    .attr('class','rep')
                    .attr('x', graphs.dhl ? 10 : 0)
                    .attr('dy', h)
                    .data([{name: key, votes: +csv[d.id][key]}])
                    .attr("alignment-baseline", "before-edge");
                  if(key === 'repnopref'){
                    tem.text('No Preference: ' + csv[d.id][key]);
                  } else if (key === 'repother'){
                    tem.text('Other: ' + csv[d.id][key]);
                  } else {
                    tem.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + csv[d.id][key]);
                  }
                }
              }
              if(graphs.info.sorter){
                tex.selectAll('.rep')
                  .attr('dy', h)
                  .sort(function (a, b){
                    if(isNaN(a[graphs.info.sorter])){
                      var s = b[graphs.info.sorter].localeCompare(a[graphs.info.sorter]);
                    } else {
                      var s = b[graphs.info.sorter] - a[graphs.info.sorter];
                    }
                    if(graphs.info.order){
                      return (-1)*s;
                    } else {
                      return s;
                    }
                  });
                tex.select('.rep')
                  .attr('dy', h1);//this should be the first one.
              }
              if(graphs.dhl){//after the sorter so we don't have to deal with moving these around.
                //thanks to h1 and h, we should be able to figure out how to position these.
                t.selectAll('rect.legend')
                  .remove();
                var r = tex.selectAll('.rep');
                r.data().forEach(function (element, index){//elements have .name and .votes
                  if(graphs.dhl[element.name]){
                    t.append('rect')
                      .attr('class', 'legend')
                      .attr('y', h1+h*index + h/2 - 5/2)
                      .attr('height', 5)
                      .attr('width', 5)
                      .attr('fill', "rgb(" + graphs.dhl[element.name].r + "," + graphs.dhl[element.name].g + "," + graphs.dhl[element.name].b + ")");
                  }
                });
              }
              if(!graphs.info.position){//in the tooltip case the size can change
                var rec = t.select("rect");
                rec
                  .attr("height", tex.node().getBBox().height + 5)
                  .attr("width", tex.node().getBBox().width + 10)
                  .attr("x", -5)
                  .attr("stroke", 'grey');
                //check each corner
                //top left is path.centroid(d) with x - 5
                //other corners are found by adding bbox.width or bbox.height to top left
                var tl = path.centroid(d);
                tl[0] -= 5;
                var br = rec.node().getBBox();
                console.log(tl);
                //compare to 0, graphs.width, and graphs.height
                if(0 > tl[0]){
                  tl[0] = 0;//just shift it into frame
                } else if(graphs.width < tl[0]+br.width){
                  //calculate the new location
                  var diff = tl[0]+br.width - graphs.width;//how far the far edge is off the map
                  tl[0] -= diff;
                }
                if(0 > tl[1]){
                  tl[1] = 0;
                } else if(graphs.height < tl[1]+br.height){
                  var diff = tl[1]+br.height - graphs.height;
                  tl[1] -= diff;
                }
                tl[0] += 5;
                console.log(tl);
                t.attr("transform", "translate("+tl+")");
              }
            }
          })
          .on("mouseout", function (d, i){
            var t = g.select('g.tooltip');
            if(t[0][0] && !graphs.info.position){
              t.style("visibility", "hidden");
            }
          });
      if(graphs.lines){
        var linegroup = g.append("g");
        linegroup.selectAll("g").data(graphs.lines).enter().append("path")
          .attr("class", "route")
          .attr("d", path)
          .style("fill", "none")
          .style("stroke", function (d) {
            return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")";
          })
          .style("stroke-opacity", function (d) {
            return isNaN(d.color.a) ? 1 : d.color.a;
          })
          .style("stroke-width", function (d) {
            return d.size + "px";
          });
        graphs.lines.forEach(function (element) {
          linegroup.selectAll("g").data(element.coordinates).enter().append("circle")
            .attr("class", "points")
            .attr("transform", function (d) {
              return "translate(" + projection(d) + ")";
            })
            .attr("r", function (d, i) {
              d.size = element.pointsize[i];return d.size;
            })
            .style("fill", function (d, i) {
              var c = element.pointcolor[i];
              return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
            })
            .style("stroke", function (d, i) {
              var c = element.pointcolor[i];
              return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
            })
            .style("opacity", function (d, i) {
              var a = isNaN(element.pointcolor[i].a) ? 1 : element.pointcolor[i].a;
              return a;
            })
            .style("stroke-width", "2px");
          linegroup.selectAll("g").data(element.coordinates).enter().append("text")
            .attr("class", "text").attr("transform", function (d) {
              return "translate(" + projection(d) + ")";
            })
            .attr("y", 10).attr("dy", ".71em").text(function (d, i) {
              return element.pointlabel[i];
            })
            .style("text-anchor", "middle").style("font", "11px sans-serif");
        });
      }
      if(graphs.points){
        var pointgroup = g.append("g");
        pointgroup.selectAll("g").data(graphs.points).enter().append("circle")
          .attr("class", "points")
          .attr("transform", function (d) {
            return "translate(" + projection([d.lon, d.lat]) + ")";
          })
          .attr("r", function (d) {
            return d.size;
          })
          .style("fill", function (d) {
            return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")";
          })
          .style("stroke", function (d) {
            return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")";
          })
          .style("opacity", function (d) {
            return isNaN(d.color.a) ? 1 : d.color.a;
          })
          .style("stroke-width", "2px");
        pointgroup.selectAll("g").data(graphs.points).enter().append("text")
          .attr("class", "text").attr("transform", function (d) {
            return "translate(" + projection([d.lon, d.lat]) + ")";
          })
          .attr("y", 10).attr("dy", ".71em").text(function (d) {
            return d.label;
          })
          .style("text-anchor", "middle").style("font", "11px sans-serif");
      }
    },

    render: function () {
      var data = this.props.data ? this.props.data[0] : null;
      if(data){
        if(!data.height){
          data.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          data.height -= 100;
          if(data.csv && data.info && data.info.position && data.info.position < 3){//top or bottom
            var csv = {};
            d3.csv.parse(data.csv, function(d) {
              csv[d.id] = d;
              delete csv[d.id].id;
              return null;
            });//render the set with the longest line - if not for the height we still need the width stable
            var largest = [0, 0];
            Object.keys(csv).forEach(function (id){//for each ID location
              Object.keys(csv[id]).forEach(function (element){//for each element in that ID location
                if(element === "county_name"){
                  if(csv[id][element].length > largest[1]){//if it's larger replace
                    largest[0] = id;
                    largest[1] = csv[id][element].length;
                  }
                } else {
                  var str = element+': '+csv[id][element];
                  if(str.length > largest[1]){
                    largest[0] = id;
                    largest[1] = str.length;
                  }
                }
              });
            });//we now know which id to render
            //the question now is how to make it render to get the width and height
          }
        }
        if(!data.width){
          data.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          data.width -= 20;
          if(data.csv && data.info && data.info.position >= 3){//left or right
            var csv = {};
            d3.csv.parse(data.csv, function(d) {
              csv[d.id] = d;
              delete csv[d.id].id;
              return null;
            });

          }
        }
        return (
          <svg width={data.width} height={data.height} style={{backgroundColor:"rgb(" + data.mapstyle.background.r + "," + data.mapstyle.background.g + "," + data.mapstyle.background.b + ")"}}>
          </svg>
        );
      } else {
        return (
          <div>"Loading or suffering an error, wait if applicable."</div>
        );
      }
    }
  });

  function capture(el) {
    var mySVG = $(el).html();
    return mySVG;
  }
  return {
    capture: capture,
    Viewer: Map
  };
})();
