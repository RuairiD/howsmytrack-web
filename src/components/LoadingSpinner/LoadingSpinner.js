import React from 'react';
import { Spin } from 'antd';
import { Div, Img } from 'lemon-reset';

const LoadingSpinner = () => (
    <Div className="home-loading-container">
        <Spin 
            className="home-loading-spin"
            size="large"
            indicator={(
                <Img
                    alt=""
                    src="/logo128.png"
                />
            )}
        />
    </Div>
);

export default LoadingSpinner;