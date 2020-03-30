import React from 'react';
import { Spin } from 'antd';

function Loader() {
    return (
        <div className="loader center">
            <Spin tip="Fetching Latest Data" />
        </div>
    );
}

export default Loader;
