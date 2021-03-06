/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright (c) 2015, Art Compiler LLC */
var colorbrewer = {YlGn: {
3: ["#f7fcb9","#addd8e","#31a354"],
4: ["#ffffcc","#c2e699","#78c679","#238443"],
5: ["#ffffcc","#c2e699","#78c679","#31a354","#006837"],
6: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"],
7: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
8: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
9: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]
},YlGnBu: {
3: ["#edf8b1","#7fcdbb","#2c7fb8"],
4: ["#ffffcc","#a1dab4","#41b6c4","#225ea8"],
5: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
6: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],
7: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
8: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
9: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
},GnBu: {
3: ["#e0f3db","#a8ddb5","#43a2ca"],
4: ["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"],
5: ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"],
6: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"],
7: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
8: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
9: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]
},BuGn: {
3: ["#e5f5f9","#99d8c9","#2ca25f"],
4: ["#edf8fb","#b2e2e2","#66c2a4","#238b45"],
5: ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
6: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],
7: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
8: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
9: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]
},PuBuGn: {
3: ["#ece2f0","#a6bddb","#1c9099"],
4: ["#f6eff7","#bdc9e1","#67a9cf","#02818a"],
5: ["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],
6: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"],
7: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
8: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
9: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]
},PuBu: {
3: ["#ece7f2","#a6bddb","#2b8cbe"],
4: ["#f1eef6","#bdc9e1","#74a9cf","#0570b0"],
5: ["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"],
6: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"],
7: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
8: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
9: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]
},BuPu: {
3: ["#e0ecf4","#9ebcda","#8856a7"],
4: ["#edf8fb","#b3cde3","#8c96c6","#88419d"],
5: ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],
6: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"],
7: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
8: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
9: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]
},RdPu: {
3: ["#fde0dd","#fa9fb5","#c51b8a"],
4: ["#feebe2","#fbb4b9","#f768a1","#ae017e"],
5: ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"],
6: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],
7: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
8: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
9: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]
},PuRd: {
3: ["#e7e1ef","#c994c7","#dd1c77"],
4: ["#f1eef6","#d7b5d8","#df65b0","#ce1256"],
5: ["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],
6: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"],
7: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
8: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
9: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]
},OrRd: {
3: ["#fee8c8","#fdbb84","#e34a33"],
4: ["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],
5: ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],
6: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],
7: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
8: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
9: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]
},YlOrRd: {
3: ["#ffeda0","#feb24c","#f03b20"],
4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
9: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]
},YlOrBr: {
3: ["#fff7bc","#fec44f","#d95f0e"],
4: ["#ffffd4","#fed98e","#fe9929","#cc4c02"],
5: ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
6: ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],
7: ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
8: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
9: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
},Purples: {
3: ["#efedf5","#bcbddc","#756bb1"],
4: ["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"],
5: ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],
6: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],
7: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
8: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
9: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]
},Blues: {
3: ["#deebf7","#9ecae1","#3182bd"],
4: ["#eff3ff","#bdd7e7","#6baed6","#2171b5"],
5: ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"],
6: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],
7: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
8: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
9: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]
},Greens: {
3: ["#e5f5e0","#a1d99b","#31a354"],
4: ["#edf8e9","#bae4b3","#74c476","#238b45"],
5: ["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"],
6: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],
7: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
8: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
9: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]
},Oranges: {
3: ["#fee6ce","#fdae6b","#e6550d"],
4: ["#feedde","#fdbe85","#fd8d3c","#d94701"],
5: ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],
6: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
7: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
8: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
9: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]
},Reds: {
3: ["#fee0d2","#fc9272","#de2d26"],
4: ["#fee5d9","#fcae91","#fb6a4a","#cb181d"],
5: ["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],
6: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
7: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
8: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
9: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
},Greys: {
3: ["#f0f0f0","#bdbdbd","#636363"],
4: ["#f7f7f7","#cccccc","#969696","#525252"],
5: ["#f7f7f7","#cccccc","#969696","#636363","#252525"],
6: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"],
7: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
8: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
9: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]
},PuOr: {
3: ["#f1a340","#f7f7f7","#998ec3"],
4: ["#e66101","#fdb863","#b2abd2","#5e3c99"],
5: ["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"],
6: ["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"],
7: ["#b35806","#f1a340","#fee0b6","#f7f7f7","#d8daeb","#998ec3","#542788"],
8: ["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"],
9: ["#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788"],
10: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],
11: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]
},BrBG: {
3: ["#d8b365","#f5f5f5","#5ab4ac"],
4: ["#a6611a","#dfc27d","#80cdc1","#018571"],
5: ["#a6611a","#dfc27d","#f5f5f5","#80cdc1","#018571"],
6: ["#8c510a","#d8b365","#f6e8c3","#c7eae5","#5ab4ac","#01665e"],
7: ["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"],
8: ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e"],
9: ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e"],
10: ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],
11: ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]
},PRGn: {
3: ["#af8dc3","#f7f7f7","#7fbf7b"],
4: ["#7b3294","#c2a5cf","#a6dba0","#008837"],
5: ["#7b3294","#c2a5cf","#f7f7f7","#a6dba0","#008837"],
6: ["#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"],
7: ["#762a83","#af8dc3","#e7d4e8","#f7f7f7","#d9f0d3","#7fbf7b","#1b7837"],
8: ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837"],
9: ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837"],
10: ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],
11: ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]
},PiYG: {
3: ["#e9a3c9","#f7f7f7","#a1d76a"],
4: ["#d01c8b","#f1b6da","#b8e186","#4dac26"],
5: ["#d01c8b","#f1b6da","#f7f7f7","#b8e186","#4dac26"],
6: ["#c51b7d","#e9a3c9","#fde0ef","#e6f5d0","#a1d76a","#4d9221"],
7: ["#c51b7d","#e9a3c9","#fde0ef","#f7f7f7","#e6f5d0","#a1d76a","#4d9221"],
8: ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221"],
9: ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221"],
10: ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],
11: ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]
},RdBu: {
3: ["#ef8a62","#f7f7f7","#67a9cf"],
4: ["#ca0020","#f4a582","#92c5de","#0571b0"],
5: ["#ca0020","#f4a582","#f7f7f7","#92c5de","#0571b0"],
6: ["#b2182b","#ef8a62","#fddbc7","#d1e5f0","#67a9cf","#2166ac"],
7: ["#b2182b","#ef8a62","#fddbc7","#f7f7f7","#d1e5f0","#67a9cf","#2166ac"],
8: ["#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
9: ["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
10: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],
11: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]
},RdGy: {
3: ["#ef8a62","#ffffff","#999999"],
4: ["#ca0020","#f4a582","#bababa","#404040"],
5: ["#ca0020","#f4a582","#ffffff","#bababa","#404040"],
6: ["#b2182b","#ef8a62","#fddbc7","#e0e0e0","#999999","#4d4d4d"],
7: ["#b2182b","#ef8a62","#fddbc7","#ffffff","#e0e0e0","#999999","#4d4d4d"],
8: ["#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d"],
9: ["#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d"],
10: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],
11: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]
},RdYlBu: {
3: ["#fc8d59","#ffffbf","#91bfdb"],
4: ["#d7191c","#fdae61","#abd9e9","#2c7bb6"],
5: ["#d7191c","#fdae61","#ffffbf","#abd9e9","#2c7bb6"],
6: ["#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"],
7: ["#d73027","#fc8d59","#fee090","#ffffbf","#e0f3f8","#91bfdb","#4575b4"],
8: ["#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4"],
9: ["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"],
10: ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],
11: ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]
},Spectral: {
3: ["#fc8d59","#ffffbf","#99d594"],
4: ["#d7191c","#fdae61","#abdda4","#2b83ba"],
5: ["#d7191c","#fdae61","#ffffbf","#abdda4","#2b83ba"],
6: ["#d53e4f","#fc8d59","#fee08b","#e6f598","#99d594","#3288bd"],
7: ["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],
8: ["#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd"],
9: ["#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"],
10: ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],
11: ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]
},RdYlGn: {
3: ["#fc8d59","#ffffbf","#91cf60"],
4: ["#d7191c","#fdae61","#a6d96a","#1a9641"],
5: ["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641"],
6: ["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"],
7: ["#d73027","#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850"],
8: ["#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
9: ["#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
10: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],
11: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
},Accent: {
3: ["#7fc97f","#beaed4","#fdc086"],
4: ["#7fc97f","#beaed4","#fdc086","#ffff99"],
5: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0"],
6: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f"],
7: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17"],
8: ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"]
},Dark2: {
3: ["#1b9e77","#d95f02","#7570b3"],
4: ["#1b9e77","#d95f02","#7570b3","#e7298a"],
5: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e"],
6: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02"],
7: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"],
8: ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]
},Paired: {
3: ["#a6cee3","#1f78b4","#b2df8a"],
4: ["#a6cee3","#1f78b4","#b2df8a","#33a02c"],
5: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"],
6: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c"],
7: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f"],
8: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00"],
9: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6"],
10: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"],
11: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"],
12: ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]
},Pastel1: {
3: ["#fbb4ae","#b3cde3","#ccebc5"],
4: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4"],
5: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6"],
6: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc"],
7: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd"],
8: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec"],
9: ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]
},Pastel2: {
3: ["#b3e2cd","#fdcdac","#cbd5e8"],
4: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"],
5: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9"],
6: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae"],
7: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc"],
8: ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]
},Set1: {
3: ["#e41a1c","#377eb8","#4daf4a"],
4: ["#e41a1c","#377eb8","#4daf4a","#984ea3"],
5: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00"],
6: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33"],
7: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628"],
8: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"],
9: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]
},Set2: {
3: ["#66c2a5","#fc8d62","#8da0cb"],
4: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3"],
5: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"],
6: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f"],
7: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"],
8: ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]
},Set3: {
3: ["#8dd3c7","#ffffb3","#bebada"],
4: ["#8dd3c7","#ffffb3","#bebada","#fb8072"],
5: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"],
6: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462"],
7: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69"],
8: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5"],
9: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9"],
10: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"],
11: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5"],
12: ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
}};
var https = require('https');
var http = require('http');
import {assert, message, messages, reserveCodeRange} from "./assert.js"

