import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class LC extends PureComponent {
    render() {
        const { dayTotal } = this.props
        return (
            <LineChart
                width={window.innerWidth <= 768 ? 400 : 1000}
                height={window.innerWidth <= 768 ? 400 : 600}
                data={dayTotal}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="confirmed" stroke="#f60e0e" dot={null} />
                <Line type="monotone" dataKey="recovered" stroke="#07b02f" dot={null} />
                <Line type="monotone" dataKey="deaths" stroke="#595454" dot={null} />
            </LineChart>
        );
    }
}
