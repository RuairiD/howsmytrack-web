import React from 'react';

import { Icon, List, Typography } from 'antd';

type Props = {
    isMobile: boolean,
};

class LandingPitch extends React.Component<Props> {
    /*
     * Component for displaying FAQ page explaining what How's My Track? is etc.
     */

    steps = [
        {
            icon: "plus",
            text: "Submit your track.",
        },
        {
            icon: "usergroup-add",
            text: "Join a group.",
        },
        {
            icon: "edit",
            text: "Write feedback for your peers.",
        },
        {
            icon: "check",
            text: "Read your own feedback.",
        },
        {
            icon: "rollback",
            text: "Repeat.",
        },
    ]

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {this.props.isMobile && <div>
                    <img alt="how's my track" src="/logo512.png" width="200px" style={{ marginBottom: '2em'}} />
                </div>}
                {!this.props.isMobile && <Typography.Title level={1} style={{ marginBottom: '1em' }}>
                    What is <em>how's my track?</em>
                </Typography.Title>}
                <List
                    style={{ display: "inline-block", textAlign: 'left' }}
                    itemLayout="vertical"
                    dataSource={this.steps}
                    renderItem={step => (
                        <Typography.Title level={3} style={{ display: 'flex' }}>
                            <Icon type={step.icon} style={{ marginRight: '2em' }} />
                            <div>{step.text}</div>
                        </Typography.Title>
                    )}
                />
            </div>
        );
    }
}

export default LandingPitch;