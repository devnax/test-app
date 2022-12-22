
export interface ContentData {
   data: { [key: string]: any };
   type: "grid" | "textbox" | "tab" | "accordion";
   childs: ContentData[]
}