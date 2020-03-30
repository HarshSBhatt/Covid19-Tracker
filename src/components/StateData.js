import React from 'react';
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { MDBDataTable } from 'mdbreact';

function StateData(props) {
    const { update, stateData, deltas } = props;
    const obj = [];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const columns = [
        {
            title: 'States',
            dataIndex: 'state',
            key: 'state',
            className: 'state',
            width: 120
        },
        {
            title: window.innerWidth <= 768 ? 'C' : 'Confirmed',
            dataIndex: 'confirmed',
            key: 'confirmed',
            className: 'content',
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

    const time = update.split('/');
    const date = time && time[0];
    const mon = time && month[parseInt(time[1])];
    const year = update.slice(6, 10);
    let ss = '';
    if (date === '1') {
        ss = 'st';
    } else if (date === '2') {
        ss = 'nd';
    } else if (date === '3') {
        ss = 'rd';
    } else {
        ss = 'th';
    }
    let h = 0;
    let am_pm = 'AM';
    let format = update.slice(11, 13);
    if (parseInt(format) >= 13) {
        h = parseInt(format) - 12;
    } else {
        h = parseInt(format)
    }
    if (parseInt(format) >= 12) {
        am_pm = 'PM'
    }
    stateData && stateData.forEach((state, index) => {
        if (index !== 0 && parseInt(state.confirmed) > 0) {
            obj.push({
                state: state.state,
                confirmed: state.confirmed,
                active: state.active,
                recovered: state.recovered,
                deaths: state.deaths
            })
        }
    })
    // const data = {
    //     columns: [
    //         {
    //             label: 'States',
    //             field: 'state',
    //             sort: 'asc'
    //             // className: 'state',
    //             // width: 120
    //         },
    //         {
    //             label: window.innerWidth <= 768 ? 'C' : 'Confirmed',
    //             field: 'confirmed',
    //             sort: 'desc'
    //             // className: 'content',
    //             // sorter: (a, b) => a.confirmed - b.confirmed
    //         },
    //         {
    //             label: window.innerWidth <= 768 ? 'A' : 'Active',
    //             field: 'active',
    //             sort: 'asc'
    //             // className: 'content',
    //             // sorter: (a, b) => a.active - b.active
    //         },
    //         {
    //             label: window.innerWidth <= 768 ? 'R' : 'Recovered',
    //             field: 'recovered',
    //             sort: 'asc'
    //             // className: 'content',
    //             // sorter: (a, b) => a.recovered - b.recovered
    //         },
    //         {
    //             label: window.innerWidth <= 768 ? 'D' : 'Deaths',
    //             label: 'deaths',
    //             sort: 'asc'
    //             // key: 'deaths',
    //             // className: 'content',
    //             // sorter: (a, b) => a.deaths - b.deaths
    //         }
    //     ], rows: obj
    // }
    /* {Object.keys(stateData).forEach((val, index) => {
                    if (stateData[val].confirmed > 0 && val > 0) {
                        obj.push({
                            key: stateData[val].state,
                            state: stateData[val].state,
                            confirmed: parseInt(stateData[val].confirmed),
                            active: parseInt(stateData[val].active),
                            recovered: parseInt(stateData[val].recovered),
                            deaths: parseInt(stateData[val].deaths)
                        });
                    }
                })} */
    return (
        <React.Fragment>
            <div style={{ animationDelay: '0.3s' }}>
                <div className="header-mid">
                    <h1>COVID19 Tracker</h1>
                    <div className="last-update">
                        <h3>Last Updated: </h3>
                        <h3>
                            {date}
                            <sup>{ss}</sup>
                            {` ${mon}, ${year} at ${h}`}
                            {update.slice(13)} {am_pm}
                        </h3>
                    </div>
                    <div className="analysis_india">
                        <div className="level-item is-confirmed">
                            <h5>Confirmed</h5>
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
                                <h1>{stateData[0] && stateData[0].confirmed}</h1>
                            </div>
                        </div>

                        <div className="level-item is-active">
                            <h5 className="heading">Active</h5>
                            <div>
                                <h4>
                                    [{deltas ? deltas.confirmeddelta - deltas.recovereddelta - deltas.deceaseddelta >=
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
                                <h1 className="title has-text-info">{stateData[0] && stateData[0].active}</h1>
                            </div>
                        </div>

                        <div className="level-item is-recovered">
                            <h5 className="heading">Recovered</h5>
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
                                <h1 className="title has-text-success">{stateData[0] && stateData[0].recovered}</h1>
                            </div>
                        </div>
                        <div className="level-item is-dead">
                            <h5 className="heading">Deaths</h5>
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
                                <h1 className="title has-text-grey">{stateData[0] && stateData[0].deaths}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="table">
                        {/* <MDBDataTable striped bordered small order={['confirmed', 'desc']} data={data} /> */}
                        <Table
                            size="small"
                            pagination={false}
                            columns={columns}
                            dataSource={obj}
                            scroll={{ y: 500 }}
                            bordered
                            rowKey="id"
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
                </div>
            </div>
        </React.Fragment>
    );
}

export default StateData;
