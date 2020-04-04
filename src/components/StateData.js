import React from 'react';
import { ArrowUpOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Table, Empty } from 'antd';
import Text from 'antd/lib/typography/Text';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// import CountUp from 'react-countup';

function StateData(props) {
    const { update, stateData, deltas, stateDistrictWiseData } = props;
    const time = update.split('/');

    const date = time && time[0];
    const mon = time[1];
    const year = update.slice(6, 10);
    let hr = time[2].slice(5, 7);
    const min = time[2].slice(8, 10);

    const str = `${year}-${mon}-${date}T${hr}:${min}+0530`;

    function cities(state) {
        const cities = [];
        cities.push({
            key: 'Cities',
            state: <b style={{ color: 'gray', fontSize: 10 }}>Cities</b>,
            confirmed:
                window.innerWidth <= 768 ? (
                    <b style={{ color: 'gray', fontSize: 9, display: 'flex', justifyContent: 'center' }}>CNF</b>
                ) : (
                        <b style={{ color: 'gray', fontSize: 10 }}>Confirmed</b>
                    ),
        });
        Object.keys(state).forEach((city) => {
            if (state[city].delta.confirmed > 0) {
                cities.push({
                    key: city,
                    state: city,
                    confirmed: state[city].delta.confirmed > 0 && (
                        <span style={{ color: 'red' }}>
                            <ArrowUpOutlined /> {state[city].delta.confirmed}
                        </span>
                    )
                })
            }
        });
        return cities;
    }

    const stateCase = [];
    const columns = [
        {
            title: 'States',
            dataIndex: 'state',
            key: 'state',
            className: 'state',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.state.localeCompare(b.state),
            width: '40%'
        },
        {
            title: window.innerWidth <= 768 ? 'C' : 'Confirmed',
            dataIndex: 'confirmed',
            key: 'confirmed',
            className: 'content',
            width: '15%',
            defaultSortOrder: 'descend',
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
    let active = stateData[0] && (stateData[0].confirmed - stateData[0].recovered - stateData[0].deaths)
    stateData &&
        stateData.forEach((state, index) => {
            if (index !== 0 && state.delta.confirmed !== 0) {
                stateCase.push({
                    key: state.state,
                    state: state.state,
                    confirmed: state.delta.confirmed,
                    active: state.delta.active,
                    recovered: state.delta.recovered,
                    deaths: state.delta.deaths,
                    children: stateDistrictWiseData[state.state]
                        ? cities(stateDistrictWiseData[state.state].districtData)
                        : null
                });
            }
        });
    return (
        <React.Fragment>
            <div style={{ animationDelay: '0.3s' }}>
                <div className="header-mid">
                    <h1>India COVID19 Tracker</h1>
                    <div className="last-update">
                        <h3>Last Updated: </h3>
                        <h3>
                            About <Moment fromNow>{str}</Moment>
                        </h3>
                    </div>
                    <h5 className='know_more'>Compiled from state government | <Link to='/faq' style={{ color: 'gray' }}>Know More</Link></h5>
                    <div className="bunch-of-card anim">
                        <div className="card-wrapper">
                            <div className="card">
                                <div>
                                    <h1>Confirmed</h1>
                                </div>
                            </div>
                            <div className="number">
                                <div>{stateData[0] && stateData[0].confirmed}</div>
                                <div>
                                    <h4>
                                        [{deltas ? deltas.confirmeddelta >= 0 ? (
                                            '+' + deltas.confirmeddelta
                                        ) : (
                                                deltas.confirmeddelta
                                            ) : (
                                                ''
                                            )}]
									</h4>
                                    <h4>
                                        <ArrowUpOutlined />{' '}
                                        {(deltas.confirmeddelta / (stateData[0].confirmed - deltas.confirmeddelta) * 100).toFixed(2)}
                                        {'% '}
										today
									</h4>
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className="card">
                                <div>
                                    <h1>Active</h1>
                                </div>
                            </div>
                            <div className="number">
                                <div>{active}</div>
                                <div>
                                    <h4>
                                        [{deltas ? deltas.confirmeddelta -
                                            deltas.recovereddelta -
                                            deltas.deceaseddelta >=
                                            0 ? (
                                                '+' +
                                                (deltas.confirmeddelta -
                                                    deltas.recovereddelta -
                                                    deltas.deceaseddelta).toString()
                                            ) : (
                                                deltas.confirmeddelta - deltas.recovereddelta - deltas.deceaseddelta
                                            ) : (
                                                ''
                                            )}]
									</h4>
                                    <h4>
                                        <ArrowUpOutlined />{' '}
                                        {((deltas.confirmeddelta - deltas.recovereddelta - deltas.deceaseddelta) /
                                            (active - (deltas.confirmeddelta - deltas.recovereddelta - deltas.deceaseddelta)) *
                                            100).toFixed(2)}
                                        {'% '}
										today
									</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bunch-of-card anim">
                        <div className="card-wrapper">
                            <div className="card">
                                <div>
                                    <h1>Recovered</h1>
                                </div>
                            </div>
                            <div className="number">
                                <div>{stateData[0] && stateData[0].recovered}</div>
                                <div>
                                    <h4>
                                        [{deltas ? deltas.recovereddelta >= 0 ? (
                                            '+' + deltas.recovereddelta
                                        ) : (
                                                deltas.recovereddelta
                                            ) : (
                                                ''
                                            )}]
									</h4>
                                    <h4>
                                        <ArrowUpOutlined />{' '}
                                        {(deltas.recovereddelta / (stateData[0].recovered - deltas.recovereddelta) * 100).toFixed(2)}
                                        {'% '}
										today
									</h4>
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className="card">
                                <div>
                                    <h1>Deaths</h1>
                                </div>
                            </div>
                            <div className="number">
                                <div>{stateData[0] && stateData[0].deaths}</div>
                                <div>
                                    <h4>
                                        [{deltas ? deltas.deceaseddelta >= 0 ? (
                                            '+' + deltas.deceaseddelta
                                        ) : (
                                                deltas.deceaseddelta
                                            ) : (
                                                ''
                                            )}]
									</h4>
                                    <h4>
                                        <ArrowUpOutlined />{' '}
                                        {(deltas.deceaseddelta / (stateData[0].deaths - deltas.deceaseddelta) * 100).toFixed(2)}
                                        {'% '}
										today
									</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new-cases">
                        <h1>Today's New Cases</h1>
                        <h5 className='new_update'><span className='cities'>UPDATE</span> Click  <PlusSquareOutlined />  to get cities detail</h5>
                        {window.innerWidth <= 768 ? <h3 className='tips'>C: Confirmed | A: Active | R: Recovered | D: Deaths</h3> : null}
                        <Table
                            size="small"
                            pagination={false}
                            columns={columns}
                            dataSource={stateCase}
                            locale={{ emptyText: <Empty description={<span>Today's data is yet to be updated</span>} /> }}
                            scroll={window.innerWidth >= 768 && { y: 220 }}
                            summary={() => {
                                return (
                                    <React.Fragment>
                                        <tr className="footer-content">
                                            <th>Total</th>
                                            <td>
                                                <Text type="danger">
                                                    {stateData[0] && stateData[0].delta.confirmed}
                                                </Text>
                                            </td>
                                            <td>
                                                <Text>{stateData[0] && stateData[0].delta.active}</Text>
                                            </td>
                                            <td>
                                                <Text>{stateData[0] && stateData[0].delta.recovered}</Text>
                                            </td>
                                            <td>
                                                <Text>{stateData[0] && stateData[0].delta.deaths}</Text>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default StateData;
