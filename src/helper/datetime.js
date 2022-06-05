const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const convertDate = (dateRaw) => {
  const date = new Date(dateRaw);
  const currentDayOfMonth = date.getDate();
  const currentMonth = months[date.getMonth()]; // Be careful! January is 0, not 1
  const currentYear = date.getFullYear();

  const dateString = `${currentDayOfMonth} ${currentMonth}, ${currentYear}`;

  return dateString;
};

export { convertDate as default };
