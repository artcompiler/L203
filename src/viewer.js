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

var _reactfauxdom = require("react-faux-dom");

var ReactFauxDOM = _interopRequireWildcard(_reactfauxdom);

window.gcexports.viewer = (function () {
  var Map = React.createClass({
    componentDidMount: function() {
    },

    componentDidUpdate: function(prevProps) {
      var svgd = d3.select(window.gcexports.ReactDOM.findDOMNode(this));
      var data = this.props.data ? this.props.data[0] : null;
      var prevdata = prevProps.data ? prevProps.data[0] : null;
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
        var projection = this.projection(data.projection);
        projection.center(data.center).scale(data.scale).translate([data.width/2, data.height/2]).rotate(data.rotation);
        if(data.parallels){
          projection.parallels(data.parallels);
        }
        var path = d3.geo.path().projection(projection);
        var graticule = d3.geo.graticule();
        var g = svgd.select("g");
        g.select('path.graticule')
          .datum(graticule)
          .attr("d", path);
        if(g.empty()){
          g = svgd.append("g");
          g.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path)
            .style("fill-opacity", 0)
            .style("stroke", "#777")
            .style("stroke-width", 0.5 + "px")
            .style("stroke-opacity", 0.5);
        }
        if(data.title){
          svgd.selectAll("text").remove();
          this.title(svgd, data.title, data.width, data.height);
        }
        var csv = null;
        if(data.csv){
          g.selectAll('g.tooltip').remove();//only time it's easier to reuse is the map.
          csv = {};
          d3.csv.parse(data.csv, function(d) {
            csv[d.id] = d;
            delete csv[d.id].id;
            return null;
          });
          this.setinfo(svgd, g, data, csv);
        }
        if(data.zoom){
          this.zoom(data.zoom, svgd, g);
        }
        if (data.map && (!prevdata || (prevdata.map !== data.map) || g.selectAll('g.land').empty())) {
          g.selectAll("g.land").remove();
          var self = this;
          d3.json(data.map, function(error, json){
            self.draw(error, json, g, data, path, projection, csv);
          });
        } else if (data.tree && (!prevdata || (prevdata.tree !== data.tree) || g.selectAll('g.land').empty())) {
          g.selectAll("g.land").remove();
          var parsedmap = JSON.parse(data.tree);
          this.draw(parsedmap.error, parsedmap, g, data, path, projection, csv);
        } else if(data.tree || data.map){//we have a preexisting map.
          //don't want to just have another function that does some if not all the same things.
          this.draw(null, null, g, data, path, projection, csv);
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
      var h = this.tooltip(t, data.info, csv[id]);
      var tex = t.select("text");
      if(data.dhl){
        tex.selectAll('.rep')
          .attr('x', h[0]);
      }
      var rec = t.select("rect");
      var textwidth = tex.node().getBBox().width;
      var textheight = tex.node().getBBox().height;
      //set the new height and width only in svg; height and width keep being used for the map
      //if it's on the top or left the map needs to be pushed over.
      if(data.info.position){
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
      } else {
        t.style("visibility", "hidden");
      }
      rec
        .attr("height", textheight + 5)
        .attr("width", textwidth + 10)
        .attr("x", -5)
        .attr("stroke", 'grey');
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

    tooltip: function(t, info, csv){
      var tex = t.append("text")
        .attr('fill', function (d) {
          var col = info['font-color'] || info['color'] || info['fill'] || {r: 0, g: 0, b: 0};
          return "rgb(" + col.r + "," + col.g + "," + col.b + ")";
        })
        .style('font-family', info['font-family'] || 'auto')
        .style('font-weight', info['font-weight'] || 'normal')
        .style('font-size', info['font-size'] || 16+'px')
        .style('font-style', info['font-style'] || 'normal')
        .style('text-decoration', info['text-decoration'] || 'none');
      var titlet = tex.append('tspan')
        .text(csv.county_name)
        .attr("alignment-baseline", "before-edge");
      if(info.title){
        titlet
          .attr('fill', function (d) {
            var col = info.title['font-color'] || info.title['color'] || info.title['fill'] || info['font-color'] || info['color'] || info['fill'] || {r: 0, g: 0, b: 0};
            return "rgb(" + col.r + "," + col.g + "," + col.b + ")"; 
          })
          .style('font-family', info.title['font-family'] || info['font-family'] || 'auto')
          .style('font-weight', info.title['font-weight'] || info['font-weight'] || 'normal')
          .style('font-size', info.title['font-size'] || info['font-size'] || 16+'px')
          .style('font-style', info.title['font-style'] || info['font-style'] || 'normal')
          .style('text-decoration', info.title['text-decoration'] || info['text-decoration'] || 'none');
      }
      //first is always equal to titlet.node().getBBox().height
      //second seems to be tem height + dy
      //so to get the real height we just subtract the previous dy
      //so we need to get the second one, keep it, and that's it.
      var h = titlet.node().getBBox().height;
      var h1 = titlet.node().getBBox().height;
      for (var key in csv){//the csv already has the ID
        if(key !== 'county_name' && Object.prototype.hasOwnProperty.call(csv, key)){
          if(tem && h === h1){
            h = tem.node().getBBox().height - (h + 2);
          }
          var tem = tex.append('tspan')
            .attr('class','rep')
            .attr('dy', h)
            .attr('x', 0)
            .data([{name: key, votes: +csv[key]}])
            .attr("alignment-baseline", "before-edge");
          if(key === 'repnopref'){
            tem.text('No Preference: ' + csv[key]);
          } else if (key === 'repother'){
            tem.text('Other: ' + csv[key]);
          } else {
            tem.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + csv[key]);
          }
        }
      }
      return [h, h1];
    },

    draw: function(error, world, g, graphs, path, projection, csv){
      if (error && error.length > 0) return error;
      if(world){
        var dat = world.objects[Object.keys(world.objects)[0]];
        var feat = topojson.feature(world, dat);
      }
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

      var mapp = g.select("g.land");

      if(mapp.empty()){//always removed if the map changed, so we can guarantee this means 'new map'
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
          .append("path");
        var mapp = g.select("g.land");
      }

      mapp.selectAll("path")
        .style("fill", function (d, i) {
          var tt = (self.props.click ? self.props.click[d.id] : null) || graphs.hl[d.id] || color(i);
          if(csv && graphs.dhl && (!self.props.click || !self.props.click[d.id])){
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
          d['color'] = "rgba(" + tt.r + "," + tt.g + "," + tt.b + "," + tt.a + ")";
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
          if(csv){
            var t = g.select('g.tooltip');
            t.style("visibility", "visible");
            t.selectAll("text")
              .remove();
            var h = self.tooltip(t, graphs.info, csv[d.id]);
            var tex = t.select("text");
            if(graphs.info.sorter){
              tex.selectAll('.rep')
                .attr('dy', h[0])
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
                .attr('dy', h[1]);//this should be the first one.
            }
            if(graphs.dhl){//after the sorter so we don't have to deal with moving these around.
              //thanks to h1 and h, we should be able to figure out how to position these.
              tex.selectAll('.rep')
                .attr('x', h[0]);
              t.selectAll('rect.legend')
                .remove();
              var r = tex.selectAll('.rep');
              r.data().forEach(function (element, index){//elements have .name and .votes
                if(graphs.dhl[element.name]){
                  t.append('rect')
                    .attr('class', 'legend')
                    .attr('y', h[1]+h[0]*index + 3)
                    .attr('height', h[0]-4)
                    .attr('width', h[0]-4)
                    .attr('fill', "rgb(" + graphs.dhl[element.name].r + "," + graphs.dhl[element.name].g + "," + graphs.dhl[element.name].b + ")");
                }
              });
            }
          }
        })
        .on("mouseover", function (d, i){
          var fl = d3.rgb(d3.select(this).style('fill'));
          d3.select(this).style('fill', fl.brighter(1));
          if(csv){
            var t = g.select('g.tooltip');
            t.style("visibility", "visible");
            t.selectAll("text")
              .remove();
            var h = self.tooltip(t, graphs.info, csv[d.id]);
            var tex = t.select("text");
            if(graphs.info.sorter){
              tex.selectAll('.rep')
                .attr('dy', h[0])
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
                .attr('dy', h[1]);//this should be the first one.
            }
            if(graphs.dhl){//after the sorter so we don't have to deal with moving these around.
              //thanks to h1 and h, we should be able to figure out how to position these.
              tex.selectAll('.rep')
                .attr('x', h[0]);
              t.selectAll('rect.legend')
                .remove();
              var r = tex.selectAll('.rep');
              r.data().forEach(function (element, index){//elements have .name and .votes
                if(graphs.dhl[element.name]){
                  t.append('rect')
                    .attr('class', 'legend')
                    .attr('y', h[1]+h[0]*index + 3)
                    .attr('height', h[0]-4)
                    .attr('width', h[0]-4)
                    .attr('fill', "rgb(" + graphs.dhl[element.name].r + "," + graphs.dhl[element.name].g + "," + graphs.dhl[element.name].b + ")");
                }
              });
            }
          }
        })
        .on("mousemove", function (d, i){
          var t = g.select('g.tooltip');
          if(t[0][0] && !graphs.info.position){
            var rec = t.select("rect");
            var m = d3.mouse(window.gcexports.ReactDOM.findDOMNode(this));//gets the position relative to the map, which is what we need.
            var tl = [0, 0];
            var br = rec.node().getBBox();
            if(m[0] > graphs.width/2){//it's on the right, put it mouseX from the right
              tl[0] = -br.width + m[0] - 50;
            } else {//it's on the left, put it mouseX from the left
              tl[0] = m[0] + 50;
            }
            if(m[1] > graphs.height/2){//it's on the bottom half, put it mouseY from the bottom
              tl[1] = -br.height + m[1] + 50;
            } else {//it's on the top half, put it mouseY from the top
              tl[1] = m[1] - 50;
            }
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
            t.attr("transform", "translate("+tl+")");
          }
        })
        .on("mouseout", function (d, i){
          d3.select(this).style("fill", function (d, i) {
            return d.color;
          })
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
        }
        if(!data.width){
          data.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          data.width -= 20;
        }
        /*var svg = ReactFauxDOM.createElement('svg');
        var svgd = d3.select(svg)
          .attr('width', data.width)
          .attr('height', data.height)
          .style('background_color', "rgba(" + data.mapstyle.background.r + "," + data.mapstyle.background.g + "," + data.mapstyle.background.b + "," + (data.mapstyle.background.a ? data.mapstyle.background.a : 0) + ")");
        //probably no need to worry about removal given we're creating a new one each time anyway
        //already have data and height - in fact, we're in if(data) already.
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
        console.log(svgd);*/
        return (
          <svg width={data.width} height={data.height} style={{backgroundColor:"rgba(" + data.mapstyle.background.r + "," + data.mapstyle.background.g + "," + data.mapstyle.background.b + "," + (data.mapstyle.background.a ? data.mapstyle.background.a : 0) + ")"}}>
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
