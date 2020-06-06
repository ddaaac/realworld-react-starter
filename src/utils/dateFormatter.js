const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en', {month: "numeric", day: "numeric"}).format(date);
};

export default dateFormatter;