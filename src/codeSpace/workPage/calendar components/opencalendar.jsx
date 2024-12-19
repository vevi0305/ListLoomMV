import dayjs from "dayjs";

export const openCalendar = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const arrayOfDates = [];
  const firstDayOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDayOfMonth = dayjs().year(year).month(month).endOf("month");

  // Create prevMonth Dates to set week
  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    arrayOfDates.push({ date: firstDayOfMonth.day(i), currentMonth: false });
  }

  // generate current month dates
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    // push them in
    arrayOfDates.push({
      date: firstDayOfMonth.date(i),
      currentMonth: true,
      today:
        firstDayOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 35 - arrayOfDates.length;

  // // Create nextMonth Dates to set week
  // for (
  //   let i = lastDayOfMonth.date() + 1;
  //   i <= lastDayOfMonth.date() + remaining;
  //   i++
  // ) {
  //   arrayOfDates.push({ date: lastDayOfMonth.date(i), currentMonth: false });
  // }

  return arrayOfDates;
  // end of open Calendar
};
