module.exports = async () => {
    // Set the timezone for all tests to ensure consistent
    // results from dateFormat (backend handles timezones
    // transparently; client doesn't need to worry about it)
    process.env.TZ = "UTC";
};
