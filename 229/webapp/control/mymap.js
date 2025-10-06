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
        var width = 700, height = 420; // 与 viewBox 对齐

        // 防止重复渲染时叠加多个 SVG
        var root = d3.select("#" + this.getId());
        root.select("svg").remove();

        var svg = root
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height)
          .attr("width", this.getWidth())
          .attr("height", this.getHeight());

        // 调试: 添加一个红色边框看看区域
        svg.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("stroke", "#f00")
          .style("stroke-width", 0.3)
          .style("pointer-events", "none");

        svg.append("text")
          .attr("x", width / 2)
          .attr("y", 24)
          .attr("text-anchor", "middle")
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .text(this.getTitle());

        var g = svg.append("g").attr("id", "g-" + this.getId());

        // 关键：先将投影归一化（scale=1, translate=[0,0]），否则默认 translate(480,250) 会影响 bounds 计算
        var projection = d3.geo.equirectangular().scale(1).translate([0, 0]);
        var path = d3.geo.path().projection(projection);

        var tt = this.drawToolTip(this.getId());
        var self = this;

        d3.json(this.getMapDataPath(), function (collection) {
          if (!collection || !collection.features) {
            console.warn("Map data empty or invalid");
            return;
          }

          // 计算包围盒 (在归一化投影下)
          var b = path.bounds(collection),
            dx = b[1][0] - b[0][0],
            dy = b[1][1] - b[0][1];

          if (dx === 0 || dy === 0) {
            console.warn("Bounds collapsed, features may be invalid", b);
          }

          var scale = 0.95 / Math.max(dx / width, dy / height);
          var translate = [
            (width - scale * (b[1][0] + b[0][0])) / 2,
            (height - scale * (b[1][1] + b[0][1])) / 2,
          ];

          projection.scale(scale).translate(translate);

          console.log("Map fit debug => bounds:", b, "dx:", dx, "dy:", dy, "scale:", scale, "translate:", translate);

          if (scale < 20) {
            console.warn("Scale 很小( <20 )，地图可能太小看不见，可尝试放大或检查坐标系");
          }

          // 重新实例化 path（也可以不重新建，这里为了语义清晰）
          path = d3.geo.path().projection(projection);

          var paths = g.selectAll("path")
            .data(collection.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "#cce5ff")
            .attr("stroke", "#333")
            .attr("stroke-width", 0.4)
            .attr("class", function (d) { return self.styleRegion(d, self); })
            .on("mouseover", function (d) { self.activateToolTip(tt, d); })
            .on("mouseout", function () { self.deactivateToolTip(tt); })
            .on("mousemove", function () {
              // 仅调试：如果看不到 tooltip 说明 div 未创建或被覆盖
              tt.style("top", (d3.event.clientY - 105) + "px").style("left", (d3.event.clientX - 25) + "px");
            })
            .on("click", function (d) { self.fireRegionClicked(d); });

          try {
            var bbox = g.node().getBBox();
            console.log("Group SVG BBox:", bbox);
          } catch (e) {
            console.warn("Unable to compute g.getBBox()", e);
          }
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
