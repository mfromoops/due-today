type NotionPage = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
  };
  cover: null;
  icon: null;
  parent: {
    type: "database_id";
    database_id: string;
  };
  archived: boolean;
  properties: NotionProperty;
  url: string;
  public_url: null;
};

type NotionProperty = {
  Automated: NotionSelect;
  Source: NotionSelect;
  Category: NotionSelect;
  Status: NotionStatus;
  "Amount Due": NotionNumber;
  Day: { id: "_EtQ"; type: "number"; number: 30 };
  Name: {
    id: "title";
    type: "title";
    title: [
      {
        type: "text";
        text: { content: "Netflix"; link: null };
        annotations: {
          bold: false;
          italic: false;
          strikethrough: false;
          underline: false;
          code: false;
          color: "default";
        };
        plain_text: "Netflix";
        href: null;
      }
    ];
  };
};

type NotionStatus = {
  id: string;
  type: "status";
  status: { id: string; name: string; color: string };
};

type NotionSelect = {
  id: string;
  type: "select";
  select: { id: string; name: string; color: string };
};

type NotionNumber = {
  id: string;
  type: "number";
  number: number;
};
type NotionTitle = {
  id: string;
  type: "title";
  title: NotionText[];
};

type NotionText = {
  type: "text";
  text: { content: string; link: null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: "default";
  };
  plain_text: string;
  href: null;
};

type NumberSearchFunction = (item: NotionPage, search: number) => boolean;
type StringSearchFunction = (item: NotionPage, search: string) => boolean;