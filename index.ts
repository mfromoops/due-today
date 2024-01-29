import { Command, program } from "commander";
import {
  chainSearchOptions,
  chainSortOptions,
  prepareItem,
  printItem,
  setSeacher,
  setSorter,
} from "./src/commands";
import { allItems, dueThisWeek, dueToday } from "./src/filters";
import { sortByDay } from "./src/sorters";

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
let filterByDate: (item: NotionPage, index?: number) => boolean;
let sortByFunction: (item1: NotionPage, item2: NotionPage) => number =
  sortByDay;
let searchByFunction: NumberSearchFunction | StringSearchFunction;

function manageSortOptions(options: any) {
  const selectedFunction = setSorter(options);

  if (options.descending) {
    sortByFunction = (item1: NotionPage, item2: NotionPage) =>
      selectedFunction(item2, item1);
  }
}
(async () => {
  const response = await notion.search({});

  const today = chainSortOptions(new Command("today")).action((options) => {
    manageSortOptions(options);
    filterByDate = dueToday;
    runFilterAction(response);
  });

  const thisWeek = chainSortOptions(new Command("this-week")).action(
    (options) => {
      manageSortOptions(options);
      filterByDate = dueThisWeek;
      runFilterAction(response);
    }
  );
  const getAll = chainSortOptions(new Command("all")).action((options) => {
    manageSortOptions(options);
    filterByDate = allItems;
    runFilterAction(response);
  });

  const search = chainSearchOptions(new Command("search")).action((options) => {
    searchByFunction = setSeacher(options);
    runSearchAction(response);
  });

  program.addCommand(thisWeek);
  program.addCommand(today);
  program.addCommand(getAll);
  program.addCommand(search);
  program.parse();
  return response;
})();

function runSearchAction(response: { results: NotionPage[] }) {}

function runFilterAction(response: { results: NotionPage[] }) {
  (response.results as NotionPage[])
    .filter(filterByDate)
    .sort(sortByFunction)
    .map(prepareItem)
    .map(printItem);
}
