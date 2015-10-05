(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function() {
  var topojson = {
    version: "1.6.19",
    mesh: function(topology) { return object(topology, meshArcs.apply(this, arguments)); },
    meshArcs: meshArcs,
    merge: function(topology) { return object(topology, mergeArcs.apply(this, arguments)); },
    mergeArcs: mergeArcs,
    feature: featureOrCollection,
    neighbors: neighbors,
    presimplify: presimplify
  };

  function stitchArcs(topology, arcs) {
    var stitchedArcs = {},
        fragmentByStart = {},
        fragmentByEnd = {},
        fragments = [],
        emptyIndex = -1;

    // Stitch empty arcs first, since they may be subsumed by other arcs.
    arcs.forEach(function(i, j) {
      var arc = topology.arcs[i < 0 ? ~i : i], t;
      if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
        t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
      }
    });

    arcs.forEach(function(i) {
      var e = ends(i),
          start = e[0],
          end = e[1],
          f, g;

      if (f = fragmentByEnd[start]) {
        delete fragmentByEnd[f.end];
        f.push(i);
        f.end = end;
        if (g = fragmentByStart[end]) {
          delete fragmentByStart[g.start];
          var fg = g === f ? f : f.concat(g);
          fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else if (f = fragmentByStart[end]) {
        delete fragmentByStart[f.start];
        f.unshift(i);
        f.start = start;
        if (g = fragmentByEnd[start]) {
          delete fragmentByEnd[g.end];
          var gf = g === f ? f : g.concat(f);
          fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
        } else {
          fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
        }
      } else {
        f = [i];
        fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
      }
    });

    function ends(i) {
      var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
      if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
      else p1 = arc[arc.length - 1];
      return i < 0 ? [p1, p0] : [p0, p1];
    }

    function flush(fragmentByEnd, fragmentByStart) {
      for (var k in fragmentByEnd) {
        var f = fragmentByEnd[k];
        delete fragmentByStart[f.start];
        delete f.start;
        delete f.end;
        f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
        fragments.push(f);
      }
    }

    flush(fragmentByEnd, fragmentByStart);
    flush(fragmentByStart, fragmentByEnd);
    arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

    return fragments;
  }

  function meshArcs(topology, o, filter) {
    var arcs = [];

    if (arguments.length > 1) {
      var geomsByArc = [],
          geom;

      function arc(i) {
        var j = i < 0 ? ~i : i;
        (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
      }

      function line(arcs) {
        arcs.forEach(arc);
      }

      function polygon(arcs) {
        arcs.forEach(line);
      }

      function geometry(o) {
        if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
        else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
      }

      var geometryType = {
        LineString: line,
        MultiLineString: polygon,
        Polygon: polygon,
        MultiPolygon: function(arcs) { arcs.forEach(polygon); }
      };

      geometry(o);

      geomsByArc.forEach(arguments.length < 3
          ? function(geoms) { arcs.push(geoms[0].i); }
          : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
    } else {
      for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
    }

    return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
  }

  function mergeArcs(topology, objects) {
    var polygonsByArc = {},
        polygons = [],
        components = [];

    objects.forEach(function(o) {
      if (o.type === "Polygon") register(o.arcs);
      else if (o.type === "MultiPolygon") o.arcs.forEach(register);
    });

    function register(polygon) {
      polygon.forEach(function(ring) {
        ring.forEach(function(arc) {
          (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
        });
      });
      polygons.push(polygon);
    }

    function exterior(ring) {
      return cartesianRingArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]) > 0; // TODO allow spherical?
    }

    polygons.forEach(function(polygon) {
      if (!polygon._) {
        var component = [],
            neighbors = [polygon];
        polygon._ = 1;
        components.push(component);
        while (polygon = neighbors.pop()) {
          component.push(polygon);
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
                if (!polygon._) {
                  polygon._ = 1;
                  neighbors.push(polygon);
                }
              });
            });
          });
        }
      }
    });

    polygons.forEach(function(polygon) {
      delete polygon._;
    });

    return {
      type: "MultiPolygon",
      arcs: components.map(function(polygons) {
        var arcs = [];

        // Extract the exterior (unique) arcs.
        polygons.forEach(function(polygon) {
          polygon.forEach(function(ring) {
            ring.forEach(function(arc) {
              if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
                arcs.push(arc);
              }
            });
          });
        });

        // Stitch the arcs into one or more rings.
        arcs = stitchArcs(topology, arcs);

        // If more than one ring is returned,
        // at most one of these rings can be the exterior;
        // this exterior ring has the same winding order
        // as any exterior ring in the original polygons.
        if ((n = arcs.length) > 1) {
          var sgn = exterior(polygons[0][0]);
          for (var i = 0, t; i < n; ++i) {
            if (sgn === exterior(arcs[i])) {
              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t;
              break;
            }
          }
        }

        return arcs;
      })
    };
  }

  function featureOrCollection(topology, o) {
    return o.type === "GeometryCollection" ? {
      type: "FeatureCollection",
      features: o.geometries.map(function(o) { return feature(topology, o); })
    } : feature(topology, o);
  }

  function feature(topology, o) {
    var f = {
      type: "Feature",
      id: o.id,
      properties: o.properties || {},
      geometry: object(topology, o)
    };
    if (o.id == null) delete f.id;
    return f;
  }

  function object(topology, o) {
    var absolute = transformAbsolute(topology.transform),
        arcs = topology.arcs;

    function arc(i, points) {
      if (points.length) points.pop();
      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
        points.push(p = a[k].slice());
        absolute(p, k);
      }
      if (i < 0) reverse(points, n);
    }

    function point(p) {
      p = p.slice();
      absolute(p, 0);
      return p;
    }

    function line(arcs) {
      var points = [];
      for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
      if (points.length < 2) points.push(points[0].slice());
      return points;
    }

    function ring(arcs) {
      var points = line(arcs);
      while (points.length < 4) points.push(points[0].slice());
      return points;
    }

    function polygon(arcs) {
      return arcs.map(ring);
    }

    function geometry(o) {
      var t = o.type;
      return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
          : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
          : null;
    }

    var geometryType = {
      Point: function(o) { return point(o.coordinates); },
      MultiPoint: function(o) { return o.coordinates.map(point); },
      LineString: function(o) { return line(o.arcs); },
      MultiLineString: function(o) { return o.arcs.map(line); },
      Polygon: function(o) { return polygon(o.arcs); },
      MultiPolygon: function(o) { return o.arcs.map(polygon); }
    };

    return geometry(o);
  }

  function reverse(array, n) {
    var t, j = array.length, i = j - n; while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
  }

  function bisect(a, x) {
    var lo = 0, hi = a.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function neighbors(objects) {
    var indexesByArc = {}, // arc index -> array of object indexes
        neighbors = objects.map(function() { return []; });

    function line(arcs, i) {
      arcs.forEach(function(a) {
        if (a < 0) a = ~a;
        var o = indexesByArc[a];
        if (o) o.push(i);
        else indexesByArc[a] = [i];
      });
    }

    function polygon(arcs, i) {
      arcs.forEach(function(arc) { line(arc, i); });
    }

    function geometry(o, i) {
      if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
      else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
    }

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
    };

    objects.forEach(geometry);

    for (var i in indexesByArc) {
      for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
        for (var k = j + 1; k < m; ++k) {
          var ij = indexes[j], ik = indexes[k], n;
          if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
          if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
        }
      }
    }

    return neighbors;
  }

  function presimplify(topology, triangleArea) {
    var absolute = transformAbsolute(topology.transform),
        relative = transformRelative(topology.transform),
        heap = minAreaHeap();

    if (!triangleArea) triangleArea = cartesianTriangleArea;

    topology.arcs.forEach(function(arc) {
      var triangles = [],
          maxArea = 0,
          triangle;

      // To store each point’s effective area, we create a new array rather than
      // extending the passed-in point to workaround a Chrome/V8 bug (getting
      // stuck in smi mode). For midpoints, the initial effective area of
      // Infinity will be computed in the next step.
      for (var i = 0, n = arc.length, p; i < n; ++i) {
        p = arc[i];
        absolute(arc[i] = [p[0], p[1], Infinity], i);
      }

      for (var i = 1, n = arc.length - 1; i < n; ++i) {
        triangle = arc.slice(i - 1, i + 2);
        triangle[1][2] = triangleArea(triangle);
        triangles.push(triangle);
        heap.push(triangle);
      }

      for (var i = 0, n = triangles.length; i < n; ++i) {
        triangle = triangles[i];
        triangle.previous = triangles[i - 1];
        triangle.next = triangles[i + 1];
      }

      while (triangle = heap.pop()) {
        var previous = triangle.previous,
            next = triangle.next;

        // If the area of the current point is less than that of the previous point
        // to be eliminated, use the latter's area instead. This ensures that the
        // current point cannot be eliminated without eliminating previously-
        // eliminated points.
        if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
        else maxArea = triangle[1][2];

        if (previous) {
          previous.next = next;
          previous[2] = triangle[2];
          update(previous);
        }

        if (next) {
          next.previous = previous;
          next[0] = triangle[0];
          update(next);
        }
      }

      arc.forEach(relative);
    });

    function update(triangle) {
      heap.remove(triangle);
      triangle[1][2] = triangleArea(triangle);
      heap.push(triangle);
    }

    return topology;
  };

  function cartesianRingArea(ring) {
    var i = -1,
        n = ring.length,
        a,
        b = ring[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = ring[i];
      area += a[0] * b[1] - a[1] * b[0];
    }

    return area * .5;
  }

  function cartesianTriangleArea(triangle) {
    var a = triangle[0], b = triangle[1], c = triangle[2];
    return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
  }

  function compareArea(a, b) {
    return a[1][2] - b[1][2];
  }

  function minAreaHeap() {
    var heap = {},
        array = [],
        size = 0;

    heap.push = function(object) {
      up(array[object._ = size] = object, size++);
      return size;
    };

    heap.pop = function() {
      if (size <= 0) return;
      var removed = array[0], object;
      if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
      return removed;
    };

    heap.remove = function(removed) {
      var i = removed._, object;
      if (array[i] !== removed) return; // invalid request
      if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
      return i;
    };

    function up(object, i) {
      while (i > 0) {
        var j = ((i + 1) >> 1) - 1,
            parent = array[j];
        if (compareArea(object, parent) >= 0) break;
        array[parent._ = i] = parent;
        array[object._ = i = j] = object;
      }
    }

    function down(object, i) {
      while (true) {
        var r = (i + 1) << 1,
            l = r - 1,
            j = i,
            child = array[j];
        if (l < size && compareArea(array[l], child) < 0) child = array[j = l];
        if (r < size && compareArea(array[r], child) < 0) child = array[j = r];
        if (j === i) break;
        array[child._ = i] = child;
        array[object._ = i = j] = object;
      }
    }

    return heap;
  }

  function transformAbsolute(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      point[0] = (x0 += point[0]) * kx + dx;
      point[1] = (y0 += point[1]) * ky + dy;
    };
  }

  function transformRelative(transform) {
    if (!transform) return noop;
    var x0,
        y0,
        kx = transform.scale[0],
        ky = transform.scale[1],
        dx = transform.translate[0],
        dy = transform.translate[1];
    return function(point, i) {
      if (!i) x0 = y0 = 0;
      var x1 = (point[0] - dx) / kx | 0,
          y1 = (point[1] - dy) / ky | 0;
      point[0] = x1 - x0;
      point[1] = y1 - y0;
      x0 = x1;
      y0 = y1;
    };
  }

  function noop() {}

  if (typeof define === "function" && define.amd) define(topojson);
  else if (typeof module === "object" && module.exports) module.exports = topojson;
  else this.topojson = topojson;
}();

},{}],2:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/*
 * Copyright 2013 Art Compiler LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/*
  ASSERTS AND MESSAGES
  We use the 'assert()' function to trap invalid states of all kinds. External
  messages are distinguished from internal messages by a numeric prefix that
  indicates the error code associated with the message. For example, the
  following two asserts implement an internal and external assert, respectively.
     assert(false, "This code is broken.");
     assert(false, "1001: Invalid user input.");
  To aid in the writing of external messages, we keep them in a single global
  table named 'messages'. Each module adds to this table its own messages
  with an expression such as
     messages[1001] = "Invalid user input.";
  These messages are accessed with the 'message' function as such
     message(1001);
  Calling 'assert' with 'message' looks like
     assert(x != y, message(1001));
  ALLOCATING ERROR CODES
  In order to avoid error code conflicts, each module claims a range of values
  that is not already taken by the modules in the same system. A module claims
  a range of codes by calling the function reserveCodeRange() like this:
     reserveCodeRange(1000, 1999, "mymodule");
  If the requested code range has any values that are already reserved, then
  an assertion is raised.
  USAGE
  In general, only allocate message codes for external asserts. For internal
  asserts, it is sufficient to simply inline the message text in the assert
  expression.
  It is good to write an assert for every undefined state, regardless of whether
  it is the result of external input or not. Asserts can then be externalized if
  and when they it is clear that they are the result of external input.
  A client module can override the messages provided by the libraries it uses by
  simply redefining those messages after the defining library is loaded. That is,
  the client can copy and past the statements of the form
     messages[1001] = "Invalid user input.";
  and provide new text for the message.
     messages[1001] = "Syntax error.";
  In the same way different sets of messages can be overridden for the purpose
  of localization.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
var location = "";
var messages = {};
var reservedCodes = [];
var ASSERT = true;
var assert = (function () {
  return !ASSERT ? function () {} : function (val, str) {
    if (str === void 0) {
      str = "failed!";
    }
    if (!val) {
      var err = new Error(str);
      err.location = location;
      throw err;
    }
  };
})();

var message = function message(errorCode, args) {
  var str = messages[errorCode];
  if (args) {
    args.forEach(function (arg, i) {
      str = str.replace("%" + (i + 1), arg);
    });
  }
  return errorCode + ": " + str;
};

var reserveCodeRange = function reserveCodeRange(first, last, moduleName) {
  assert(first <= last, "Invalid code range");
  var noConflict = reservedCodes.every(function (range) {
    return last < range.first || first > range.last;
  });
  assert(noConflict, "Conflicting request for error code range");
  reservedCodes.push({ first: first, last: last, name: moduleName });
};

var setLocation = function setLocation(location) {
  //assert(location, "Empty location");
  location = loc;
};

var clearLocation = function clearLocation() {
  location = null;
};

var setCounter = function setCounter(n, message) {
  count = n;
  countMessage = message ? message : "ERROR count exceeded";
};

var checkCounter = function checkCounter() {
  if (typeof count !== "number" || isNaN(count)) {
    assert(false, "ERROR counter not set");
    return;
  }
  assert(count--, countMessage);
};

exports.assert = assert;
exports.message = message;
exports.messages = messages;
exports.reserveCodeRange = reserveCodeRange;

},{}],3:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright (c) 2015, Jeff Dyer, Art Compiler LLC */
// This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).
"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _assert = require("./assert");

