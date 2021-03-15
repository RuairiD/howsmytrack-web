// API endpoint root should be set as an environment variable in production.
export default () => {
    if (process.env.API_ROOT !== null && process.env.API_ROOT !== undefined) {
        return process.env.API_ROOT;
    }
    return "http://localhost:8000";
};
