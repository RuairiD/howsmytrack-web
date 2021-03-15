import React from "react";

import { Button, Popconfirm } from "antd";

const getDeleteConfirmationText = (mediaUrl) => {
    if (mediaUrl) {
        return "This request has not been assigned to a group. If you delete it, you will not receive any feedback on it. Are you sure you want to delete this request?";
    }
    return "This request has not been assigned to a group. Are you sure you want to delete this request?";
};

const RequestButtons = ({ mediaUrl, onEditClick, onDelete }) => (
    <React.Fragment>
        <Button
            shape="circle"
            icon="edit"
            onClick={onEditClick}
            style={{
                marginRight: "0.5em",
            }}
            className="request-button"
        />
        <Popconfirm
            title={getDeleteConfirmationText(mediaUrl)}
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
        >
            <Button
                shape="circle"
                icon="delete"
                className="request-button"
            />
        </Popconfirm>
    </React.Fragment>
);

export default RequestButtons;
