"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeStamp = void 0;
const getTimeStamp = (date = new Date(), dateStyle = 'yyyy-mm-dd', delimiter = "-") => {
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return `${number}`;
    }
    const formatDate = (y, m, d, dateStyle = 'yyyy-mm-dd') => {
        switch (dateStyle) {
            case "dd-mm-yyyy":
                return pad(d) + delimiter + pad(m) + delimiter + pad(y);
            case "dd-yyyy-mm":
                return pad(d) + delimiter + pad(y) + delimiter + pad(m);
            case "mm-yyyy-dd":
                return pad(m) + delimiter + pad(y) + delimiter + pad(d);
            case "mm-dd-yyyy":
                return pad(m) + delimiter + pad(d) + delimiter + pad(y);
            case "yyyy-dd-mm":
                return pad(y) + delimiter + pad(d) + delimiter + pad(m);
            default:
                return pad(y) + delimiter + pad(m) + delimiter + pad(d);
        }
    };
    let timeStamp = formatDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), dateStyle);
    timeStamp += ' ';
    timeStamp += pad(date.getUTCHours());
    timeStamp += ':';
    timeStamp += pad(date.getUTCMinutes());
    timeStamp += ':';
    timeStamp += pad(date.getUTCSeconds());
    return timeStamp;
};
exports.getTimeStamp = getTimeStamp;