var _topojson = require("topojson");

var topojson = _interopRequireWildcard(_topojson);

//import * as http from "http";

window.exports.viewer = (function () {
  function update(el, obj, src, pool) {
    obj = JSON.parse(obj);
    var str;
    var graphs = null; //array of graph objects, rather than a single object full of arrays.
    //in this case I can do this because icicle makes sure all parameters have defaults.
    if (obj.error && obj.error.length > 0) {
      str = "ERROR";
    } else {
      if (!(obj.data instanceof Array)) {
        obj.data = [obj.data];
      } //edge case for a single object because the parser likes to unwrap arrays.
    }
    obj.data.forEach(function (element, index, array) {
      if (typeof element === "object" && element.projection) {
        graphs = element;
      }
    });
    //partition looks for children arrays starting from root and positions and scales based on number of children and their values.
    var svgd = d3.select(el);
    svgd.selectAll("path").remove(); //clear each time
    svgd.selectAll("g").remove();
    function styles(selection, these) {
      these.forEach(function (p) {
        selection.style(p.key, p.val);
      });
    }
    var color = d3.scale.ordinal().range(graphs.color);
    var projection = null;
    switch (graphs.projection) {
      case "albers":
        projection = d3.geo.albers();
        break;
      case "azimuthal equal area":
        projection = d3.geo.azimuthalEqualArea().clipAngle(180 - 1e-3);
        break;
      case "azimuthal equidistant":
        projection = d3.geo.azimuthalEquidistant().clipAngle(180 - 1e-3);
        break;
      case "conic conformal":
        projection = d3.geo.conicConformal();
        break;
      case "conic equal area":
        projection = d3.geo.conicEqualArea();
        break;
      case "conic equidistant":
        projection = d3.geo.conicEquidistant();
        break;
      case "equirectangular":
        projection = d3.geo.equirectangular();
        break;
      case "gnomonic":
        projection = d3.geo.gnomonic().clipAngle(90 - 1e-3);
        break;
      case "mercator":
        projection = d3.geo.mercator();
        break;
      case "transverse mercator":
        projection = d3.geo.transverseMercator();
        break;
      case "orthographic":
        projection = d3.geo.orthographic().clipAngle(90);
        break;
      case "stereographic":
        projection = d3.geo.stereographic().clipAngle(180 - 1e-4).clipExtent([[0, 0], [graphs.width, graphs.height]]);
        break;
    }
    projection.center(graphs.center).scale(graphs.scale).translate([graphs.width / 2, graphs.height / 2]).rotate(graphs.rotation);
    if (graphs.parallels) {
      projection.parallels(graphs.parallels);
    }
    var path = d3.geo.path().projection(projection);
    var graticule = d3.geo.graticule();
    svgd.attr("width", graphs.width).attr("height", graphs.height).style("background-color", "rgb(" + graphs.bgcolor.r + "," + graphs.bgcolor.g + "," + graphs.bgcolor.b + ")");
    var g = svgd.append("g");
    g.append("path").datum(graticule).attr("class", "graticule").attr("d", path).style("fill-opacity", 0).style("stroke", "#777").style("stroke-width", 0.5 + "px").style("stroke-opacity", 0.5);
    /*var filepath = "./data/world-50m.json";
    if(graphs.states){
      filepath = "./data/world.json";
    }*/
    var filepath = graphs.map;
    if (graphs.zoom) {
      var zoomed = function zoomed() {
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        svgd.selectAll(".points").attr("r", function (d) {
          return d.size / d3.event.scale;
        }).style("stroke-width", 2 / d3.event.scale + "px");
        svgd.selectAll(".route").style("stroke-width", function (d) {
          return d.size / d3.event.scale + "px";
        });
        svgd.selectAll("text").attr("y", 10 / d3.event.scale).style("font", 11 / d3.event.scale + "px sans-serif");
      };

      var zoom = d3.behavior.zoom().scaleExtent(graphs.zoom).on("zoom", zoomed);
      svgd.call(zoom).call(zoom.event);
    }
    var cur = null;
    var prev = null;
    d3.json(filepath, function (error, world) {
      if (error) console.log("Didn't work: " + error);
      var dat = world.objects.states || world.objects.countries;
      var feat = topojson.feature(world, dat);
      function coordcheck(elt, index) {
        //finds all the coordinate pairs in the mess of arrays.
        if (elt.length == 2 && !isNaN(elt[0]) && !isNaN(elt[1])) {
          //actual coordinates
          return elt[0] >= graphs.limits[0][0] && elt[0] <= graphs.limits[0][1] && elt[1] >= graphs.limits[1][0] && elt[1] <= graphs.limits[1][1]; //compare to min and max for long and lat
        } else if (elt instanceof Array) {
            //just a sanity check so we don't break things
            return elt.some(coordcheck);
          }
      }
      g.append("g").attr("class", "land").selectAll("path").data(feat.features, function (d, i) {
        if (graphs.limits) {
          if (d.geometry.coordinates.some(coordcheck)) {
            return i;
          } else {
            return null;
          }
        } else {
          return i;
        }
      }).enter().append("path").style("fill", function (d, i) {
        var tt = graphs.hl[d.id] || color(i);
        if (isNaN(tt.a)) {
          tt.a = graphs.opacity;
        }
        return "rgba(" + tt.r + "," + tt.g + "," + tt.b + "," + tt.a + ")";
      }).style("stroke", "rgba(" + graphs.bcolor.r + "," + graphs.bcolor.g + "," + graphs.bcolor.b + "," + graphs.bcolor.a + ")").style("stroke-width", 0.5 + "px").attr("d", path).on("click", function (d, i) {
        if (graphs.chl.length) {
          if (cur) {
            cur.style.fill = prev;
          }
          prev = this.style.fill;
          var tt = graphs.chl[d.id] || graphs.chl[0] || prev;
          if (isNaN(tt.a)) {
            tt.a = graphs.opacity;
          }
          this.style.fill = "rgba(" + tt.r + "," + tt.g + "," + tt.b + "," + tt.a + ")";
          cur = this;
        }
      });
      if (graphs.lines) {
        //array of linestrings
        var linegroup = g.append("g");
        linegroup.selectAll("g").data(graphs.lines).enter().append("path").attr("class", "route").attr("d", path).style("fill", "none").style("stroke", function (d) {
          return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")";
        }).style("stroke-width", function (d) {
          return d.size + "px";
        });
        graphs.lines.forEach(function (element) {
          linegroup.selectAll("g").data(element.coordinates).enter().append("circle").attr("class", "points").attr("transform", function (d) {
            return "translate(" + projection(d) + ")";
          }).attr("r", function (d, i) {
            d.size = element.pointsize[i];return d.size;
          }).style("fill", function (d, i) {
            var c = element.pointcolor[i];
            return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
          }).style("stroke", function (d, i) {
            var c = element.pointcolor[i];
            return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
          }).style("stroke-width", "2px");
          linegroup.selectAll("g").data(element.coordinates).enter().append("text").attr("class", "text").attr("transform", function (d) {
            return "translate(" + projection(d) + ")";
          }).attr("y", 10).attr("dy", ".71em").text(function (d, i) {
            return element.pointlabel[i];
          }).style("text-anchor", "middle").style("font", "11px sans-serif");
        });
      }
      if (graphs.points) {
        var pointgroup = g.append("g");
        pointgroup.selectAll("g").data(graphs.points).enter().append("circle").attr("class", "points").attr("transform", function (d) {
          return "translate(" + projection([d.lon, d.lat]) + ")";
        }).attr("r", function (d) {
          return d.size;
        }).style("fill", function (d) {
          return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")";
        }).style("stroke", function (d) {
          return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")";
        }).style("stroke-width", "2px");
        pointgroup.selectAll("g").data(graphs.points).enter().append("text").attr("class", "text").attr("transform", function (d) {
          return "translate(" + projection([d.lon, d.lat]) + ")";
        }).attr("y", 10).attr("dy", ".71em").text(function (d) {
          return d.label;
        }).style("text-anchor", "middle").style("font", "11px sans-serif");
      }
    });
  }
  function capture(el) {
    var mySVG = $(el).html();
    return mySVG;
  }
  return {
    update: update,
    capture: capture
  };
})();

},{"./assert":2,"topojson":1}]},{},[3]);
