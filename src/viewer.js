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
        if(data.csv){
          var csv = {};
          d3.csv.parse(data.csv, function(d) {
            csv[d.id] = d;
            delete csv[d.id].id;
            return null;
          });
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
      g.append("g")
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
              if(!t[0][0]){
                t = g.append("g")
                  .attr("class","tooltip")
                  .style("pointer-events", "none");
                t.append("rect")
                  .style('fill', function (d) {
                    var col = graphs.info['background'] || {r: 255, g: 255, b: 255};
                    if(!col.a){
                      col.a = 1;
                    }
                    return "rgba(" + col.r + "," + col.g + "," + col.b + "," + col.a + ")";
                  });
              }
              t.style("visibility", "visible")
                .attr("transform", "translate("+path.centroid(d)+")");
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
              tex.append('tspan')
                .text(csv[d.id].county_name);
              /*var lis = [];
              for (var key in csv[d.id]){
                if(key !== 'county_name' && Object.prototype.hasOwnProperty.call(csv[d.id], key)){
                  if(!lis.length || lis[lis.length-1] <= +csv[d.id][key]){
                    var tem = tex.append('tspan')
                      .attr('x', 0)
                      .attr('dy', 20);
                    lis.push(+csv[d.id][key]);
                  } else {//we have a list and this element is smaller than 

                  }
                  if(key === 'repnopref'){
                    tem.text('No Preference: ' + csv[d.id][key]);
                  } else if (key === 'repother'){
                    tem.text('Other: ' + csv[d.id][key]);
                  } else {
                    tem.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + csv[d.id][key]);
                  }
                }
              }*/
              for (var key in csv[d.id]){
                if(key !== 'county_name' && Object.prototype.hasOwnProperty.call(csv[d.id], key)){
                  var tem = tex.append('tspan')
                    .attr('x', 0)
                    .attr('dy', 20);
                  if(key === 'repnopref'){
                    tem.text('No Preference: ' + csv[d.id][key]);
                  } else if (key === 'repother'){
                    tem.text('Other: ' + csv[d.id][key]);
                  } else {
                    tem.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + csv[d.id][key]);
                  }
                }
              }
              tex.selectAll('tspan')
                .attr("alignment-baseline", "before-edge");
              var rec = t.select("rect");
              rec
                .attr("height", tex.node().getBBox().height + 5)
                .attr("width", tex.node().getBBox().width + 10)
                .attr("x", -5)
                .attr("fill", 'white')
                .attr("stroke", 'grey');
            }
          })
          .on("mouseout", function (d, i){
            var t = g.select('g.tooltip');
            if(t[0][0]){
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
