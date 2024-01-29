export function searchByDay(item: NotionPage, search: number) {
    let itemDay = item.properties["Day"];
    return (itemDay && typeof itemDay.number === "number" && itemDay.number == search);
}

export function searchByAmount(item: NotionPage, search: number) {
    let itemAmount = item.properties["Amount Due"];
    return (itemAmount && typeof itemAmount.number === "number" && itemAmount.number == search);
}

export function searchByName(item: NotionPage, search: string) {
    let itemName = item.properties["Name"];
    return (itemName && itemName.title && itemName.title.length > 0 && itemName.title[0].plain_text == search);
}

export function searchBySource(item: NotionPage, search: string) {
    let itemSource = item.properties["Source"];
    return Boolean(itemSource && itemSource.select && itemSource.select.name && itemSource.select.name == search);
}

export function searchByCategory(item: NotionPage, search: string) {
    let itemCategory = item.properties["Category"];
    return Boolean(itemCategory && itemCategory.select && itemCategory.select.name && itemCategory.select.name == search);
}
