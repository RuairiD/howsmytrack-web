import React from "react";

import { Button, Icon, Tooltip } from "antd";
import { A, Span, Strong } from "lemon-reset";

const GenreTooltipContent = (
    <Span>
        Requests of the same genre are assigned to the same groups in order to get you the most relevant and constructive feedback. Don't worry if your genre isn't listed though; just submit under <Strong>No Genre</Strong> and you'll still be grouped! <A target="_blank" rel="noopener noreferrer" href="/faq#why-is-my-tracks-genre-not-listed">Why is my genre not listed?</A>
    </Span>
);

const GenreSelectLabel = () => (
    <React.Fragment>
        Genre :
        <Tooltip
            title={GenreTooltipContent}
        >
            <Button type="link"><Icon type="question-circle" />What is this for?</Button>
        </Tooltip>
    </React.Fragment>
);

export default GenreSelectLabel;
