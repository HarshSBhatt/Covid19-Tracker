import React, { useState, useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

function Analysis(props) {
    const { stateData } = props;
    const [confirmed, setConfirmed] = useState(0);
    const [active, setActive] = useState(0);
    const [recoveries, setRecoveries] = useState(0);
    const [deaths, setDeaths] = useState(0);

    useEffect(
        () => {
            let confirmed = 0;
            let active = 0;
            let recoveries = 0;
            let deaths = 0;
            stateData.map((state, index) => {
                if (index !== 0) {
                    confirmed += parseInt(state.confirmed);
                    active += parseInt(state.active);
                    recoveries += parseInt(state.recovered);
                    deaths += parseInt(state.deaths);
                }
                return 0;
            });
            setConfirmed(confirmed);
            setActive(active);
            setRecoveries(recoveries);
            setDeaths(deaths);
        },
        [stateData]
    );
    let a = 0;
    let r = 0;
    let d = 0;
    const NeedleTransitionDurationBad = (val) => (
        <ReactSpeedometer
            minValue={0}
            maxValue={100}
            value={val * 100}
            needleColor="steelblue"
            needleTransitionDuration={4000}
            currentValueText={'${value}%'}
            valueTextFontSize={'25px'}
            needleTransition="easeElastic"
        />
    );
    const NeedleTransitionDurationGood = (val) => (
        <ReactSpeedometer
            minValue={0}
            maxValue={100}
            value={val * 100}
            segmentColors={[
                'rgb(106, 215, 45)',
                'rgb(174, 226, 40)',
                'rgb(236, 219, 35)',
                'rgb(246, 150, 30)',
                'rgb(255, 71, 26)'
            ]}
            needleColor="steelblue"
            needleTransitionDuration={4000}
            valueTextFontSize={'25px'}
            currentValueText={'${value}%'}
            needleTransition="easeElastic"
        />
    );
    return (
        (a = (active / confirmed).toFixed(4)),
        (r = (recoveries / confirmed).toFixed(4)),
        (d = (deaths / confirmed).toFixed(4)),
        (
            <React.Fragment>
                <div className="analysis">
                    <div className="level-item is-active">
                        <h5 className="heading">Active Cases</h5>
                        {NeedleTransitionDurationGood(a)}
                    </div>
                    <div className="level-item is-recovered">
                        <h5 className="heading">Recovery Rate</h5>
                        {NeedleTransitionDurationBad(r)}
                    </div>
                    <div className="level-item is-death">
                        <h5 className="heading">Fatality Rate</h5>
                        {NeedleTransitionDurationGood(d)}
                    </div>
                </div>
            </React.Fragment>
        )
    );
}

export default Analysis;
