import React, { useEffect, useState, useCallback } from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Icon, Input, Form, Radio, Result, Row, Select, Spin, Tooltip, Typography } from 'antd';
import FeedbackRequestSummaryContent from '../FeedbackRequestSummary/FeedbackRequestSummaryContent';
import GENRE_OPTIONS from '../../genres';

const MEDIA_INFO_TIMEOUT = 500;

type Props = {
    form: object,
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
    trackless: boolean,
    genre: string,
    submittedText: object,
    makeRequest: (object) => object,
    responseName: string,
    gaCategory: string,
};

const MEDIA_INFO_QUERY = `query MediaInfo($mediaUrl: String!) {
    mediaInfo(mediaUrl: $mediaUrl) {
        mediaType
    }
}`;

const FEEDBACK_PROMPT_PLACEHOLDERS = [
    "I've mixed my own track for the first time, so any tips on mixing would be massively appreciated!",
    "I tried to be more experimental with the second drop. Does it work?",
    "I'm going for Evil Needle-style drums, but I feel like I'm missing something.",
    "Is the sub too loud?",
    "I don't have an intro yet. Any ideas?",
    "This is for a beat challenge. The rules were 90bpm, must use at least three saxophone samples...",
    "Would you consider this a beat to study/chill/relax to?",
];

const GenreTooltipContent = (
    <span>
        Requests of the same genre are assigned to the same groups in order to get you the most relevant and constructive feedback. Don't worry if your genre isn't listed though; just submit under <strong>No Genre</strong> and you'll still be grouped! <a target="_blank" rel="noopener noreferrer" href="/faq#why-is-my-tracks-genre-not-listed">
            Why is my genre not listed?
        </a>
    </span>
);

const getFeedbackPromptPlaceholder = () => {
    return '"' + FEEDBACK_PROMPT_PLACEHOLDERS[
        Math.floor(Math.random() * FEEDBACK_PROMPT_PLACEHOLDERS.length)
    ] + '"';
};

let mediaUrlTimeout = null;

