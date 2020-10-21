import setAllowingScrollingAndShadowOpacities from "./setAllowingScrollingAndShadowOpacities";

describe("setAllowingScrollingAndShadowOpacities", () => {
    it("disables scrolling and sets opacities to 0 if there isn't enough content to warrant scrolling", async () => {
        const setAllowingScrolling = jest.fn();
        const setTopShadowOpacity = jest.fn();
        const setBottomShadowOpacity = jest.fn();

        setAllowingScrollingAndShadowOpacities(
            {
                scrollHeight: 320,
                clientHeight: 320,
            },
            setAllowingScrolling,
            setTopShadowOpacity,
            setBottomShadowOpacity,
        );

        expect(setAllowingScrolling).toHaveBeenCalledWith(false);
        expect(setTopShadowOpacity).toHaveBeenCalledWith(0);
        expect(setBottomShadowOpacity).toHaveBeenCalledWith(0);
    });
    it("enables scrolling and sets opacities appropriately if there is content outside of the scrolled area", async () => {
        const setAllowingScrolling = jest.fn();
        const setTopShadowOpacity = jest.fn();
        const setBottomShadowOpacity = jest.fn();

        setAllowingScrollingAndShadowOpacities(
            {
                scrollHeight: 640,
                clientHeight: 320,
                scrollTop: 320,
            },
            setAllowingScrolling,
            setTopShadowOpacity,
            setBottomShadowOpacity,
        );

        expect(setAllowingScrolling).toHaveBeenCalledWith(true);
        expect(setTopShadowOpacity).toHaveBeenCalledWith(1);
        expect(setBottomShadowOpacity).toHaveBeenCalledWith(0);
    });
});
