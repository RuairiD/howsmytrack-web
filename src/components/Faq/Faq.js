import React from 'react';

import { List, Typography } from 'antd';

type Props = {};

class Faq extends React.Component<Props> {
    /*
     * Component for displaying FAQ page explaining what FeedbackGroups is etc.
     */

    faqs = [
        {
            question: "What is FeedbackGroups?",
            answer: (<Typography.Paragraph>FeedbackGroups is a website for musicians to share their work and solicit feedback from eachother. Users may submit one track for feedback per day. Users are then put into groups of 4. Each user can then listen to each other's submitted track and leave feedback. Once a user has left feedback for everyone in their group, the feedback left for their own track will be visible to them. </Typography.Paragraph>)
        },
        {
            question: "Why does FeedbackGroups exist?",
            answer: (<React.Fragment>
                <Typography.Paragraph>
                    I noticed there were two primary ways musicians would solicit feedback in Discord channels.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    The first is through some sort of #feedback channel where users can post a track for feedback, but only after providing feedback for the last submitter. I often found this tit-for-tat system a bit crap; there was very little enforcing constructive feedback and often users would leave pretty useless feedback just so they could post their own track. The cycle would continue and nobody would really get any good feedback.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    The second method was via feedback streams (co-ordinated conference calls where users would play their tracks one-by-one, with feedback to follow). While more effective than tit-for-tat channels, feedback streams are logistically impractical and require a lot of organisation. In addition, there was often an asymmetrical element that made things a bit weird e.g. some 'senior' users having microphone privileges, but not others. 
                </Typography.Paragraph>
                <Typography.Paragraph>
                    FeedbackGroups was designed to take the group mentality of a feedback stream but make it decentralised, avoiding the logistical nonsense, and enforce feedback standards via a rating system. 
                </Typography.Paragraph>
            </React.Fragment>)
        },
        {
            question: "How is my rating calculated?",
            answer: (<Typography.Paragraph>Users can rate your feedback after reading it. The rating you see when logged in is the mean of your last 15 ratings, or all of your ratings if you have fewer than than 15 (bear in mind that 15 ratings will be all your ratings from your past 5 groups). User ratings are only re-calculated once per day to obfuscate the source of ratings. </Typography.Paragraph>)
        },
        {
            question: "Who can see my rating?",
            answer: (<Typography.Paragraph>Only you. Nobody else can see your rating, and you can't see anybody else's. </Typography.Paragraph>)
        },
        {
            question: "If nobody can see my rating, what is it used for?",
            answer: (<Typography.Paragraph>Users with better ratings are grouped together. This (hopefully) incentivises users to write quality feedback to increase the chances of being grouped with other users who write quality feedback in future. </Typography.Paragraph>)
        },
        {
            question: "Someone gave me feedback I don't agree with. How can I see who wrote it?",
            answer: (<Typography.Paragraph>You can't, feedback is anonymous. I believe that people leave more honest and more constructive feedback if they are guaranteed anonymity. This may mean you get some feedback you don't like or agree with, but ultimately isn't that the point? </Typography.Paragraph>)
        },
        {
            question: "Can I add links to my Soundcloud/Spotify/Bandcamp etc. in case people like my stuff?",
            answer: (<Typography.Paragraph>No. FeedbackGroups is about one thing: feedback. I don't want it being used for anything resembling promotion. </Typography.Paragraph>)
        },
        {
            question: "How can my feedback be anonymous if my track is linked from my Soundcloud account?",
            answer: (<Typography.Paragraph>Unfortunately, anonymity cannot be 100% guaranteed if you use tracks from your main Soundcloud account. Feedback is still anonymised within the group though i.e. users can't tell which member of their group left the feedback. You're also welcome to use a burner Soundcloud account if true anonymity is important to you. Furthermore, I hope to add other streaming options in future which would allow true anonymity. </Typography.Paragraph>)
        }
    ]

    render() {
        return (
            <div>
                <Typography.Title level={2}>FAQ/About FeedbackGroups</Typography.Title>
                <List
                    itemLayout="vertical"
                    dataSource={this.faqs}
                    renderItem={faq => (
                        <List.Item>
                            <List.Item.Meta
                                title={faq.question}
                            />
                            {faq.answer}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Faq;