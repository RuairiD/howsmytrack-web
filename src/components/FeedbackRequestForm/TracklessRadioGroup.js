import React from "react";

import { Radio } from "antd";

const TracklessRadioGroup = ({ decorator }) => decorator(
    <Radio.Group className="trackless-radio" buttonStyle="solid">
        <Radio.Button value="track">
            I have a track I would like feedback on
        </Radio.Button>
        <Radio.Button value="trackless">
            I don't have a track and would just like to provide feedback for others
        </Radio.Button>
    </Radio.Group>,
);

export default TracklessRadioGroup;
