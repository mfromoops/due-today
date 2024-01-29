export function dueToday(item: NotionPage) {
  let day = item.properties["Day"];
  return (
    day && typeof day.number === "number" && day.number == new Date().getDate()
  );
}

export function dueThisWeek(item: NotionPage) {
  let day = item.properties["Day"];
  return (
    day &&
    typeof day.number === "number" &&
    day.number <= new Date().getDate() + 7 &&
    day.number >= new Date().getDate()
  );
}

export function allItems(item: NotionPage) {
  return true;
}
