import React from "react";
import { shallow } from "enzyme";
import MediaEmbed from "./MediaEmbed";

describe("MediaEmbed", () => {
    it("renders a SoundcloudEmbed for a Soundcloud link", () => {
        const wrapper = shallow(
            <MediaEmbed
                mediaUrl="https://example.com/"
                mediaType="SOUNDCLOUD"
                size="large"
            />,
        );
        expect(wrapper.find("SoundcloudEmbed").length).toBe(1);
        expect(wrapper.find("SoundcloudEmbed").get(0).props.mediaUrl).toBe("https://example.com/");
    });

    it("renders a DropboxEmbed for a Dropbox link", () => {
        const wrapper = shallow(
            <MediaEmbed
                mediaUrl="https://example.com/"
                mediaType="DROPBOX"
                size="large"
            />,
        );
        expect(wrapper.find("DropboxEmbed").length).toBe(1);
        expect(wrapper.find("DropboxEmbed").get(0).props.mediaUrl).toBe("https://example.com/");
    });

    it("renders a OneDriveEmbed for a OneDrive link", () => {
        const wrapper = shallow(
            <MediaEmbed
                mediaUrl="https://example.com/"
                mediaType="ONEDRIVE"
                size="large"
            />,
        );
        expect(wrapper.find("OneDriveEmbed").length).toBe(1);
        expect(wrapper.find("OneDriveEmbed").get(0).props.mediaUrl).toBe("https://example.com/");
    });

    it("renders a GoogleDriveEmbed for a Google Drive link", () => {
        const wrapper = shallow(
            <MediaEmbed
                mediaUrl="https://example.com/"
                mediaType="GOOGLEDRIVE"
                size="large"
            />,
        );
        expect(wrapper.find("GoogleDriveEmbed").length).toBe(1);
        expect(wrapper.find("GoogleDriveEmbed").get(0).props.mediaUrl).toBe("https://example.com/");
    });
});
