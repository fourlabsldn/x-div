import regexMatch from "./regexMatch";

export default {
    mark: (url) => {
        const randID = Math.random() + Date.now();
        return `${url}?x-div-id${randID}`;
    },
    getMark: url =>
        regexMatch(/x-div-id([0-9]+\.[0-9]+)/, url)[1]
};
