import React from "react";

import { Select } from "antd";
import GENRE_OPTIONS from "../../genres";

const GenreSelect = ({ decorator }) => decorator(
    <Select>
        {Object.keys(GENRE_OPTIONS).map((genreOption) => (
            <Select.Option key={genreOption} value={genreOption}>
                {GENRE_OPTIONS[genreOption]}
            </Select.Option>
        ))}
    </Select>,
);

export default GenreSelect;
