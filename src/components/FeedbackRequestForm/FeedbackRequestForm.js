import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

import { Alert, Col, Result, Row, Typography } from "antd";
import { A, Div } from "lemon-reset";
import apiRoot from "../../apiRoot";
import FeedbackRequestSummaryContent from "../FeedbackRequestSummary/FeedbackRequestSummaryContent";
import FeedbackRequestFormFields from "./FeedbackRequestFormFields";

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
    const getMediaInfo = () => axios.post(`${apiRoot()}/graphql/`, {
        query: MEDIA_INFO_QUERY,
        variables: {
            mediaUrl: form.getFieldValue("mediaUrl"),
        },
    }).then((response) => response.data.data.mediaInfo);

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
        }).then((response) => response.data.data[responseName]);
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
                    <FeedbackRequestFormFields
                        form={form}
                        mediaUrl={mediaUrl}
                        onMediaUrlChange={onMediaUrlChange}
                        feedbackPrompt={feedbackPrompt}
                        genre={genre}
                        emailWhenGrouped={emailWhenGrouped}
                        trackless={trackless}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        submitted={data && data.success}
                    />
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
