import React, { useState } from "react";

import { Button, Checkbox, Input, Form, Spin } from "antd";
import getFeedbackPromptPlaceholder from "./getFeedbackPromptPlaceholder";
import GenreSelectLabel from "./GenreSelectLabel";
import TracklessRadioGroup from "./TracklessRadioGroup";
import GenreSelect from "./GenreSelect";
import MissingGenreMessage from "./MissingGenreMessage";

const FeedbackRequestFormFields = ({
    form,
    mediaUrl,
    onMediaUrlChange,
    feedbackPrompt,
    genre,
    emailWhenGrouped,
    trackless,
    onSubmit,
    isLoading,
    submitted,
}) => {
    const [feedbackPromptPlaceholder] = useState(getFeedbackPromptPlaceholder());

    const isRequestTrackless = form.getFieldValue("trackless") === "trackless";

    let tracklessValue = "track";
    if (trackless) {
        tracklessValue = "trackless";
    }

    let emailWhenGroupedValue = emailWhenGrouped;
    if (emailWhenGroupedValue === undefined) {
        emailWhenGroupedValue = true;
    }

    const fieldDecorators = {
        mediaUrl: form.getFieldDecorator(
            "mediaUrl",
            {
                rules: [
                    {
                        // A media url isn't required if the user has declared that
                        // they are making a 'trackless' request i.e. only giving
                        // feedback, not receiving it.
                        required: isRequestTrackless,
                        message: "Please provide a track URL",
                    },
                ],
                initialValue: mediaUrl,
            },
        ),
        feedbackPrompt: form.getFieldDecorator(
            "feedbackPrompt",
            {
                initialValue: feedbackPrompt,
            },
        ),
        emailWhenGrouped: form.getFieldDecorator(
            "emailWhenGrouped",
            {
                valuePropName: "checked",
                initialValue: emailWhenGroupedValue,
            },
        ),
        genre: form.getFieldDecorator(
            "genre",
            {
                initialValue: genre,
                rules: [
                    {
                        required: true,
                        message: <MissingGenreMessage isRequestTrackless={isRequestTrackless} />,
                    },
                ],
            },
        ),
        trackless: form.getFieldDecorator(
            "trackless",
            {
                initialValue: tracklessValue,
            },
        ),
    };

    return (
        <Spin spinning={isLoading}>
            <Form onSubmit={onSubmit} className="hmt-form">
                <Form.Item>
                    <TracklessRadioGroup decorator={fieldDecorators.trackless} />
                </Form.Item>
                {!isRequestTrackless && (
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
                                    disabled={isRequestTrackless}
                                />,
                            )}
                        </Form.Item>
                    </React.Fragment>
                )}
                <Form.Item
                    colon={false}
                    label={<GenreSelectLabel />}
                >
                    <GenreSelect decorator={fieldDecorators.genre} />
                </Form.Item>
                <Form.Item>
                    {fieldDecorators.emailWhenGrouped(<Checkbox>Email me when this request is added to a group.</Checkbox>)}
                </Form.Item>
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        disabled={isLoading || submitted}
                    >
                        Submit Feedback Request
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default FeedbackRequestFormFields;
