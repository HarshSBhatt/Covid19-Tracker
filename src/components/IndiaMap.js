import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import * as topojson from "topojson-client";

function IndiaMap(props) {
  const [states, setStates] = useState(props.states);
  const [state, setState] = useState({});
  const [statistic, setStatistic] = useState({});
  // eslint-disable-next-line
  const [index, setIndex] = useState(1);
  const choroplethMap = useRef(null);
  useEffect(
    () => {
      if (props.states.length > 1 && choroplethMap.current) {
        mapData(choroplethMap.current);
        setState(states[1]);
      }
    },
    // eslint-disable-next-line
    [statistic]
  );

  useEffect(
    () => {
      if (states.length > 1) {
        let total = 0;
        let maxConfirmed = parseInt(states[1].confirmed);
        let minConfirmed = parseInt(states[1].confirmed);
        for (let i = 1; i < states.length; i++) {
          total += parseInt(states[i].confirmed);
          if (parseInt(states[i].confirmed) > parseInt(maxConfirmed))
            maxConfirmed = parseInt(states[i].confirmed);
          if (parseInt(states[i].confirmed) < parseInt(minConfirmed))
            minConfirmed = parseInt(states[i].confirmed);
        }
        setStatistic({
          total: total,
          maxConfirmed: maxConfirmed,
          minConfirmed: minConfirmed,
        });
      }
    },
    // eslint-disable-next-line
    [states.length]
  );

  useEffect(() => {
    setStates(props.states);
  }, [props.states]);
  const handleMouseover = (name) => {
    states.forEach((state, index) => {
      if (state.state.toLowerCase() === name.toLowerCase()) {
        setState(state);
        setIndex(index);
      }
    });
  };

  const mapData = (selector) => {
    const svg = d3.select(selector);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const unemployment = d3.map();
    const projection = d3
      .geoMercator()
      .center([78.9, 19])
      .scale(1000)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);
    // Colorbar
    const numCells = 6;
    const delta = Math.floor(statistic.maxConfirmed / (numCells - 1));
    const cells = Array.from(Array(numCells).keys()).map((i) => i * delta);
    const colors = [
      "#d8d1e1",
      "#d8bfd8",
      "#a493b9",
      "#8a74a4",
      "#58466c",
      "#3f324d",
    ];
    const colorScale = d3.scaleThreshold().domain(cells.slice(1)).range(colors);

    // .scaleQuantile()
    // .domain(
    //     states && states.map(function (d) {
    //         return d.confirmed / buckets * statistic.maxConfirmed * 0.05;
    //     })
    // )
    // .range(colors);

    function label({ i, genLength, generatedLabels, labelDelimiter }) {
      const gl = generatedLabels[i].split(" ");
      const generatedLabel = [gl[0], gl[2] - 1];
      if (i === genLength - 1) {
        const n = Math.floor(generatedLabel[0]);
        return `${n}+`;
      } else {
        if (isNaN(parseInt(generatedLabel[0]))) {
          generatedLabel[0] = 0;
        }
        const n1 = Math.floor(parseInt(generatedLabel[0]));
        const n2 = Math.floor(parseInt(generatedLabel[1]));
        return `${n1} - ${n2}`;
      }
    }
    // const color = d3.scaleSequential()
    //     .domain(['#D8BFD8', '#d8d1e1', '#a493b9', '#8a74a4', '#58466c', '#3f324d']);

    svg
      .append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(0, 500)");

    const legendLinear = legendColor()
      .shapeWidth(80)
      .cells(cells)
      .titleWidth(3)
      .labels(label)
      .title("Confirmed Cases")
      .orient("horizontal")
      .scale(colorScale);
    svg.select(".legendLinear").call(legendLinear);

    svg
      .append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(0, 500)");
    const promises = [d3.json("/india.json")];

    Promise.all(promises).then(ready);
    function ready([india]) {
      states.forEach((state) => {
        unemployment.set(state.state.toLowerCase(), state.confirmed);
      });
      svg
        .append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(india, india.objects.india).features)
        .enter()
        .append("path")
        .attr("fill", function (d) {
          const n = unemployment.get(d.properties.ST_NM.toLowerCase());
          return colorScale(n);
        })
        .attr("d", path)
        .attr("pointer-events", "all")
        .on("mouseenter", (d) => {
          handleMouseover(d.properties.ST_NM);
          const target = d3.event.target;
          d3.select(target.parentNode.appendChild(target))
            .attr("stroke", "#E05F0C")
            .attr("stroke-width", 3);
        })
        .on("mouseleave", (d) => {
          // const n = unemployment.get(d.properties.ST_NM.toLowerCase());
          const target = d3.event.target;
          d3.select(target)
            .attr("fill", function (d) {
              const n = unemployment.get(d.properties.ST_NM.toLowerCase());
              return colorScale(n);
            })
            .attr("stroke", "None");
        })
        .style("cursor", "pointer")
        .append("title")
        .text(function (d) {
          const s = `${unemployment.get(
            d.properties.ST_NM.toLowerCase()
          )} CASES IN ${d.properties.ST_NM.toUpperCase()}`;
          return s;
        });

      svg
        .append("path")
        .attr("stroke", "#000000")
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("d", path(topojson.mesh(india, india.objects.india)));
    }
  };

  return (
    <div className="ChoroplethMap" style={{ animationDelay: "1.2s" }}>
      <h1 className="header">Statewise Analysis</h1>
      <div className="last-update">
        <h3>Interact with map for more detail</h3>
        <h3>{}</h3>
      </div>
      <div className="analysis_state">
        <div className="level-item is-confirmed">
          <h5>Confirmed</h5>
          <div className="stats-num ">
            <h4>
              [
              {state
                ? state.deltaconfirmed >= 0
                  ? "+" + state.deltaconfirmed
                  : state.deltaconfirmed
                : ""}
              ]
            </h4>
            <h1>{state.confirmed}</h1>
          </div>
        </div>
        <div className="level-item is-active">
          <h5>Active</h5>
          <div className="stats-num">
            <h4>{"-"}</h4>
            <h1>{state.active}</h1>
          </div>
        </div>
        <div className="level-item is-recovered">
          <h5>Recovered</h5>
          <div className="stats-num">
            <h4>
              [
              {state
                ? state.deltarecovered >= 0
                  ? "+" + state.deltarecovered
                  : state.deltarecovered
                : ""}
              ]
            </h4>
            <h1>{state.recovered}</h1>
          </div>
        </div>
        <div className="level-item is-dead">
          <h5>Deaths</h5>
          <div className="stats-bottom">
            <h4>
              [
              {state
                ? state.deltadeaths >= 0
                  ? "+" + state.deltadeaths
                  : state.deltadeaths
                : ""}
              ]
            </h4>
            <h1>{state.deaths}</h1>
          </div>
        </div>
      </div>
      <div className="last-update">
        <h3 className="state_name" style={{ padding: "0 20px" }}>
          {state.state}
        </h3>
        <h3>{}</h3>
      </div>
      <div className="svg-parent">
        <svg
          className="anim"
          id="chart"
          width={window.innerWidth < 769 ? 400 : 580}
          height={window.innerWidth < 769 ? 550 : 640}
          viewBox={`0 0 680 ${window.innerWidth < 769 ? 500 : 640}`}
          preserveAspectRatio="xMidYMid meet"
          ref={choroplethMap}
        />
      </div>
    </div>
  );
}

export default IndiaMap;
