
export interface ContentData {
   data: { [key: string]: any };
   type: "grid" | "image" | "html" | "math" | "tab" | "accordion" | "textbox" | "single_choice" | "multiple_choice" | "dropdown" | "fill_blank" | "sorting" | "drag_drop" | "table_checklist" | "image_map" | "graph" | "free_choice" | "essay";
   childs: ContentData[]
}