reserveCodeRange(1000, 1999, "compile");
messages[1001] = "Node ID %1 not found in pool.";
messages[1002] = "Invalid tag in node with Node ID %1.";
messages[1003] = "No aync callback provided.";
messages[1004] = "No visitor method defined for '%1'.";

let translate = (function() {
  let nodePool;
  function translate(pool, resume) {
    console.log("pool=" + JSON.stringify(pool, null, 2));
    nodePool = pool;
    return visit(pool.root, {}, resume);
  };
  function error(str, nid) {
    return {
      str: str,
      nid: nid,
    };
  }
  function visit(nid, options, resume) {
    assert(typeof resume === "function", message(1003));
    // Get the node from the pool of nodes.
    let node = nodePool[nid];
    assert(node, message(1001, [nid]));
    assert(node.tag, message(1001, [nid]));
    assert(typeof table[node.tag] === "function", message(1004, [node.tag]));
    return table[node.tag](node, options, resume);
  };
  // BEGIN VISITOR METHODS
  let edgesNode;
  function str(node, options, resume) {
    let val = node.elts[0];
    resume([], val);
  };
  function num(node, options, resume) {
    let val = node.elts[0];
    resume([], val);
  };
  function ident(node, options, resume) {
    let val = node.elts[0];
    resume([], val);
  };
  function bool(node, options, resume) {
    let val = node.elts[0];
    resume([], val);
  };
  function add(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      val1 = +val1;
      if (isNaN(val1)) {
        err1 = err1.concat(error("Argument must be a number.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {
        val2 = +val2;
        if (isNaN(val2)) {
          err2 = err2.concat(error("Argument must be a number.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), val1 + val2);
      });
    });
  };
  function set(node, options, resume, params){
    visit(node.elts[0], options, function (err, val) {
      if(typeof val !== "object" || !val || !val.scale){
        err = err.concat(error("Argument Map invalid.", node.elts[0]));
        resume([].concat(err), val);
      } else {
        if(params.op && params.op === "default"){
          val[params.prop] = params.val;
          resume([].concat(err), val);
        } else if(params.op && params.op === "positive"){
          visit(node.elts[1], options, function (err2, val2) {
            if(isNaN(val2) || val2 <= 0){
              err2 = err2.concat(error("Argument must be a positive number.", node.elts[1]));
            }
            if(typeof val === "object" && val){
              val[params.prop] = +val2;
            }
            resume([].concat(err).concat(err2), val);
          });
        } else {
          resume([].concat(err), val);
        }
      }
    });
  };
  function features(node, options, resume){//0 = map, 1 = array
    visit(node.elts[0], options, function (err, val) {
      if(typeof val !== "object" || !val || !val.scale){
        err = err.concat(error("Argument Map invalid.", node.elts[0]));
        resume([].concat(err), val);
      } else {
        visit(node.elts[1], options, function (err1, val1) {
          var points = [];
          var linepts = [];
          if(val1 instanceof Array){
            val1.forEach(function (element, index) {
              if(element.key === "point" && !isNaN(element.lat) && !isNaN(element.lon)){
                points = points.concat(element);//expect to use 'd.lat' and 'd.lon' in d3 functions a lot and pass in points as data.
              } else if(element.type === "LineString" && element.coordinates instanceof Array){
                linepts = linepts.concat(element);//handle exactly like points except for the segments between them.
              } else {
                err1 = err1.concat(error("Index "+index+" contains an invalid feature.", node.elts[1]));
              }
            });
          } else {
            err1 = err1.concat(error("Argument features must be an array.", node.elts[1]));
          }
          val.points = points;
          val.lines = linepts;
          resume([].concat(err).concat(err1), val);
        });
      }
    });
  };
  function width(node, options, resume) {
    let params = {
      op: "positive",
      prop: "width"
    };
    set(node, options, function (err, val) {
      resume([].concat(err), val);
    }, params);
  };
  function height(node, options, resume) {
    let params = {
      op: "positive",
      prop: "height"
    };
    set(node, options, function (err, val) {
      resume([].concat(err), val);
    }, params);
  };
  function scale(node, options, resume) {
    let params = {
      op: "positive",
      prop: "scale"
    };
    set(node, options, function (err, val) {
      resume([].concat(err), val);
    }, params);
  };
  function rotate(node, options, resume) {
    var ret = [];
    visit(node.elts[1], options, function (err1, val1) {
      if(val1 instanceof Array && val1.length > 1){
        if(!isNaN(val1[0])){
          ret = ret.concat(+val1[0]);
        } else {
          err1 = err1.concat(error("Argument yaw is not a number", node.elts[1]));
        }
        if(!isNaN(val1[1])){
          ret = ret.concat(+val1[1]);
        } else {
          err1 = err1.concat(error("Argument pitch is not a number.", node.elts[1]));
        }
        if(val1[2]){//if it's zero as opposed to null we still aren't doing any harm by skipping it.
          if(!isNaN(val1[2])){// if there IS something given for roll it better be a number.
            ret = ret.concat(+val1[2]);
          } else {
            err1 = err1.concat(error("Argument roll is not a number.", node.elts[1]))
          }
        }//roll is optional, so no error if missing
      } else {
        err1 = err1.concat(error("Argument must be an array with at least two values.", node.elts[1]));
      }
      let params = {
        op: "default",
        prop: "rotation",
        val: ret
      };
      set(node, options, function (err, val) {
        resume([].concat(err).concat(err1), val);
      }, params);
    });
  };
  function parallels(node, options, resume) {//latitude, longitude, map
    visit(node.elts[1], options, function (err1, val1) {//longitude
      if(!isNaN(val1)){
        val1 = +val1;
      } else {
        err1 = err1.concat(error("Argument longitude is not a number.", node.elts[1]));
      }
      visit(node.elts[2], options, function (err2, val2) {//latitude
        if(!isNaN(val2)){
          val2 = +val2;
        } else {
          err2 = err2.concat(error("Argument latitude is not a number.", node.elts[2]));
        }
        let params = {
          op: "default",
          prop: "parallels",
          val: [val1, val2]
        };
        set(node, options, function (err, val) {//map
          resume([].concat(err).concat(err1).concat(err2), val);
        }, params);
      });
    });
  };
  function limit(node, options, resume) {//[minlatitude, maxlatitude], [minlongitude, maxlongitude], map
    visit(node.elts[1], options, function (err1, val1) {//[minlongitude, maxlongitude]
      if(!(val1 instanceof Array) 
        || +val1[0] < -180 
        || +val1[0] > +val1[1]
        || +val1[1] > 180
        || +val1[1] < +val1[0]){
        err1 = err1.concat(error("Argument array for longitude invalid.", node.elts[1]));
      } else {
        val1 = [+val1[0], +val1[1]];//throw out any other potential values.
      }
      visit(node.elts[2], options, function (err2, val2) {//[minlatitude, maxlatitude]
      if(!(val2 instanceof Array) 
        || +val2[0] < -90 
        || +val2[0] > +val2[1]
        || +val2[1] > 90
        || +val2[1] < +val2[0]){
          err2 = err2.concat(error("Argument array for latitude invalid.", node.elts[2]));
        } else {
          val2 = [+val2[0], +val2[1]];//throw out any other potential values.
        }
        let params = {
          op: "default",
          prop: "limits",
          val: [val1, val2]
        };
        set(node, options, function (err, val) {//map
          resume([].concat(err).concat(err1).concat(err2), val);
        }, params);
      });
    });
  };
  function point(node, options, resume) {//latitude, longitude
    var ret1 = null;
    visit(node.elts[0], options, function (err1, val1) {//longitude
      if(!isNaN(val1) && Math.abs(val1) <= 180){
        ret1 = +val1;
      } else {
        err1 = err1.concat(error("Argument for longitude invalid.", node.elts[0]));
      }
      visit(node.elts[1], options, function (err2, val2) {//latitude
        var ret2 = null;
        if(!isNaN(val2) && Math.abs(val2) <= 90){
          ret2 = +val2;
        } else {
          err2 = err2.concat(error("Argument for latitude invalid.", node.elts[1]));
        }
        resume([].concat(err1).concat(err2), {
          key: "point",
          lat: ret2,
          lon: ret1,
          color: {r: 255, g: 0, b: 0, a: 100},
          size: 4.5,
          label: ''
        });
      });
    });
  };
  function path(node, options, resume) {//[points]
    var ret = {
      type: "LineString",
      coordinates: [],
      pointcolor: [],
      color: {r: 255, g: 0, b: 0, a: 100},
      pointsize: [],
      size: 3,
      pointlabel: []
    };
    visit(node.elts[0], options, function (err1, val1) {
      if(val1 instanceof Array){
        val1.forEach(function (element, index){
          if(element.key !== "point" || isNaN(element.lat) || isNaN(element.lon)){
            err1 = err1.concat(error("Index "+index+" contains an invalid point.", node.elts[0]));
          } else {
            ret.coordinates = ret.coordinates.concat([[element.lon, element.lat]]);
            ret.pointcolor = ret.pointcolor.concat(element.color);
            ret.pointsize = ret.pointsize.concat(element.size);
            ret.pointlabel = ret.pointlabel.concat(element.label);
          }
        });
      } else {
        err1 = err1.concat(error("Argument is not a valid array.", node.elts[0]));
      }
      resume([].concat(err1), ret);
    });
  };
  function color(node, options, resume){
    visit(node.elts[0], options, function (err, val) {
      var ret = null;
      if(typeof val === "object" && val && (val.key === "point" || val.type === "LineString")){
        visit(node.elts[1], options, function (err1, val1) {
          ret = colorcheck(val1);
          if(ret.err && ret.err.length){
            err1 = err1.concat(error(ret.err + '.', node.elts[1]));
          }
          err = err.concat(err1);
        });
      } else {
        err = err.concat(error("Argument is not a point or path.", node.elts[0]));
      }
      val.color = ret;
      resume([].concat(err), val);
    });
  };
  function size(node, options, resume){
    visit(node.elts[0], options, function (err, val) {
      var ret = null;
      if(typeof val === "object" && val && (val.key === "point" || val.type === "LineString")){
        visit(node.elts[1], options, function (err1, val1) {
          ret = val1;
          if(isNaN(ret) || +ret < 0){
            err1 = err1.concat(error("Argument is not a positive number.", node.elts[1]));
          }
          err = err.concat(err1);
        });
      } else {
        err = err.concat(error("Argument is not a point or path.", node.elts[0]));
      }
      val.size = +ret;
      resume([].concat(err), val);
    });
  };
  function label(node, options, resume){
    visit(node.elts[0], options, function (err, val) {
      var ret = null;
      if(typeof val === "object" && val && (val.key === "point")){
        visit(node.elts[1], options, function (err1, val1) {
          if(typeof val1 === "object"){
            err1 = err1.concat(error("Argument is not a valid string or number.", node.elts[1]));
          }
          err = err.concat(err1);
          val.label = val1;
        });
      } else {
        err = err.concat(error("Argument is not a point.", node.elts[0]));
      }
      resume([].concat(err), val);
    });
  };
  let labeloptions = {//second word is x, first is y
    "left": "middle start",
    "top left": "top start",
    "center left": "middle start",
    "middle left": "middle start",
    "top": "top middle",
    "top middle": "top middle",
    "top center": "top middle",
    "right": "middle end",
    "center right": "middle end",
    "middle right": "middle end",
    "top right": "top end",
    "bottom": "bottom middle",
    "bottom middle": "bottom middle",
    "bottom center": "bottom middle",
    "bottom right": "bottom end",
    "bottom left": "bottom start",
    "center": "middle middle",
    "middle": "middle middle",
  };
  function title(node, options, resume){//title text pos map
    var ret = {
      text: '',
      pos: ['', ''],
    };
    visit(node.elts[1], options, function (err1, val1) {//pos
      if(typeof val1 === 'string' && labeloptions[val1]){//first word is top, bottom, etc, second is right/left
        ret.pos = labeloptions[val1].split(" ");
      } else {
        err1 = err1.concat(error("Argument position is not a valid string.", node.elts[1]));
      }
      visit(node.elts[2], options, function (err2, val2) {//text
        if(typeof val2 !== 'object'){
          ret.text = ''+val2;
        } else {
          err2 = err2.concat(error("Argument title cannot be an object.", node.elts[2]));
        }
        let params = {
          op: "default",
          prop: "title",
          val: ret
        };
        set(node, options, function (err, val) {//map
          resume([].concat(err).concat(err1).concat(err2), val);
        }, params);
      })
    });
  };
  function position(node, options, resume){//position lat long map
    var ret = [];
    visit(node.elts[1], options, function (err1, val1) {//longitude
      if(!isNaN(val1)){
        ret[0] = +val1;
      } else {
        err1 = err1.concat(error("Argument longitude is not a number.", node.elts[1]))
      }
      visit(node.elts[2], options, function (err2, val2) {//latitude
        if(!isNaN(val2)){
          ret[1] = +val2;
        } else {
          err2 = err2.concat(error("Argument latitude is not a number.", node.elts[2]));
        }
        let params = {
          op: "default",
          prop: "center",
          val: ret
        };
        set(node, options, function (err, val) {//map
          resume([].concat(err).concat(err1).concat(err2), val);
        }, params);
      });
    });
  };
  function map(node, options, resume){//takes in projection and map
    let ret = {
      scale: 153,
      mapstyle: {
        color: [{r: 0, g: 0, b: 0}],
        opacity: 1,
        background: {r: 255, g: 255, b: 255, a: 0},
      },
      borders: {
        color: {r: 255, g: 255, b: 255, a: 100},
      },
      rotation: [0, 0],
      hl: [],
      chl: [],
      center: [0, 0],
    };
    visit(node.elts[1], options, function (err1, val1) {//projection
      switch(val1){
        case "albers":
          ret.rotation = [96, 0];
          ret.center = [0, 60];
          break;
        case "azimuthal equal area":
          ret.scale = 237;
          break;
        case "azimuthal equidistant":
          ret.scale = 150;
          break;
        case "conic conformal":
          break;
        case "conic equal area":
          break;
        case "conic equidistant":
          ret.scale = 128;
          break;
        case "equirectangular":
          break;
        case "gnomonic":
          ret.scale = 150;
          break;
        case "mercator":
          break;
        case "transverse mercator":
          break;
        case "orthographic":
          ret.scale = 475;
          break;
        case "stereographic":
          ret.scale = 245;
          break;
        default:
          err1 = err1.concat(error("Argument projection is not a valid type.", node.elts[1]));
      }
      ret.projection = val1;
      visit(node.elts[0], options, function (err, val) {
        if(typeof val === "string"){
          ret.map = val;
        } else if(val.tree){
          ret.tree = val.tree;
        } else {
          err = err.concat(error("Argument map is not a valid string."+val.tree, node.elts[0]));
        }
        resume([].concat(err).concat(err1), ret);
      });
    });
  };
  function get(node, options, resume){//takes in URL for map
    visit(node.elts[0], options, function (err, val) {
      if(typeof val !== "string" || val.indexOf("http") < 0){//if there's no http or https we can't check protocol, right?
        err = err.concat(error("Argument is not a valid URL.", node.elts[0]));
        resume([].concat(err), val);
      } else {
        let protocol;
        protocol = (val.indexOf("https") >= 0) ? https : http;
        protocol.get(val, function(res) {
          var obj = '';

          res.on('data', function(d) {
            obj += d;
          });

          res.on('end', function() {
            resume([].concat(err), {tree: obj});
          });
        }).on('error', function(e) {
          err = err.concat(error("Attempt to get data returned" + e, node.elts[0]));
          resume([].concat(err), val);
        });
      }
    });
  };
  function csv(node, options, resume){//takes in 'get {csv here} object' basically
  	//0 = map, 1 = csv
  	visit(node.elts[1], options, function (err, val) {
      if(val.tree){
        let params = {
          op: "default",
          prop: "csv",
          val: val.tree
        };
        set(node, options, function (err1, val1) {//map
          val1.info = val1.info || {};
          resume([].concat(err).concat(err1), val1);
        }, params);
      } else {
        err = err.concat(error("Please provide a valid parsed file.", node.elts[1]));
        resume([].concat(err), val);
      }
  	});
  };
  function info(node, options, resume){//0 = map (with csv), 1 = position
    let opt = {
      "tooltip": 0,
      "top": 1,
      "bottom": 2,
      "right": 3,
      "left": 4,
    };
    visit(node.elts[1], options, function (err, val) {
      if(!isNaN(opt[val])){
        set(node, options, function (err1, val1) {
          val1.info = val1.info || {};
          val1.info["position"] = opt[val];
          resume([].concat(err).concat(err1), val1);
        }, {});
      } else {
        err = err.concat(error("Please use 'tooltip' or a direction for the table position.", node.elts[1]));
        resume([].concat(err), val);
      }
    });
  };
  function order(node, options, resume){//0 = map (with csv), 1 = descriptor, 2 = order
    visit(node.elts[1], options, function (err1, val1) {
        //descending has largest at top. make it the default.
      visit(node.elts[2], options, function (err2, val2) {
        var order = false;
        if(val2.startsWith("asc")){
          order = true;
        }
        if(val1.startsWith("rep")){
          var sorter = 'name';
        } else if(val1.startsWith("vot")){
          var sorter = 'votes';
        }
        if(!val2.startsWith("asc") && !val2.startsWith("des")){
          err2 = err2.concat(error("Please use ascending or descending for the sort.", node.elts[2]));
          resume([].concat(err2).concat(err1), val2);          
        } else if(!sorter){
          err1 = err1.concat(error("Please use a valid sorting parameter.", node.elts[1]));
          resume([].concat(err2).concat(err1), val1);
        } else {
          set(node, options, function (err, val) {
            val.info = val.info || {};
            val.info["order"] = order;
            val.info["sorter"] = sorter;
            resume([].concat(err2).concat(err1).concat(err), val);
          }, {});
        }
      });
    });
  };
  function zoom(node, options, resume) {//0 = map, 1 = max, 2 = min --- zoom min max map
    visit(node.elts[1], options, function (err1, val1) {//max
      if(!isNaN(val1) && +val1 > 0){
        val1 = +val1;
      } else {
        err1 = err1.concat(error("Argument max is not a positive number.", node.elts[1]))
      }
      visit(node.elts[2], options, function (err2, val2) {//min
        if(!isNaN(val2) && +val2 > 0){
          val2 = +val2;
        } else {
          err2 = err2.concat(error("Argument min is not a positive number.", node.elts[2]));
        }
        if(val2 > val1){
          err2 = err2.concat(error("Argument min is larger than max.", node.elts[2]));
        }
        let params = {
          op: "default",
          prop: "zoom",
          val: [val2, val1]
        };
        set(node, options, function (err, val) {//map
          resume([].concat(err).concat(err1).concat(err2), val);
        }, params);
      });
    });
  };
  function colorcheck(val){
    var ret = {};
    if(typeof val === "string" && /^#[0-9A-F]{6}$/i.test(val)){//valid hex string.
      var temp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
      ret = {
        r: parseInt(temp[1], 16),
        g: parseInt(temp[2], 16),
        b: parseInt(temp[3], 16),
      };
    } else if(!isNaN(val.r) && !isNaN(val.g) && !isNaN(val.b)){
      ret = val;
    } else {
      ret.err = "Please provide a valid color";
    }
    return ret;
  };
  function highlight(node, options, resume){//0 = map, 1 = pairs
    var ret = [];
    visit(node.elts[1], options, function (err1, val1) {//[[id, color], [id, color]]
      if(!(val1 instanceof Array)){
        err1 = err1.concat(error("Argument must be an array.", node.elts[1]));
      }
      val1.forEach(function (element, index){
        if(isNaN(element[0]) || element[0] < 0){
          err1 = err1.concat(error("Index "+index+" contains an invalid id.", node.elts[1]));
        } else {
          ret[element[0]] = colorcheck(element[1]);
          if(ret[element[0]].err && ret[element[0]].err.length){
            err1 = err1.concat(error(ret[element[0]].err+" at index "+index+'.', node.elts[1]));
          }
        }
      });
      let params = {
        op: "default",
        prop: "hl",
        val: ret
      };
      set(node, options, function (err, val) {
        resume([].concat(err).concat(err1), val);
      }, params);
    });
  };
  function chighlight(node, options, resume){//0 = map, 1 = pairs
    var ret = [];
    visit(node.elts[1], options, function (err1, val1) {//[[id, color], [id, color]]
      if(!(val1 instanceof Array)){
        err1 = err1.concat(error("Argument must be an array.", node.elts[1]));
      }
      val1.forEach(function (element, index){
        if(element[0] === '_'){element[0] = 0;}
        if(isNaN(element[0]) || element[0] < 0){
          err1 = err1.concat(error("Index "+index+" contains an invalid id.", node.elts[1]));
        } else {
          ret[element[0]] = colorcheck(element[1]);
          if(ret[element[0]].err && ret[element[0]].err.length){
            err1 = err1.concat(error(ret[element[0]].err+" at index "+index+'.', node.elts[1]));
          }
        }
      });
      let params = {
        op: "default",
        prop: "chl",
        val: ret
      };
      set(node, options, function (err, val) {
        resume([].concat(err).concat(err1), val);
      }, params);
    });
  };
  //use take data names and colors
  //in implementation, color everything where that data is the highest value with that color
  function dhighlight(node, options, resume){
    var ret = {};
    visit(node.elts[1], options, function (err1, val1) {//0 = map, 1 = colors, 2 = names
      if(!(val1 instanceof Array)){//[red, blue, someothercolor]
        err1 = err1.concat(error("Argument must be an array.", node.elts[1]));
      }
      visit(node.elts[2], options, function (err2, val2){//[name, name, name]
        if(!(val2 instanceof Array) || val2.length > val1.length){
          err2 = err2.concat(error("Argument must be an array at most the size of the given colors.", node.elts[2]));
        }
        val2.forEach(function (element, index){//elements are names here
          var name = element.charAt(0).toLowerCase() + element.slice(1);
          ret[name] = colorcheck(val1[index]);//use the colors this way
          if(ret[name].err && ret[name].err.length){
            err1 = err1.concat(error(ret[name].err+" at index "+index+'.', node.elts[1]));
          }
        });
        let params = {
          op: "default",
          prop: "dhl",
          val: ret
        };
        set(node, options, function (err, val) {
          resume([].concat(err).concat(err1).concat(err2), val);
        }, params);
      });
    });
  };
  let colors = {
    "yellow green" : 'YlGn',
    "yellow green blue" : 'YlGnBu',
    "green blue" : 'GnBu',
    "blue green" : 'BuGn',
    "purple blue green" : 'PuBuGn',
    "purple blue" : 'PuBu',
    "blue purple" : 'BuPu',
    "red purple" : 'RdPu',
    "purple red" : 'PuRd',
    "orange red" : 'OrRd',
    "yellow orange red" : 'YlOrRd',
    "yellow orange brown" : 'YlOrBr',
    "purple" : 'Purples',
    "blue" : 'Blues',
    "green" : 'Greens',
    "orange" : 'Oranges',
    "red" : 'Reds',
    "grey" : 'Greys',
    "purple orange" : 'PuOr',
    "brown bluegreen" : 'BrBG',
    "purple green" : 'PRGn',
    "pink yellowgreen" : 'PiYG',
    "red blue" : 'RdBu',
    "red grey" : 'RdGy',
    "red yellow blue" : 'RdYlBu',
    "red yellow green" : 'RdYlGn',
    "spectral" : 'Spectral',
    "dark" : 'Dark2',
    "pastel" : 'Pastel1',
    "accent" : 'Accent',
  };
  function brewer(node, options, resume) {//takes in color string, outputs array
    let ret = 0;
    visit(node.elts[0], options, function (err, val) {
      if(val instanceof Array){
        val = val.join(" ");
      }
      if(!colors[val]){
        err = err.concat(error("Unrecognized color, please use lower case.", node.elts[0]));
      } else {
        ret = colorbrewer[colors[val]][9].slice(0);
        ret.push(ret.shift());
      }
      resume([].concat(err), ret);//finds the right name and then grabs the colorbrewer array
    });
  };
  function rgba(node, options, resume){
    visit(node.elts[0], options, function (err1, val1) {//a
      if(isNaN(val1) || val1 < 0){
        err1 = err1.concat(error("Alpha must be a positive number.", node.elts[0]));
      } else {
        if(val1 > 1 && val1 < 100){
          val1 = val1/100;
        } else if (val1 > 100){
          val1 = 1;
        }
      }
      let test = node.elts.shift();
      rgb(node, options, function(err2, val2) {//run rgb, add alpha
        val2.a = val1
        node.elts.unshift(test);
        resume([].concat(err1).concat(err2), val2);
      });
    });
  };
  function rgb(node, options, resume){
    let ret = {
      r: 0,
      g: 0,
      b: 0,
    };
    visit(node.elts[0], options, function (err1, val1) {//b
      if(isNaN(val1) || val1 < 0 || +val1 > 255){
        err1 = err1.concat(error("Argument must be between 0 and 255.", node.elts[0]));
      }
      ret.b = +val1;
      visit(node.elts[1], options, function (err2, val2) {//g
        if(isNaN(val2) || val2 < 0 || +val2 > 255){
          err2 = err2.concat(error("Argument must be between 0 and 255.", node.elts[1]));
        }
        ret.g = +val2;
        visit(node.elts[2], options, function (err3, val3) {//r
          if(isNaN(val3) || val3 < 0 || +val3 > 255){
            err3 = err3.concat(error("Argument must be between 0 and 255.", node.elts[2]));
          }
          ret.r = +val3;
          resume([].concat(err1).concat(err2).concat(err3), ret);
        });
      });
    });
  };
  function style(node, options, resume) {
    visit(node.elts[1], options, function (err2, val2) {
      if(val2 instanceof Array && val2.length){
        visit(node.elts[0], options, function (err1, val1) {
          if(typeof val1 !== "object" || !val1 || !val1.scale){
            err1 = err1.concat(error("Argument Map invalid.", node.elts[0]));
          } else {
            val2.forEach(function (element, index) {
              if(element.key && element.val){//first tier: title, map, borders, features, info
                unwrap(element, val1);
                /*val1[element.key] = val1[element.key] || {};//make sure it's there
                element.val.forEach(function (el2, ind) {
                  if(el2.key && el2.val){//example: val1[title][font-size] = 10
                    val1[element.key][el2.key] = el2.val;
                  }
                });*/
              } else {
                err2 = err2.concat(error("Index " + index + " is an invalid object.", node.elts[1]));
              }
            });
          }
          resume([].concat(err1).concat(err2), val1);
        });
      } else {
        err2 = err2.concat(error("Invalid parameters.", node.elts[1]));
        resume([].concat(err2), val2);
      }
    });
  };
  function unwrap(element, val1){//assumes .key and .val have been checked
    val1[element.key] = val1[element.key] || {};//make sure it exists
    element.val.forEach(function (el2, ind) {//go through the array of key/value pairs
      if(el2.key && el2.val){
        if(el2.val instanceof Array && el2.val.length && el2.val[0].key){//another layer down
          unwrap(el2, val1[element.key]);
        } else {//just a single value
          val1[element.key][el2.key] = el2.val;
        }
      }
    });
  };
  function binding(node, options, resume) {
    visit(node.elts[0], options, function (err1, val1) {
      visit(node.elts[1], options, function (err2, val2) {
        resume([].concat(err1).concat(err2), {key: val1, val: val2});
      });
    });
  };
  function exprs(node, options, resume) {
    if (node.elts && node.elts.length) {
      visit(node.elts[0], options, function (err1, val1) {
        node.elts.shift();
        exprs(node, options, function (err2, val2) {
          val2.unshift(val1);
          resume([].concat(err1).concat(err2), val2);
        });
      });
    } else {
      resume([], []);
    }
  };
  function program(node, options, resume) {
    if (!options) {
      options = {};
    }
    visit(node.elts[0], options, resume);
  };
  let table = {
    "PROG" : program,
    "EXPRS" : exprs,
    "STR": str,
    "NUM": num,
    "IDENT": ident,
    "BOOL": bool,
    "LIST": exprs,
    "RECORD": exprs,
    "BINDING": binding,
    "ADD" : add,
    "STYLE" : style,
    "WIDTH" : width,
    "HEIGHT" : height,
    "SCALE" : scale,
    "PARALLELS" : parallels,
    "MAP" : map,
    "GET" : get,
    "RGB" : rgb,
    "RGBA" : rgba,
    "BREWER" : brewer,
    "LIMIT" : limit,
    "ZOOM" : zoom,
    "POINT" : point,
    "PATH" : path,
    "FEATURES" : features,
    "COLOR" : color,
    "SIZE" : size,
    "LABEL" : label,
    "ROTATE" : rotate,
    "HIGHLIGHT": highlight,
    "CHIGHLIGHT": chighlight,
    "DHIGHLIGHT": dhighlight,
    "POSITION": position,
    "TITLE": title,
    "CSV": csv,
    "INFO": info,
    "ORDER": order,
  };
  return translate;
})();
let render = (function() {
  function escapeXML(str) {
    return String(str)
      .replace(/&(?!\w+;)/g, "&amp;")
      .replace(/\n/g, " ")
      .replace(/\\/g, "\\\\")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  function render(val, resume) {
    // Do some rendering here.
    resume([], val);
  };
  return render;
})();
export let compiler = (function () {
  exports.compile = function compile(pool, resume) {
    // Compiler takes an AST in the form of a node pool and translates it into
    // an object to be rendered on the client by the viewer for this language.
    try {
      translate(pool, function (err, val) {
        console.log("translate err=" + JSON.stringify(err, null, 2) + "\nval=" + JSON.stringify(val, null, 2));
        if (err.length) {
          console.log(err);
          resume(err, val);
        } else {
          render(val, function (err, val) {
            console.log("render err=" + JSON.stringify(err, null, 2) + "\nval=" + JSON.stringify(val, null, 2));
            resume(err, val);
          });
        }
      });
    } catch (x) {
      console.log("ERROR with code");
      console.log(x.stack);
      resume("Compiler error", {
        score: 0
      });
    }
  }
})();
