import axios from "axios";

/** 
 * Set the token we get from JWT as default header token.
 * That way we can enter private routes.
 * @param {string} token 
 */
const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
