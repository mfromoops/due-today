export function sortByDay(item1: NotionPage, item2: NotionPage) {
    let day1 = item1.properties["Day"];
    let day2 = item2.properties["Day"];
    return day1 && day2 && day1.number && day2.number
      ? day1.number - day2.number
      : -1;
  }
  
  export function sortByAmount(item1: NotionPage, item2: NotionPage) {
    let due1 = item1.properties["Amount Due"];
    let due2 = item2.properties["Amount Due"];
    return due1 && due2 && due1.number && due2.number
      ? due1.number - due2.number
      : -1;
  }
  
  export function sortByName(item1: NotionPage, item2: NotionPage) {
    let name1 = item1.properties["Name"];
    let name2 = item2.properties["Name"];
    return name1 && name2 && name1.title && name2.title
      ? name1.title[0].plain_text.localeCompare(name2.title[0].plain_text)
      : -1;
  }
  
  export function sortBySource(item1: NotionPage, item2: NotionPage) {
    let source1 = item1.properties["Source"];
    let source2 = item2.properties["Source"];
    return source1 && source2 && source1.select && source2.select
      ? source1.select.name.localeCompare(source2.select.name)
      : -1;
  }
  
  export function sortByCategory(item1: NotionPage, item2: NotionPage) {
      let category1 = item1.properties["Category"];
      let category2 = item2.properties["Category"];
      return category1 && category2 && category1.select && category2.select
          ? category1.select.name.localeCompare(category2.select.name)
          : -1;
      }