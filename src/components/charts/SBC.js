import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class SBC extends PureComponent {
    render() {
        const { top10 } = this.props
        return (
            <BarChart
                width={window.innerWidth <= 768 ? 400 : 1000}
                height={window.innerWidth <= 768 ? 400 : 600}
                data={top10}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='state' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" stackId="a" fill="#8884d8" />
                <Bar dataKey="recovered" stackId="a" fill="#82ca9d" />
                <Bar dataKey="deaths" stackId="a" fill="#f61313" />

            </BarChart>
        );
    }
}
