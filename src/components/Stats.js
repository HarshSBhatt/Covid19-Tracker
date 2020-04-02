import React from 'react';
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ArrowUpOutlined } from '@ant-design/icons';
import { gray } from 'd3';
function Stats(props) {
    const { stateDistrictWiseData, stateData } = props;
    const states = [];
    function cities(state) {
        const cities = [];
        cities.push({
            key: 'Cities',
            state: <b style={{ color: 'gray' }}>Cities</b>,
            confirmed:
                window.innerWidth <= 768 ? (
                    <b style={{ color: 'gray', fontSize: 9, display: 'flex', justifyContent: 'center' }}>CNF</b>
                ) : (
                        <b style={{ color: 'gray' }}>Confirmed</b>
                    ),
            active:
                window.innerWidth <= 768 ? (
                    <b style={{ color: 'gray', fontSize: 9, display: 'flex', justifyContent: 'center' }}>New</b>
                ) : (
                        <b style={{ color: 'gray' }}>New</b>
                    )
        });
        Object.keys(state).forEach((city) => {
            cities.push({
                key: city,
                state: city,
                confirmed: state[city].confirmed,
                active: state[city].delta.confirmed > 0 && (
                    <span style={{ color: 'red' }}>
                        <ArrowUpOutlined /> {state[city].delta.confirmed}
                    </span>
                )
            });
        });
        return cities;
    }
    stateData &&
        stateData.forEach((state, index) => {
            if (index !== 0 && parseInt(state.confirmed) > 0) {
                states.push({
                    key: state.state,
                    state: state.state,
                    confirmed: state.confirmed,
                    active: state.active,
                    recovered: state.recovered,
                    deaths: state.deaths,
                    children: stateDistrictWiseData[state.state]
                        ? cities(stateDistrictWiseData[state.state].districtData)
                        : null
                });
            }
        });
    const columns = [
        {
            title: 'States',
            dataIndex: 'state',
            key: 'state',
            className: 'state',
            width: '40%'
        },
        {
            title: window.innerWidth <= 768 ? 'C' : 'Confirmed',
            dataIndex: 'confirmed',
            key: 'confirmed',
            className: 'content',
            defaultSortOrder: 'descend',
            width: '15%',
            sorter: (a, b) => a.confirmed - b.confirmed
        },
        {
            title: window.innerWidth <= 768 ? 'A' : 'Active',
            dataIndex: 'active',
            key: 'active',
            className: 'content',
            width: '15%',
            sorter: (a, b) => a.active - b.active
        },
        {
            title: window.innerWidth <= 768 ? 'R' : 'Recovered',
            dataIndex: 'recovered',
            key: 'recovered',
            className: 'content',
            width: '15%',
            sorter: (a, b) => a.recovered - b.recovered
        },
        {
            title: window.innerWidth <= 768 ? 'D' : 'Deaths',
            dataIndex: 'deaths',
            key: 'deaths',
            className: 'content',
            width: '15%',
            sorter: (a, b) => a.deaths - b.deaths
        }
    ];
    return (
        <div className="table">
            <h1 style={{ padding: '20px 0' }}>States affected by CORONA Virus</h1>
            <h4>{states.length} states/uts</h4>
            {window.innerWidth <= 768 ? (
                <h3 className="tips">C: Confirmed | A: Active | R: Recovered | D: Deaths</h3>
            ) : null}
            <Table
                size="small"
                pagination={false}
                columns={columns}
                dataSource={states}
                scroll={{ y: 800 }}
                summary={() => {
                    return (
                        <React.Fragment>
                            <tr className="footer-content">
                                <th>Total</th>
                                <td>
                                    <Text type="danger">{stateData[0] && stateData[0].confirmed}</Text>
                                </td>
                                <td>
                                    <Text>{stateData[0] && stateData[0].active}</Text>
                                </td>
                                <td>
                                    <Text>{stateData[0] && stateData[0].recovered}</Text>
                                </td>
                                <td>
                                    <Text>{stateData[0] && stateData[0].deaths}</Text>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                }}
            />
        </div>
    );
}

export default Stats;
