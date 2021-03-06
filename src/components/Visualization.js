import React from 'react';
import SLC from './charts/SLC';
import SBC from './charts/SBC';
import LC from './charts/LC';

function Visualization(props) {
    const { timeSeries, stateData } = props;
    const dayTotal = [];
    const india_population = 1339200000
    const million = 1000000
    const perMillion = stateData && (((stateData[0].confirmed * million) / india_population)).toFixed(2)
    timeSeries.length &&
        timeSeries.forEach((day) => {
            dayTotal.push({
                date: day.date.slice(0, 6),
                confirmed: parseInt(day.dailyconfirmed),
                recovered: parseInt(day.dailyrecovered),
                deaths: parseInt(day.dailydeceased)
            });
        });

    const totalCases = [];
    timeSeries.length &&
        timeSeries.forEach((day) => {
            totalCases.push({
                date: day.date.slice(0, 6),
                confirmed: parseInt(day.totalconfirmed),
                recovered: parseInt(day.totalrecovered),
                deaths: parseInt(day.totaldeceased)
            });
        });
    const date = timeSeries[timeSeries.length - 1].date
    const day = parseInt(date.slice(0, 3))
    let sup = 'th'
    if (day === 1) {
        sup = 'st'
    }
    else if (day === 2) {
        sup = 'nd'
    }
    else if (day === 3) {
        sup = 'rd'
    }
    else {
        sup = 'th'
    }
    const top10 = [...stateData.slice(1, 12)]
    return (
        <React.Fragment>
            <h1 className="chart">Visualized Information</h1>
            <h3 className="dateGraph">{`As of ${day}`}<sup>{sup}</sup>{` ${date.slice(3)}`}</h3>
            <div className="chart-wrapper">
                <div className="case_rates wid">

                    <h1>Data Analysis</h1>
                    <div className="card-wrapper">
                        <div className="card">
                            <div>
                                <h1>Confirmed Cases</h1>
                            </div>
                            <div>
                                <h1>{perMillion}{' '}people / million</h1>
                            </div>
                        </div>
                    </div>
                    <div className="card-wrapper">
                        <div className="card">
                            <div>
                                <h1>Active Cases</h1>
                            </div>
                            <div>
                                <h1>{stateData && (stateData[0].active / stateData[0].confirmed * 100).toFixed(2)}%</h1>
                            </div>
                        </div>
                    </div>
                    <div className="card-wrapper">
                        <div className="card">
                            <div>
                                <h1>Recovery Rate</h1>
                            </div>
                            <div>
                                <h1>{stateData && (stateData[0].recovered / stateData[0].confirmed * 100).toFixed(2)}%</h1>
                            </div>
                        </div>
                    </div>
                    <div className="card-wrapper">
                        <div className="card">
                            <div>
                                <h1>Death Rate</h1>
                            </div>
                            <div>
                                <h1>{stateData && (stateData[0].deaths / stateData[0].confirmed * 100).toFixed(2)}%</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='wid text_slc'>
                    <SLC totalCases={totalCases} />
                </div>
            </div>
            <h1 className='title_chart'>Daywise Information</h1>
            <div className='bar_chart'>
                <LC dayTotal={dayTotal} />
            </div>
            <h1 className='title_chart'>Top 10 States affected by Corona Virus</h1>
            <div className='bar_chart'>
                <SBC top10={top10} />
            </div>
        </React.Fragment>
    );
}

export default Visualization;

// stateData &&
    //     stateData.forEach((state, index) => {
    //         if (index !== 0 && parseInt(state.confirmed) !== 0) {
    //             stateAnalysis.push({
    //                 state: state.state,
    //                 abbr: state.statecode,
    //                 active: parseInt(state.active),
    //                 recovered: parseInt(state.recovered),
    //                 deaths: parseInt(state.deaths),
    //                 confirmed: parseInt(state.confirmed)
    //             });
    //         }
    //     });

    // function compare(a, b) {
    //     const bandA = a.confirmed;
    //     const bandB = b.confirmed;

    //     let comparison = 0;
    //     if (bandA < bandB) {
    //         comparison = 1;
    //     } else if (bandA > bandB) {
    //         comparison = -1;
    //     }
    //     return comparison;
    // }