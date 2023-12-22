import moment from "moment";

function isTodayOrFuture(date) {
  const parsedDate = moment(date);
  const currentDate = moment();
  const isTodayOrFuture = parsedDate.isSameOrAfter(currentDate, "day");

  return isTodayOrFuture;
}

export default isTodayOrFuture;
