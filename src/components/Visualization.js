import React from 'react'
import { Chart } from "react-google-charts";
import { Spin } from 'antd';

function Visualization(props) {
    const { timeSeries, stateData } = props
    const dayToDay = []
    const dayTotal = []
    const stateAnalysis = []

    dayTotal.push(['Date', 'Confirmed', 'Recovered', 'Deaths'])
    dayToDay.push(['Date', 'New Positive Cases', 'Recovered', 'Deaths'])
    // console.log(timeSeries)
    timeSeries.length && timeSeries.forEach((day) => {
        dayToDay.push([day.date.slice(0, 6), parseInt(day.dailyconfirmed), parseInt(day.dailyrecovered), parseInt(day.dailydeceased)])
        dayTotal.push([day.date.slice(0, 6), parseInt(day.totalconfirmed), parseInt(day.totalrecovered), parseInt(day.totaldeceased)])
    })
    stateAnalysis.push(['State', 'Confirmed', 'Recovered', 'Deaths'])
    stateData && stateData.forEach((state, index) => {
        if (index !== 0 && parseInt(state.confirmed) !== 0 && index < 11) {
            stateAnalysis.push([state.state, parseInt(state.confirmed), parseInt(state.recovered), parseInt(state.deaths)])
        }
    })
    return (
        <React.Fragment>
            <h1 className='chart'>Visualized Information</h1>
            <h3 className='note'>Interact with graph for more information</h3>
            {window.innerWidth <= 768 ? <h3 className='note'>Rotate your screen for better experience</h3> : null}
            <div>
                <Chart
                    width="100%"
                    height={'450px'}
                    chartType="LineChart"
                    loader={<Spin style={{ marginLeft: '35%' }} tip="Loading Chart" />}
                    data={dayToDay}
                    options={{
                        title: 'Daywise Information',
                        hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                        vAxis: { title: 'Number of Cases', minValue: 0 },
                        colors: ['#ff073a', '#28a745', '#6c757d'],
                        // animation: {
                        //     startup: true,
                        //     easing: 'linear',
                        //     duration: 2000,
                        // },
                        legend: { position: 'top' },
                        // For the legend to fit, we make the chart area smaller
                        chartArea: { width: '80%', height: '70%' },
                        // lineWidth: 25
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
            <div>
                <Chart
                    width="100%"
                    height={'450px'}
                    chartType="AreaChart"
                    loader={<Spin style={{ marginLeft: '35%' }} tip="Loading Chart" />}
                    data={dayTotal}
                    options={{
                        title: 'Trend of Covid19',
                        hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                        vAxis: { title: 'Number of Cases', minValue: 0 },
                        colors: ['#ff073a', '#28a745', '#6c757d'],
                        // animation: {
                        //     startup: true,
                        //     easing: 'linear',
                        //     duration: 2000,
                        // },
                        legend: { position: 'top' },
                        // For the legend to fit, we make the chart area smaller
                        chartArea: { width: '80%', height: '70%' },
                        // lineWidth: 25
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
            <div>
                <Chart
                    width="100%"
                    height={"450px"}
                    chartType="BarChart"
                    loader={<Spin style={{ marginLeft: '35%' }} tip="Loading Chart" />}
                    data={stateAnalysis}
                    options={{
                        title: 'Top 10 states affected by Corona Virus',
                        chartArea: { width: '80%' },
                        isStacked: true,
                        // height: 700,
                        colors: ['#3366cc', '#ff9900', '#dc3912'],
                        // animation: {
                        //     startup: true,
                        //     easing: 'linear',
                        //     duration: 2000,
                        // },
                        hAxis: {
                            title: 'Number of Cases',
                            minValue: 0,
                        },
                        bar: { groupWidth: '70%' },
                        legend: { position: 'top' },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        </React.Fragment>
    )
}

export default Visualization
