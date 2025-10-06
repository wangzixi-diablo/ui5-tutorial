sap.ui.define(
  ["sap/ui/core/Control", "sap/ui/thirdparty/d3", "sap/m/MessageToast"],
  function (Control, d3, MessageToast) {
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
        oRm.write("<div");
        oRm.writeControlData(oCtrl); // writes the Control ID and enables event handling - important!
        oRm.addClass("viz"); // add a CSS class for styles common to all control instances
        oRm.writeClasses(); // this call writes the above class plus enables support for Square.addStyleClass(...)
        oRm.write(">");
        oRm.write("</div>");
      },

      onAfterRendering: function () {
        var width = 700, height = 420; // 与 viewBox 对齐

        // 防止重复渲染时叠加多个 SVG
        var root = d3.select("#" + this.getId());
        root.select("svg").remove();

        // 注入一次性样式，缩小全局 MessageToast 尺寸（约原来 1/2）
        if (!document.getElementById("mt-custom-small")) {
          var styleEl = document.createElement("style");
          styleEl.id = "mt-custom-small";
          styleEl.textContent = ".sapMMessageToast{max-width:12rem;min-width:6rem;padding:0.25rem 0.6rem;font-size:0.7rem;line-height:1.15;border-radius:4px;}";
          document.head.appendChild(styleEl);
        }

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

  var self = this; // 保留引用供事件回调使用

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
            .on("mouseover", function (d) {
              // 使用 MessageToast 显示原 tooltip 内容 + 自定义宽度
              if (d && d.properties && d.properties.description) {
                MessageToast.show(d.properties.description, { duration: 2000, width: "12rem" });
              }
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

      // 原 tooltip 相关函数已移除，改用 SAP UI5 MessageToast 展示提示文本。

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
