const moment = require('moment')


/**
 *
 * @param {string} dateTime
 * @return {string} date time in Iso format
 */
exports.convertIsoDateTimeToUTCDateTime = (dateTime) => {
    return moment(dateTime).utcOffset('+06:00').format('YYYY-MM-DD hh:mm:ss A')
}
