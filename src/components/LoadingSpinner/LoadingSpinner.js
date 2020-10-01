import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = () => (
    <div className="home-loading-container">
        <Spin 
            className="home-loading-spin"
            size="large"
            indicator={(
                <img
                    alt=""
                    src="/logo128.png"
                />
            )}
        />
    </div>
);

export default LoadingSpinner;