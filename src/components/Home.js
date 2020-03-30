import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import IndiaMap from './IndiaMap';
import StateData from './StateData';
import axios from 'axios';
import Visualization from './Visualization';
import Loader from './Loader';
import ReactGA from 'react-ga';

function App() {
    const [stateData, setStateData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [deltas, setDeltas] = useState();
    const [lastUpdated, setLastUpdated] = useState('');
    const [timeSeries, setTimeSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    const wait = async (milliseconds = 2000) => {
        await sleep(milliseconds);
    };
    useEffect(() => {
        wait(2000);
    }, [loading]);
    useEffect(
        () => {
            ReactGA.initialize('UA-162207556-1');
            ReactGA.pageview(window.location.pathname + window.location.search);
            if (fetched === false) {
                getStates();
            }
        },
        [fetched]
    );

    const getStates = () => {
        axios
            .get('https://api.covid19india.org/data.json')
            .then((response) => {
                setStateData(response.data.statewise);
                setTimeSeries(response.data.cases_time_series);
                setDeltas(response.data.key_values[0]);
                setLastUpdated(
                    response.data.statewise[0].lastupdatedtime.slice(0, 15) +
                    response.data.statewise[0].lastupdatedtime.slice(15)
                );
                setFetched(true);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (loading) return <Loader />;
    return (
        <div className="App">
            <div className="home" style={{ padding: 24 }}>
                <div className="left anim">
                    <StateData update={lastUpdated} stateData={stateData} deltas={deltas} />
                </div>
                <div className="right anim">
                    <IndiaMap states={stateData} />
                </div>
            </div>
            <div className="visualize">
                <Visualization timeSeries={timeSeries} stateData={stateData} />
            </div>
        </div>
    );
}

export default App;
