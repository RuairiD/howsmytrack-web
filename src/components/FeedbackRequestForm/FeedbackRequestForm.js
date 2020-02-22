import React from 'react';
import ReactGA from 'react-ga';

import apiRoot from '../../apiRoot';

import { Alert, Button, Checkbox, Col, Icon, Input, Form, Result, Row, Select, Spin, Tooltip, Typography } from 'antd';
import FeedbackRequestSummaryContent from '../FeedbackRequestSummary/FeedbackRequestSummaryContent';
import GENRE_OPTIONS from '../../genres';

const MEDIA_INFO_TIMEOUT = 500;

type Props = {
    form: object,
    feedbackRequestId: number,
    mediaUrl: string,
    feedbackPrompt: string,
    emailWhenGrouped: boolean,
    genre: string,
    makeRequest: (object) => object,
    responseName: string,
    gaCategory: string,
};

type State = {
    requestSent: boolean,
    errorMessage: string,
    submitted: boolean,
    invalidMediaUrl: boolean,
    feedbackPromptPlaceholder: string,
    // Used to display inline preview to verify mediaUrl
    mediaType: string,
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
];

class FeedbackRequestForm extends React.Component<Props, State> {
    /*
     * Component for displaying generic feedback request form for both creation and editing.
     * Enforces URL existence check locally but relies on backend to check user is eligible to make a request.
     */
    mediaUrlTimeout = null;

    getFeedbackPromptPlaceholder = () => {
        return '"' + FEEDBACK_PROMPT_PLACEHOLDERS[
            Math.floor(Math.random() * FEEDBACK_PROMPT_PLACEHOLDERS.length)
        ] + '"';
    };

    state = {
        requestSent: false,
        errorMessage: null,
        submitted: false,
        invalidMediaUrl: false,
        feedbackPromptPlaceholder: this.getFeedbackPromptPlaceholder(),
    };

    componentDidMount() {
        if (this.props.mediaUrl) {
            this.getMediaInfo();
        }
        ReactGA.event({
            category: this.props.gaCategory,
            action: "view",
        });
    }
    
    submitForm = (mediaUrl, feedbackPrompt, genre, emailWhenGrouped) => {
        this.setState({
            requestSent: true,
        })
        ReactGA.event({
            category: this.props.gaCategory,
            action: "submit",
        });
        return this.props.makeRequest({
            feedbackRequestId: this.props.feedbackRequestId,
            genre: genre,
            mediaUrl: mediaUrl,
            feedbackPrompt: feedbackPrompt,
            emailWhenGrouped: emailWhenGrouped,
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                requestSent: false,
                submitted: data['data'][this.props.responseName].success,
                errorMessage: data['data'][this.props.responseName].error,
                invalidMediaUrl: data['data'][this.props.responseName].invalidMediaUrl,
            });

            if (data['data'][this.props.responseName].success) {
                ReactGA.event({
                    category: this.props.gaCategory,
                    action: "success",
                });
            } else {
                ReactGA.event({
                    category: this.props.gaCategory,
                    action: "error",
                });
            }
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(
                    values.mediaUrl,
                    values.feedbackPrompt,
                    values.genre,
                    values.emailWhenGrouped,
                )
            }
        });
    };

    getErrorMessage = () => {
        if (this.state.invalidMediaUrl) {
            return (
                <Typography.Text>Please submit a valid Soundcloud, Google Drive, Dropbox or OneDrive URL. If you are unsure how to get the correct URL, <a href="/trackurlhelp" target="_blank" rel="noopener noreferrer">please consult our guide.</a></Typography.Text>
            )
        }
        return this.state.errorMessage
    };

    getMediaInfo = () => {
        fetch(apiRoot +'/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: MEDIA_INFO_QUERY,
                variables: {
                    mediaUrl: this.props.form.getFieldValue('mediaUrl'),
                },
            }),
            credentials: 'include',
        }).then(result =>
            result.json()
        ).then((data) => {
            this.setState({
                mediaType: data['data']['mediaInfo'].mediaType,
            });
        });
    };

    onMediaUrlChange = () => {
        if (this.mediaUrlTimeout) {
            clearTimeout(this.mediaUrlTimeout);
        }
        this.mediaUrlTimeout = setTimeout(
            () => {
                this.getMediaInfo()
            },
            MEDIA_INFO_TIMEOUT,
        )
    };

    render() {
        if (this.state.submitted) {
            return (<Result
                status="success"
                title={this.props.submittedText.title}
                subTitle={this.props.submittedText.subTitle}
            />)
        }

        let emailWhenGrouped = this.props.emailWhenGrouped;
        if (emailWhenGrouped === undefined) {
            emailWhenGrouped = true;
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
                        {this.state.errorMessage && <Alert message={this.getErrorMessage()} type="error" />}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Spin spinning={this.state.requestSent}>
                            <Form onSubmit={this.onSubmit} className="hmt-form">
                                <Form.Item label="Soundcloud/Google Drive/Dropbox/OneDrive URL">
                                    {
                                        this.props.form.getFieldDecorator('mediaUrl',
                                            {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please provide a track URL',
                                                    },
                                                ],
                                                initialValue: this.props.mediaUrl,
                                            }
                                        )(<Input onChange={this.onMediaUrlChange} autoFocus />)
                                    }
                                </Form.Item>
                                <Form.Item
                                    colon={false}
                                    label={
                                        <React.Fragment>
                                             Genre :
                                            <Tooltip
                                                title="Requests of the same genre are assigned to the same groups in order to get you the most relevant and constructive feedback. Don't worry if your genre isn't listed though; you can just submit under 'No Genre' and you'll still be grouped!"
                                            >
                                                <Button type="link"><Icon type="question-circle" />What is this for?</Button>
                                            </Tooltip>
                                        </React.Fragment>
                                    }
                                >
                                    {
                                        this.props.form.getFieldDecorator('genre',
                                            {
                                                initialValue: this.props.genre,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please select a genre for this track. If you are unsure or do not see your genre listed, just select 'No Genre'.",
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
                                <Form.Item label="Is there anything you would like specific feedback on? (optional)">
                                    {
                                        this.props.form.getFieldDecorator('feedbackPrompt',
                                            {
                                                initialValue: this.props.feedbackPrompt,
                                            }
                                        )(<Input.TextArea
                                            rows={4}
                                            placeholder={this.state.feedbackPromptPlaceholder}
                                        />)
                                    }
                                </Form.Item>
                                <Form.Item>
                                    {
                                        this.props.form.getFieldDecorator('emailWhenGrouped', {
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
                                        disabled={this.state.submitted}
                                    >
                                        Submit Feedback Request
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Col>
                </Row>
                {this.props.form.getFieldValue('mediaUrl') && <Row gutter={[16, 16]}>
                    <Col>
                        <Typography.Title level={4}>Preview</Typography.Title>
                        <Typography.Text>Is your media URL correct? Is it playing correctly?</Typography.Text>
                        <FeedbackRequestSummaryContent
                            feedbackRequestSummary={{
                                mediaUrl: this.props.form.getFieldValue('mediaUrl'),
                                mediaType: this.state.mediaType,
                                feedbackPrompt: this.props.form.getFieldValue('feedbackPrompt'),
                            }}
                        />
                    </Col>
                </Row>}
            </div>
        );
    }
}

export default FeedbackRequestForm;
