import React from 'react';
import { Spin } from 'antd';

function Loader(props) {
    const { message } = props
    return (
        <div className="loader center">
            <Spin tip={message} />
        </div>
    );
}

export default Loader;
