import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class SLC extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/2vyv694u/';

    render() {
        const { totalCases } = this.props
        return (
            <React.Fragment>
                <h1>Time Series of COVID19 cases</h1>
                <p>Trend of confirmed cases</p>
                <AreaChart
                    width={window.innerWidth <= 768 ? 380 : 500}
                    height={window.innerWidth <= 768 ? 150 : 180}
                    data={totalCases}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="confirmed" stroke="#f60e0e" fill="#f61313" />
                </AreaChart>
                <p>Trend of recovered cases</p>
                <AreaChart
                    width={window.innerWidth <= 768 ? 380 : 500}
                    height={window.innerWidth <= 768 ? 150 : 180}
                    data={totalCases}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="recovered" stroke="#07b02f" fill="#82ca9d" />
                </AreaChart>
                <p>Trend of death cases</p>
                <AreaChart
                    width={window.innerWidth <= 768 ? 380 : 500}
                    height={window.innerWidth <= 768 ? 150 : 180}
                    data={totalCases}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="deaths" stroke="#595454" fill="#575252" />
                </AreaChart>
            </React.Fragment>
        );
    }
}
