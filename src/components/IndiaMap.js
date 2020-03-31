import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';


function IndiaMap(props) {

    const [states, setStates] = useState(props.states);
    const [state, setState] = useState({});
    const [statistic, setStatistic] = useState({});
    const [index, setIndex] = useState(1);
    const choroplethMap = useRef(null);
    useEffect(
        () => {
            if (props.states.length > 1 && choroplethMap.current) {
                mapData(choroplethMap.current);
                setState(states[1]);
            }
        },
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
                    minConfirmed: minConfirmed
                });

            }
        },
        [states.length]
    );

    useEffect(
        () => {
            setStates(props.states);

        },
        [props.states]
    );
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
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const unemployment = d3.map();
        const projection = d3.geoMercator().center([78.9, 19]).scale(1000).translate([width / 2, height / 2]);
        const path = d3.geoPath(projection);
        // Colorbar
        const buckets = 5;
        const colors = ['#d8d1e1', '#a493b9', '#8a74a4', '#58466c', '#3f324d'];
        const colorScale = d3
            .scaleQuantile()
            .domain(
                states.map(function (d) {
                    return d.confirmed / buckets * statistic.maxConfirmed * 0.06;
                })
            )
            .range(colors);
        svg.append('g').attr('class', 'legendLinear').attr('transform', 'translate(1, 375)');
        const promises = [d3.json('/india.json')];
        Promise.all(promises).then(ready);
        function ready([india]) {
            states && states.forEach((state, index) => {
                unemployment.set(state.state.toLowerCase(), state.confirmed);
            });
            svg
                .append('g')
                .attr('class', 'states')
                .selectAll('path')
                .data(topojson.feature(india, india.objects.india).features)
                .enter()
                .append('path')
                .attr('fill', function (d) {
                    const n = unemployment.get(d.properties.ST_NM.toLowerCase());
                    return colorScale(n);
                })
                .attr('d', path)
                .attr('pointer-events', 'all')
                .on('mouseenter', (d) => {
                    handleMouseover(d.properties.ST_NM);
                    const target = d3.event.target;
                    d3.select(target.parentNode.appendChild(target)).attr('stroke', '#000000').attr('stroke-width', 2);
                })
                .on('mouseleave', (d) => {
                    // const n = unemployment.get(d.properties.ST_NM.toLowerCase());
                    const target = d3.event.target;
                    d3
                        .select(target)
                        .attr('fill', function (d) {
                            const n = unemployment.get(d.properties.ST_NM.toLowerCase());
                            return colorScale(n);
                        })
                        .attr('stroke', 'None');
                })
                .style('cursor', 'pointer')
                .append('title')
                .text(function (d) {
                    return d.properties.ST_NM.toUpperCase();
                });

            svg
                .append('path')
                .attr('stroke', '#000000')
                .attr('fill', 'none')
                .attr('stroke-width', 1)
                .attr('d', path(topojson.mesh(india, india.objects.india)));
        }
    };

    return (
        <div className="ChoroplethMap" style={{ animationDelay: '1.2s' }}>
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
                            [{state.delta ? state.delta.confirmed >= 0 ? (
                                '+' + state.delta.confirmed
                            ) : (
                                    state.delta.confirmed
                                ) : (
                                    ''
                                )}]
						</h4>
                        <h1>{state.confirmed}</h1>
                    </div>
                </div>
                <div className="level-item is-active">
                    <h5>Active</h5>
                    <div className="stats-num">
                        <h4>
                            [{state.delta ? state.delta.active >= 0 ? (
                                '+' + state.delta.active
                            ) : (
                                    state.delta.active
                                ) : (
                                    ''
                                )}]
						</h4>
                        <h1>{state.active}</h1>
                    </div>
                </div>
                <div className="level-item is-recovered">
                    <h5>Recovered</h5>
                    <div className="stats-num">
                        <h4>
                            [{state.delta ? state.delta.recovered >= 0 ? (
                                '+' + state.delta.recovered
                            ) : (
                                    state.delta.recovered
                                ) : (
                                    ''
                                )}]
						</h4>
                        <h1>{state.recovered}</h1>
                    </div>
                </div>
                <div className="level-item is-dead">
                    <h5>Deaths</h5>
                    <div className="stats-bottom">
                        <h4>
                            [{state.delta ? state.delta.deaths >= 0 ? (
                                '+' + state.delta.deaths
                            ) : (
                                    state.delta.deaths
                                ) : (
                                    ''
                                )}]
						</h4>
                        <h1>{state.deaths}</h1>
                    </div>
                </div>
            </div>
            <div className="last-update">
                <h3 className="state_name" style={{ padding: '0 20px' }}>
                    {state.state}
                </h3>
                <h3>{}</h3>
            </div>
            <div className="svg-parent">
                <svg
                    className='anim'
                    id="chart"
                    width={window.innerWidth < 768 ? 400 : 580}
                    height={window.innerWidth < 768 ? 550 : 680}
                    viewBox={`0 0 680 ${window.innerWidth < 479 ? 500 : 680}`}
                    preserveAspectRatio="xMidYMid meet"
                    ref={choroplethMap}
                />
            </div>
        </div>
    );
}

export default IndiaMap;