const FeedbackRequestForm = ({
    form,
    feedbackRequestId,
    mediaUrl,
    feedbackPrompt,
    emailWhenGrouped,
    trackless,
    genre,
    submittedText,
    makeRequest,
    responseName,
    gaCategory,
}: Props) => {
    /*
     * Component for displaying generic feedback request form for both creation and editing.
     * Enforces URL existence check locally but relies on backend to check user is eligible to make a request.
     */

    const [requestSent, setRequestSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [invalidMediaUrl, setInvalidMediaUrl] = useState(false);
    const [feedbackPromptPlaceholder] = useState(getFeedbackPromptPlaceholder());

    const getMediaInfo = useCallback(
        () => {
            fetch(apiRoot +'/graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: MEDIA_INFO_QUERY,
                    variables: {
                        mediaUrl: form.getFieldValue('mediaUrl'),
                    },
                }),
                credentials: 'include',
            }).then(result =>
                result.json()
            ).then(data =>
                data.data.mediaInfo
            ).then((data) => {
                setMediaType(data.mediaType);
            });
        },
        [form]
    )

    useEffect(() => {
        if (mediaUrl) {
            getMediaInfo();
        }
    }, [mediaUrl, getMediaInfo]);

    useEffect(() => {
        ReactGA.event({
            category: gaCategory,
            action: "view",
        });
    }, [gaCategory]);
    
    const submitForm = (mediaUrl, feedbackPrompt, genre, emailWhenGrouped) => {
        setRequestSent(true);
        ReactGA.event({
            category: gaCategory,
            action: "submit",
        });

        makeRequest({
            feedbackRequestId: feedbackRequestId,
            genre: genre,
            mediaUrl: mediaUrl,
            feedbackPrompt: feedbackPrompt,
            emailWhenGrouped: emailWhenGrouped,
        }).then(result =>
            result.json()
        ).then(data =>
            data.data[responseName]
        ).then((data) => {
            setRequestSent(false);
            setSubmitted(data.success);
            setErrorMessage(data.error);
            setInvalidMediaUrl(data.invalidMediaUrl);

            if (data.success) {
                ReactGA.event({
                    category: gaCategory,
                    action: "success",
                });
            } else {
                ReactGA.event({
                    category: gaCategory,
                    action: "error",
                });
            }
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let mediaUrl = null;
                let feedbackPrompt = null;
                if (values.trackless !== 'trackless') {
                    mediaUrl = values.mediaUrl;
                    feedbackPrompt = values.feedbackPrompt;
                }
                submitForm(
                    mediaUrl,
                    feedbackPrompt,
                    values.genre,
                    values.emailWhenGrouped,
                )
            }
        });
    };

    const getErrorMessage = () => {
        if (invalidMediaUrl) {
            return (
                <Typography.Text>Please submit a valid Soundcloud, Google Drive, Dropbox or OneDrive URL. If you are unsure how to get the correct URL, <a href="/trackurlhelp" target="_blank" rel="noopener noreferrer">please consult our guide.</a></Typography.Text>
            )
        }
        return errorMessage
    };

    const onMediaUrlChange = () => {
        if (mediaUrlTimeout) {
            clearTimeout(mediaUrlTimeout);
        }
        mediaUrlTimeout = setTimeout(
            () => {
                getMediaInfo()
            },
            MEDIA_INFO_TIMEOUT,
        )
    };

    if (submitted) {
        return (<Result
            status="success"
            title={submittedText.title}
            subTitle={submittedText.subTitle}
        />)
    }

    if (emailWhenGrouped === undefined) {
        emailWhenGrouped = true;
    }

    let tracklessValue = 'track'
    if (trackless) {
        tracklessValue = 'trackless'
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col>
                    <Typography.Text>
                        Users are allowed to submit feedback requests once per 24 hours.<br />
                        <a href="/trackurlhelp" target="_blank" rel="noopener noreferrer">
                            Unsure how to find the correct track URL?
                        </a>
                    </Typography.Text>
                    {errorMessage && <Alert message={getErrorMessage()} type="error" showIcon />}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col>
                    <Spin spinning={requestSent}>
                        <Form onSubmit={onSubmit} className="hmt-form">
                            <Form.Item>
                                {
                                    form.getFieldDecorator('trackless', {
                                        initialValue: tracklessValue,
                                    })(<Radio.Group className="trackless-radio" buttonStyle="solid">
                                            <Radio.Button value="track">
                                                I have a track I would like feedback on
                                            </Radio.Button>
                                            <Radio.Button value="trackless">
                                                I don't have a track and would just like to provide feedback for others
                                            </Radio.Button>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                            {form.getFieldValue('trackless') !== 'trackless' && <React.Fragment>
                                    <Form.Item label="Soundcloud/Google Drive/Dropbox/OneDrive URL">
                                        {
                                            form.getFieldDecorator('mediaUrl',
                                                {
                                                    rules: [
                                                        {
                                                            // A media url isn't required if the user has declared that
                                                            // they are making a 'trackless' request i.e. only giving
                                                            // feedback, not receiving it.
                                                            required: form.getFieldValue('trackless') !== 'trackless',
                                                            message: 'Please provide a track URL',
                                                        },
                                                    ],
                                                    initialValue: mediaUrl,
                                                }
                                            )(<Input
                                                onChange={onMediaUrlChange}
                                                autoFocus
                                            />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="Is there anything you would like specific feedback on? (optional)">
                                        {
                                            form.getFieldDecorator('feedbackPrompt',
                                                {
                                                    initialValue: feedbackPrompt,
                                                }
                                            )(<Input.TextArea
                                                rows={4}
                                                placeholder={feedbackPromptPlaceholder}
                                                disabled={form.getFieldValue('trackless') === 'trackless'}
                                            />)
                                        }
                                    </Form.Item>
                                </React.Fragment>
                            }
                            <Form.Item
                                colon={false}
                                label={
                                    <React.Fragment>
                                            Genre :
                                        <Tooltip
                                            title={<GenreTooltipContent />}
                                        >
                                            <Button type="link"><Icon type="question-circle" />What is this for?</Button>
                                        </Tooltip>
                                    </React.Fragment>
                                }
                            >
                                {
                                    form.getFieldDecorator('genre',
                                        {
                                            initialValue: genre,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: (
                                                        <React.Fragment>
                                                            {form.getFieldValue('trackless') === 'trackless' && "Please select the genre you would like to provide feedback for."}
                                                            {form.getFieldValue('trackless') !== 'trackless' && "Please select a genre for this track. If you are unsure or do not see your genre listed, just select 'No Genre'."}
                                                        </React.Fragment>
                                                    ),
                                                },
                                            ],
                                        }
                                    )(<Select>
                                        {Object.keys(GENRE_OPTIONS).map((genre, i) => (
                                                <Select.Option key={i} value={genre}>
                                                {GENRE_OPTIONS[genre]}
                                            </Select.Option>
                                        ))}
                                    </Select>)
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    form.getFieldDecorator('emailWhenGrouped', {
                                        valuePropName: 'checked',
                                        initialValue: emailWhenGrouped,
                                    })(<Checkbox>Email me when this request is added to a group.</Checkbox>)
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    disabled={submitted}
                                >
                                    Submit Feedback Request
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Col>
            </Row>
            {(form.getFieldValue('trackless') !== 'trackless' && form.getFieldValue('mediaUrl')) && <Row gutter={[16, 16]}>
                <Col>
                    <Typography.Title level={4}>Preview</Typography.Title>
                    <Typography.Text>Is your media URL correct? Is it playing correctly?</Typography.Text>
                    <FeedbackRequestSummaryContent
                        feedbackRequestSummary={{
                            mediaUrl: form.getFieldValue('mediaUrl'),
                            mediaType: mediaType,
                            feedbackPrompt: form.getFieldValue('feedbackPrompt'),
                            genre: form.getFieldValue('genre'),
                        }}
                    />
                </Col>
            </Row>}
        </div>
    );
}

export default FeedbackRequestForm;
