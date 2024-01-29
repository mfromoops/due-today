import { Command } from "commander";
import {
  sortByDay,
  sortByAmount,
  sortByName,
  sortBySource,
  sortByCategory,
} from "./sorters";
import {
    searchByDay,
    searchByAmount,
    searchByName,
    searchBySource,
    searchByCategory,
} from "./searchers";
export function setSorter(options: any) {
  let selectedFunction: (item1: NotionPage, item2: NotionPage) => number;
  if (options.day) {
    selectedFunction = sortByDay;
  } else if (options.amount) {
    selectedFunction = sortByAmount;
  } else if (options.name) {
    selectedFunction = sortByName;
  } else if (options.source) {
    selectedFunction = sortBySource;
  } else if (options.category) {
    selectedFunction = sortByCategory;
  } else {
    selectedFunction = sortByDay;
  }

  return selectedFunction;
}

export function setSeacher(options: any) {
    let selectedFunction: NumberSearchFunction | StringSearchFunction;
    if (options.day) {
        selectedFunction = searchByDay;
    } else if (options.amount) {
        selectedFunction = searchByAmount;
    } else if (options.name) {
        selectedFunction = searchByName;
    } else if (options.source) {
        selectedFunction = searchBySource;
    } else if (options.category) {
        selectedFunction = searchByCategory;
    } else {
        selectedFunction = searchByDay;
    }

    return selectedFunction;
}
export function chainSortOptions(command: Command) {
  command.option("-d, --day", 'sort by "Day"');
  command.option("-a, --amount", 'sort by "Amount Due"');
  command.option("-n, --name", 'sort by "Name"');
  command.option("-s, --source", 'sort by "Source"');
  command.option("-c, --category", 'sort by "Category"');
  command.option("-desc, --descending", "sort in descending order");
  return command;
}

export function chainSearchOptions(command: Command) {
    command.option("-d, --day <day>", 'search by "Day"');
    command.option("-a, --amount <amount>", 'search by "Amount Due"');
    command.option("-n, --name <name>", 'search by "Name"');
    command.option("-s, --source <source>", 'search by "Source"');
    command.option("-c, --category <category>", 'search by "Category"');
    return command;
}

export function prepareItem(
  item: NotionPage,
): { printValue: string; item: NotionPage } {
  let name = item.properties["Name"];
  let due = item.properties["Amount Due"];
  let source = item.properties["Source"];
  let day = item.properties["Day"];
  let category = item.properties["Category"];

  return {
    printValue:
      "Name: " +
      (name && name.title && name.title.length > 0
        ? name.title[0].plain_text
        : "") +
      "\n" +
      "Amount Due: " +
      (due && typeof due.number == "number" ? due.number : 0) +
      "\n" +
      "Source: " +
      (source && source.select && source.select.name
        ? source.select.name
        : "No Source Attached") +
      "\n" +
      "Day: " +
      (day && typeof day.number == "number" ? day.number : 0) +
      "\n" +
      "Category: " +
      (category && category.select && category.select.name
        ? category.select.name
        : "No Category Attached") +
      "\n",
    item,
  };
}

export function printItem({
  printValue,
  item,
}: {
  printValue: string;
  item: NotionPage;
}) {
  if (item.object == "page") console.log(printValue);
}
