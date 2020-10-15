import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { useQuery, useMutation } from "react-query";

import { Alert, Button, Checkbox, Col, Icon, Input, Form, Radio, Result, Row, Select, Spin, Tooltip, Typography } from "antd";
import { A, Div, Span, Strong } from "lemon-reset";
import apiRoot from "../../apiRoot";
import FeedbackRequestSummaryContent from "../FeedbackRequestSummary/FeedbackRequestSummaryContent";
import GENRE_OPTIONS from "../../genres";

const MEDIA_INFO_TIMEOUT = 500;

type Props = {
    form: Object,
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
    trackless: boolean,
    genre: string,
    submittedText: Object,
    makeRequest: (Object) => Object,
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
    <Span>
        Requests of the same genre are assigned to the same groups in order to get you the most relevant and constructive feedback. Don't worry if your genre isn't listed though; just submit under <Strong>No Genre</Strong> and you'll still be grouped! <A target="_blank" rel="noopener noreferrer" href="/faq#why-is-my-tracks-genre-not-listed">Why is my genre not listed?</A>
    </Span>
);

const getFeedbackPromptPlaceholder = () => `"${FEEDBACK_PROMPT_PLACEHOLDERS[
    Math.floor(Math.random() * FEEDBACK_PROMPT_PLACEHOLDERS.length)
]}"`;

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
    const [feedbackPromptPlaceholder] = useState(getFeedbackPromptPlaceholder());

    const getMediaInfo = () => (
        fetch(`${apiRoot}/graphql/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: MEDIA_INFO_QUERY,
                variables: {
                    mediaUrl: form.getFieldValue("mediaUrl"),
                },
            }),
            credentials: "include",
        }).then((result) => result.json()).then((response) => response.data.mediaInfo)
    );

    const { data: mediaInfo, refetch: refetchMediaInfo } = useQuery(MEDIA_INFO_QUERY, getMediaInfo, { enabled: false });

    useEffect(() => {
        if (mediaUrl) {
            refetchMediaInfo();
        }
    }, [mediaUrl, refetchMediaInfo]);

    useEffect(() => {
        ReactGA.event({
            category: gaCategory,
            action: "view",
        });
    }, [gaCategory]);

    const submitForm = ({ formMediaUrl, formFeedbackPrompt, formGenre, formEmailWhenGrouped }) => {
        ReactGA.event({
            category: gaCategory,
            action: "submit",
        });

        return makeRequest({
            feedbackRequestId,
            genre: formGenre,
            mediaUrl: formMediaUrl,
            feedbackPrompt: formFeedbackPrompt,
            emailWhenGrouped: formEmailWhenGrouped,
        }).then((result) => result.json()).then((data) => data.data[responseName]);
    };

    const [submitFormMutate, { isLoading, data }] = useMutation(submitForm);

    if (data) {
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
    }

    const onSubmit = (event) => {
        event.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let formMediaUrl = null;
                let formFeedbackPrompt = null;
                if (values.trackless !== "trackless") {
                    formMediaUrl = values.mediaUrl;
                    formFeedbackPrompt = values.feedbackPrompt;
                }
                submitFormMutate({
                    formMediaUrl,
                    formFeedbackPrompt,
                    formGenre: values.genre,
                    formEmailWhenGrouped: values.emailWhenGrouped,
                });
            }
        });
    };

    const getErrorMessage = (errorMessage, invalidMediaUrl) => {
        if (invalidMediaUrl) {
            return (
                <Typography.Text>Please submit a valid Soundcloud, Google Drive, Dropbox or OneDrive URL. If you are unsure how to get the correct URL, <A href="/trackurlhelp" target="_blank" rel="noopener noreferrer">please consult our guide.</A></Typography.Text>
            );
        }
        return errorMessage;
    };

    const onMediaUrlChange = () => {
        if (mediaUrlTimeout) {
            clearTimeout(mediaUrlTimeout);
        }
        mediaUrlTimeout = setTimeout(
            () => {
                refetchMediaInfo();
            },
            MEDIA_INFO_TIMEOUT,
        );
    };

    if (data && data.success) {
        return (
            <Result
                status="success"
                title={submittedText.title}
                subTitle={submittedText.subTitle}
            />
        );
    }

    let emailWhenGroupedValue = emailWhenGrouped;
    if (emailWhenGroupedValue === undefined) {
        emailWhenGroupedValue = true;
    }

    let tracklessValue = "track";
    if (trackless) {
        tracklessValue = "trackless";
    }

    const fieldDecorators = {
        mediaUrl: form.getFieldDecorator("mediaUrl",
            {
                rules: [
                    {
                        // A media url isn't required if the user has declared that
                        // they are making a 'trackless' request i.e. only giving
                        // feedback, not receiving it.
                        required: form.getFieldValue("trackless") !== "trackless",
                        message: "Please provide a track URL",
                    },
                ],
                initialValue: mediaUrl,
            }),
        feedbackPrompt: form.getFieldDecorator("feedbackPrompt",
            {
                initialValue: feedbackPrompt,
            }),
        genre: form.getFieldDecorator("genre",
            {
                initialValue: genre,
                rules: [
                    {
                        required: true,
                        message: (
                            <React.Fragment>
                                {form.getFieldValue("trackless") === "trackless" && "Please select the genre you would like to provide feedback for."}
                                {form.getFieldValue("trackless") !== "trackless" && "Please select a genre for this track. If you are unsure or do not see your genre listed, just select 'No Genre'."}
                            </React.Fragment>
                        ),
                    },
                ],
            }),
        emailWhenGrouped: form.getFieldDecorator("emailWhenGrouped", {
            valuePropName: "checked",
            initialValue: emailWhenGroupedValue,
        }),
    };

    return (
        <Div>
            <Row gutter={[16, 16]}>
                <Col>
                    <Typography.Text>
                        Users are allowed to submit feedback requests once per 24 hours.<br />
                        <A href="/trackurlhelp" target="_blank" rel="noopener noreferrer">
                            Unsure how to find the correct track URL?
                        </A>
                    </Typography.Text>
                    {data && data.error && <Alert message={getErrorMessage(data.error, data.invalidMediaUrl)} type="error" showIcon />}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col>
                    <Spin spinning={isLoading}>
                        <Form onSubmit={onSubmit} className="hmt-form">
                            <Form.Item>
                                {
                                    form.getFieldDecorator("trackless", {
                                        initialValue: tracklessValue,
                                    })(
                                        <Radio.Group className="trackless-radio" buttonStyle="solid">
                                            <Radio.Button value="track">
                                                I have a track I would like feedback on
                                            </Radio.Button>
                                            <Radio.Button value="trackless">
                                                I don't have a track and would just like to provide feedback for others
                                            </Radio.Button>
                                        </Radio.Group>,
                                    )
                                }
                            </Form.Item>
                            {form.getFieldValue("trackless") !== "trackless" && (
                                <React.Fragment>
                                    <Form.Item label="Soundcloud/Google Drive/Dropbox/OneDrive URL">
                                        {fieldDecorators.mediaUrl(
                                            <Input
                                                onChange={onMediaUrlChange}
                                                autoFocus
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Is there anything you would like specific feedback on? (optional)">
                                        {fieldDecorators.feedbackPrompt(
                                            <Input.TextArea
                                                rows={4}
                                                placeholder={feedbackPromptPlaceholder}
                                                disabled={form.getFieldValue("trackless") === "trackless"}
                                            />,
                                        )}
                                    </Form.Item>
                                </React.Fragment>
                            )}
                            <Form.Item
                                colon={false}
                                label={(
                                    <React.Fragment>
                                        Genre :
                                        <Tooltip
                                            title={GenreTooltipContent}
                                        >
                                            <Button type="link"><Icon type="question-circle" />What is this for?</Button>
                                        </Tooltip>
                                    </React.Fragment>
                                )}
                            >
                                {fieldDecorators.genre(
                                    <Select>
                                        {Object.keys(GENRE_OPTIONS).map((genreOption) => (
                                            <Select.Option key={genreOption} value={genreOption}>
                                                {GENRE_OPTIONS[genreOption]}
                                            </Select.Option>
                                        ))}
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {fieldDecorators.emailWhenGrouped(<Checkbox>Email me when this request is added to a group.</Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isLoading || (data && data.success)}
                                >
                                    Submit Feedback Request
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Col>
            </Row>
            {(form.getFieldValue("trackless") !== "trackless" && form.getFieldValue("mediaUrl") && mediaInfo) && (
                <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Title level={4}>Preview</Typography.Title>
                        <Typography.Text>Is your media URL correct? Is it playing correctly?</Typography.Text>
                        <FeedbackRequestSummaryContent
                            feedbackRequestSummary={{
                                mediaUrl: form.getFieldValue("mediaUrl"),
                                mediaType: mediaInfo.mediaType,
                                feedbackPrompt: form.getFieldValue("feedbackPrompt"),
                                genre: form.getFieldValue("genre"),
                            }}
                        />
                    </Col>
                </Row>
            )}
        </Div>
    );
};

export default FeedbackRequestForm;
