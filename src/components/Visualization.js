import React from 'react';
import SLC from './charts/SLC';
import SBC from './charts/SBC';
import LC from './charts/LC';

function Visualization(props) {
    const { timeSeries, stateData } = props;
    const dayTotal = [];
    const stateAnalysis = [];
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
    stateData &&
        stateData.forEach((state, index) => {
            if (index !== 0 && parseInt(state.confirmed) !== 0) {
                stateAnalysis.push({
                    state: state.state,
                    abbr: state.state.slice(0, 3),
                    active: parseInt(state.active),
                    recovered: parseInt(state.recovered),
                    deaths: parseInt(state.deaths),
                    confirmed: parseInt(state.confirmed)
                });
            }
        });

    function compare(a, b) {
        const bandA = a.confirmed;
        const bandB = b.confirmed;

        let comparison = 0;
        if (bandA < bandB) {
            comparison = 1;
        } else if (bandA > bandB) {
            comparison = -1;
        }
        return comparison;
    }
    stateAnalysis.sort(compare);
    const top10 = [...stateAnalysis.slice(0, 11)]
    return (
        <React.Fragment>
            <h1 className="chart">Visualized Information</h1>
            <h3 className="dateGraph">As of {timeSeries[timeSeries.length - 1].date}</h3>
            <div className="chart-wrapper">
                <div className="case_rates wid">
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
