/*
 * Helper function for FeedbackResponseReplies to set container shadow opacities to indicate
 * content outside of scrolled window.
 */
const setAllowingScrollingAndShadowOpacities = (
    repliesDiv,
    setAllowingScrolling,
    setTopShadowOpacity,
    setBottomShadowOpacity,
) => {
    // If there is content that isn't visible because it is being rendered above or
    // below the visible portion of the scrollable container, display the shadows to
    // make it clear there's content that's being hidden. Otherwise, hide them.
    const scrollableHeight = repliesDiv.scrollHeight - repliesDiv.clientHeight;
    if (scrollableHeight > 0) {
        const opacity = repliesDiv.scrollTop / scrollableHeight;
        setAllowingScrolling(true);
        setTopShadowOpacity(opacity);
        setBottomShadowOpacity(1 - opacity);
    } else {
        setAllowingScrolling(false);
        setTopShadowOpacity(0);
        setBottomShadowOpacity(0);
    }
};

export default setAllowingScrollingAndShadowOpacities;
