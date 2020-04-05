import React, { useState, useEffect } from 'react';
import IndiaMap from './IndiaMap';
import StateData from './StateData';
import Visualization from './Visualization';
import axios from 'axios';
import Loader from './Loader';
import Footer from './Footer';
import Stats from './Stats';

function App() {
    const [states, setStates] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('');
    const [timeSeries, setTimeSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});

    useEffect(
        () => {
            if (fetched === false) {
                getStates();
            }
        },
        [fetched]
    );

    const getStates = async () => {
        try {
            const [response, stateDistrictWiseResponse] = await Promise.all([
                axios.get('https://api.covid19india.org/data.json'),
                axios.get('https://api.covid19india.org/state_district_wise.json'),
            ]);
            setStates(response.data.statewise);
            setTimeSeries(response.data.cases_time_series);
            setLastUpdated(response.data.statewise[0].lastupdatedtime);
            setStateDistrictWiseData(stateDistrictWiseResponse.data);
            setFetched(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    function compare(a, b) {
        const bandA = parseInt(a.confirmed);
        const bandB = parseInt(b.confirmed);
        let comparison = 0;
        if (bandA < bandB) {
            comparison = 1;
        } else if (bandA > bandB) {
            comparison = -1;
        }
        return comparison;
    }
    const stateData = []
    states && states.forEach((state) => {
        stateData.push({
            active: parseInt(state.active),
            confirmed: parseInt(state.confirmed),
            recovered: parseInt(state.recovered),
            deaths: parseInt(state.deaths),
            deltaconfirmed: parseInt(state.deltaconfirmed),
            deltarecovered: parseInt(state.deltarecovered),
            deltadeaths: parseInt(state.deltadeaths),
            deltaactive: parseInt(state.deltaconfirmed) - parseInt(state.deltarecovered) - parseInt(state.deltadeaths),
            lastupdatedtime: state.lastupdatedtime,
            state: state.state,
            statecode: state.statecode
        })
    })
    stateData.sort(compare);
    // const district  = {}

    if (loading) return <Loader message='Fetching Latest Data' />;
    return (
        <React.Fragment>
            <div className="covid19app">
                <div className="home" style={{ padding: 24 }}>
                    <div className="left anim">
                        <StateData update={lastUpdated} stateData={stateData} stateDistrictWiseData={stateDistrictWiseData} />
                    </div>
                    <div className="right anim">
                        <IndiaMap states={stateData} />
                    </div>
                </div>
                <div>
                    <Stats stateDistrictWiseData={stateDistrictWiseData} stateData={stateData} />
                </div>
                <div className="visualize">
                    <Visualization timeSeries={timeSeries} stateData={stateData} />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default App;
