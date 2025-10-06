sap.ui.define(
  ["sap/ui/core/Control", "sap/ui/thirdparty/d3"],
  function (Control, d3) {
    "use strict";
    return Control.extend("sap.ui5.walkthrough.control.mymap", {
      metadata: {
        properties: {
          id: "string",
          title: "string",
          width: { type: "sap.ui.core.CSSSize", defaultValue: "100%" }, //900
          height: { type: "sap.ui.core.CSSSize", defaultValue: "420" }, //390
          mapDataPath: "string",
          jerryProperty1: "string",
          jerryProperty2: "number",
          jerryProperty3: "boolean",
          maptype: { type: "string", defaultValue: "f" }, // f for frequency, p for postive, n for negative
        },
        events: {
          regionClicked: {},
        },
      }, // end of metadata,

      // oRm: Render manager

      renderer: function (oRm, oCtrl) {
        console.log("in renderer....");
        oRm.write("<div");
        oRm.writeControlData(oCtrl); // writes the Control ID and enables event handling - important!
        oRm.addClass("viz"); // add a CSS class for styles common to all control instances
        oRm.writeClasses(); // this call writes the above class plus enables support for Square.addStyleClass(...)
        oRm.write(">");
        oRm.write("</div>");
      },

      onAfterRendering: function () {
        // in function implementation
        //    initialize svg tag
        console.log("in afterRendering...");
        var svg = d3
          .select("#" + this.getId())
          .append("svg")
          .attr("viewBox", "0,0,700,420")
          .attr("width", this.getWidth())
          .attr("height", this.getHeight());

        svg
          .append("text")
          .attr("x", 350)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .text(this.getTitle());

        //      initialize g tag
        var g = svg.append("g").attr("id", "g-" + this.getId());
        // g is an element

        //      initialize projection: different projections for different patterns of maps
        //The equirectangular, or plate carrée projection, is the simplest possible geographic projection: the identity function.
        // It is neither equal-area nor conformal, but is sometimes used for raster data. See raster reprojection for an example; the source image uses the equirectangular projection.
        var projection = d3.geo
          .equirectangular()
          .translate([-490, 550])
          .scale("3000");

        //      load projection into d3 geo.path
        var path = d3.geo.path().projection(projection);

        //      initialize tooltip
        var tt = this.drawToolTip(this.getId());

        var self = this;

        //      draw based on geoJSON input & attach events
        //  Creates a request for the JSON file at the specified url with the mime type "application/json".
        // If a callback is specified, the request is immediately issued with the GET method, and the callback
        // will be invoked asynchronously when the file is loaded or the request fails; the callback is invoked with two arguments: the error,
        // if any, and the parsed JSON. The parsed JSON is undefined if an error occurs. If no callback is specified, the returned request can be issued using xhr.get or similar, and handled using xhr.on.
        d3.json(this.getMapDataPath(), function (collection) {
          g.selectAll("path")
            .data(collection.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", function (d) {
              console.log("try to determine class!");
              return self.styleRegion(d, self);
            })
            //.attr("transform", "scale(" + 80 + ")translate(" + -360 + "," + -90 + ")")
            .on("mouseover", function (d) {
              self.activateToolTip(tt, d);
            })
            .on("mouseout", function (d) {
              self.deactivateToolTip(tt);
            })
            .on("mousemove", function () {
              tt.style("top", d3.event.clientY - 105 + "px").style(
                "left",
                d3.event.clientX - 25 + "px"
              );
            })
            .on("click", function (d) {
              self.fireRegionClicked(d);
            });
        });
      },

      drawToolTip: function (container) {
        var tooltip = d3
          .select("#" + container)
          .append("g")
          .attr("id", "tt-" + container)
          .style("top", "0px")
          .style("left", "0px")
          .style("opacity", -1);

        console.log("typeof drawToolTip: " + typeof tooltip);

        return tooltip;
      },

      activateToolTip: function (toolTip, d) {
        // set inner html
        console.log("tooltip activated!");
        toolTip
          .html(function () {
            return d.properties.description + "Hello, Jerry";
          })
          .transition()
          .duration(500)
          .style("opacity", 1);
      },

      deactivateToolTip: function (toolTip) {
        toolTip.transition().duration(500).style("opacity", -1);
      },

      styleRegion: function (d, self) {
        console.log("in function styleRegion!");
        var style,
          aJregion = self.getModel().getData().result;

        for (var sRegionKey in aJregion) {
          if (d.properties.name == aJregion[sRegionKey].LOCATION) {
            switch (self.getMaptype()) {
              case "f": {
                style = "f" + aJregion[sRegionKey].GRADE_TOTAL;
                break;
              }
              case "p": {
                style = "p" + aJregion[sRegionKey].GRADE_POSITIVE;
                break;
              }
              case "n": {
                style = "n" + aJregion[sRegionKey].GRADE_NEGATIVE;
                break;
              }
            }
            break;
          } else {
            continue;
          }
        }
        console.log("style: " + style);
        style = "f4";
        return style;
      },
    });
  }
);
