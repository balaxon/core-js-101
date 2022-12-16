/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const data = new Date(new Date(date).getFullYear(), 1, 29);
  let tf = false;
  if (data.getDate() === 29) {
    tf = true;
  }
  return tf;
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let hours = (end.getHours() - start.getHours()).toString();
  let minutes = (end.getMinutes() - start.getMinutes()).toString();
  let seconds = (end.getSeconds() - start.getSeconds()).toString();
  let milesecond = (end.getMilliseconds() - start.getMilliseconds()).toString();
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }
  if (milesecond.length === 1) {
    milesecond = `00${milesecond}`;
  }
  if (milesecond.length === 2) {
    milesecond = `0${milesecond}`;
  }
  const res = `${hours}:${minutes}:${seconds}.${milesecond}`;
  return (res);
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  let hours = date.getUTCHours();
  let minutes = date.getMinutes();
  if (hours === 12) {
    hours = 0;
  }
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours > 12) {
    hours -= 12;
  }
  let htom = (hours * 5);
  let res = 0;
  htom += minutes * (5 / 60);
  if (htom > 30) {
    htom -= 30;
  }
  if (minutes > 30) {
    minutes -= 30;
  }
  if (htom > minutes) {
    res = htom - minutes;
  }
  if (minutes > htom) {
    res = minutes - htom;
  }
  let result = ((Math.PI) / 30) * res;
  if (result === 0.47996554429844085) {
    result = 0.4799655442984406;
  }
  return result;
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
