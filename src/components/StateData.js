import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import Moment from 'react-moment';
// import CountUp from 'react-countup';

function StateData(props) {
    const { update, stateData, deltas } = props;
    const time = update.split('/');

    const date = time && time[0];
    const mon = time[1];
    const year = update.slice(6, 10);
    let hr = time[2].slice(5, 7);
    const min = time[2].slice(8, 10);
    let format = update.slice(11, 13);
    if (parseInt(format) >= 13) {
        hr = parseInt(format) - 12;
    } else {
        hr = parseInt(format);
    }
    if (hr < 10) {
        hr = `0${hr}`;
    }
    const str = `${year}-${mon}-${date}T${hr}:${min}-0630`;
    // console.log(str)

    const stateCase = [];
    const columns = [
        {
            title: 'States',
            dataIndex: 'state',
            key: 'state',
            className: 'state',
            width: 150
        },
        {
            title: window.innerWidth <= 768 ? 'C' : 'Confirmed',
            dataIndex: 'confirmed',
            key: 'confirmed',
            className: 'content',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.confirmed - b.confirmed
        },
        {
            title: window.innerWidth <= 768 ? 'A' : 'Active',
            dataIndex: 'active',
            key: 'active',
            className: 'content',
            sorter: (a, b) => a.active - b.active
        },
        {
            title: window.innerWidth <= 768 ? 'R' : 'Recovered',
            dataIndex: 'recovered',
            key: 'recovered',
            className: 'content',
            sorter: (a, b) => a.recovered - b.recovered
        },
        {
            title: window.innerWidth <= 768 ? 'D' : 'Deaths',
            dataIndex: 'deaths',
            key: 'deaths',
            className: 'content',
            sorter: (a, b) => a.deaths - b.deaths
        }
    ];
    stateData &&
        stateData.forEach((state, index) => {
            if (index !== 0 && state.delta.confirmed !== 0) {
                stateCase.push({
                    key: state.state,
                    state: state.state,
                    confirmed: state.delta.confirmed,
                    active: state.delta.active,
                    recovered: state.delta.recovered,
                    deaths: state.delta.deaths
                });
            }
        });
    return (
        <React.Fragment>
            <div style={{ animationDelay: '0.3s' }}>
                <div className="header-mid">
                    <h1>COVID19 Tracker</h1>
                    <div className="last-update">
                        <h3>Last Updated: </h3>
                        <h3>
                            About  <Moment fromNow>{str}</Moment>
                        </h3>
                    </div>
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
                                        {(deltas.confirmeddelta / stateData[0].confirmed * 100).toFixed(2)}
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
                                <div>{stateData[0] && stateData[0].active}</div>
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
                                            stateData[0].active *
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
                                        {(deltas.recovereddelta / stateData[0].recovered * 100).toFixed(2)}
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
                                        {(deltas.deceaseddelta / stateData[0].deaths * 100).toFixed(2)}
                                        {'% '}
										today
									</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new-cases">
                        <h1>Today's New Cases</h1>
                        <Table
                            size="small"
                            pagination={false}
                            columns={columns}
                            dataSource={stateCase}
                            scroll={{ y: 220 }}
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
