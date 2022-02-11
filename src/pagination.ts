import { IVueI18n } from "vue-i18n/types";

export default class Pagination {
  public type: string;
  public row: number;
  public rows: number;
  public sortBy: string[];
  public sortDesc: boolean[];

  constructor() {
    this.type = "";
    this.row = 1;
    this.rows = 10;
    this.sortBy = [];
    this.sortDesc = [];
  }

  load(type: string) {
    this.type = type;
    let page = JSON.parse(sessionStorage.getItem("page") || "{}");
    let data = page[this.type] || {};
    this.row = data.row || 1;
    this.sortBy = data.sortBy || [];
    this.sortDesc = data.sortDesc || [];

    page = JSON.parse(localStorage.getItem("page") || "{}");
    this.rows = page[this.type] || 10;
  }

  save() {
    let page = JSON.parse(sessionStorage.getItem("page") || "{}");
    let data = page[this.type] || {};
    data.row = this.row;
    data.sortBy = this.sortBy;
    data.sortDesc = this.sortDesc;
    page[this.type] = data;
    sessionStorage.setItem("page", JSON.stringify(page));

    page = JSON.parse(localStorage.getItem("page") || "{}");
    page[this.type] = this.rows;
    localStorage.setItem("page", JSON.stringify(page));
  }

  max(count: number) {
    if (count && this.rows) {
      return Math.ceil(count / this.rows);
    }
    return 1;
  }

  footer(i18n: IVueI18n) {
    return {
      "items-per-page-options": [10, 20, 30, -1],
      "items-per-page-all-text": i18n.t("parts.page_all"),
      "items-per-page-text": i18n.t("parts.page_row"),
    };
  }
}
