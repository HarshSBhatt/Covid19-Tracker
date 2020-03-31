import React from 'react'
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';

function Stats(props) {
    const { stateData } = props;
    const obj = []
    stateData && stateData.forEach((state, index) => {
        if (index !== 0 && parseInt(state.confirmed) > 0) {
            obj.push({
                key: state.state,
                state: state.state,
                confirmed: state.confirmed,
                active: state.active,
                recovered: state.recovered,
                deaths: state.deaths
            })
        }
    })
    const columns = [
        {
            title: 'States',
            dataIndex: 'state',
            key: 'state',
            className: 'state',
            width: window.innerWidth <= 768 ? 120 : 200
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
    return (
        <div className="table">
            <h1 style={{ padding: '20px 0' }}>States affected by CORONA Virus</h1>
            {window.innerWidth <= 768 ? <h3 className='tips'>C: Confirmed | A: Active | R: Recovered | D: Deaths</h3> : null}
            {/* <MDBDataTable striped bordered small order={['confirmed', 'desc']} data={data} /> */}
            <Table
                size="small"
                pagination={false}
                columns={columns}
                dataSource={obj}
                scroll={{ y: 800 }}
                // bordered
                // rowKey="id"
                // onRow={(record, index) => {
                //     return {
                //         onClick: (event) => { }
                //     }
                // }
                // }
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
    )
}

export default Stats
