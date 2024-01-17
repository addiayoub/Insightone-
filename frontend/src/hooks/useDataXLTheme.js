import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function useDataXLTheme() {
  const { darkTheme } = useSelector((state) => state.theme);
  const theme = useMemo(() => {
    return {
      // component
      component: "#ffffff",

      // bottombar & topbar
      button: "#e8eaed",
      "button-icon": "#5f6368",
      input: "#ffffff",
      "input|text": "#000000",
      "input|border": "#5f6368",
      "input:focus|border": "#0078ff",
      "input-info": "#5f6368",

      // contextmenu
      contextmenu: "#ffffff",
      "contextmenu|text": "#000000",
      "contextmenu-item:highlight": "#eeeeee",
      "contextmenu-item-shortcut": "#aaaaaa",

      // sheet
      blanksheet: "#f3f3f3",
      sheet: "#fff",
      "sheet|text": "#000000",

      // scrollbar
      scrollbar: "#ffffff",
      "scrollbar|border": "#999999",

      // grid lines
      gridline: "#555555",
      "gridline-tip": "#000000",
      "gridline|opacity": 0.2,

      // headers
      header: "#f8f9fa",
      "header|text": "#000000",
      "header:highlight": "#e8eaed",
      "header:selected": "#5f6368",
      "header:selected|text": "#ffffff",
      "header-icon": "#000000",

      // action ranges
      "cellrange:cut": "#0078ff",
      "cellrange:copy": "#0078ff",
      "cellrange:fill": "#000000",

      // selection
      cellcursor: "#0078ff",
      "cellrange:selected": "#0078ff",
      "cellrange:selected|border": "#0078ff",
      "cellrange:selected|opacity": 0.1,

      // fill handle
      fillhandle: "#0078ff",

      // cell editor
      celleditor: "#0078ff",

      // search
      searchcursor: "#000000",
      "cell+found": "#89bf71",
      "cell+found|opacity": 0.25,

      // freezeline
      freezeline: "#dadfe8",
      "freezeline-tip": "#bcbcbc",
      freezelineplaceholder: "#bcbcbc",

      // move action
      "move?ghost": "#000000",
      "move?ghost|opacity": 0.15,
      "move?guide": "#5f6368",
      "move?guide|opacity": 1,

      // freeze action
      "freeze?hint": "#a5c6fe",
      "freeze?ghost": "#000000",
      "freeze?ghost|opacity": 0.15,
      "freeze?guide": "#000000",
      "freeze?guide|opacity": 0.3,

      // resize action
      "resize?hint": "#0078ff",
      "resize?guide": "#0078ff",
      "resize?guide|opacity": 1,

      // show action
      "show?hint": "#ffffff",
      "show?hint-icon": "#000000",
      "show?hint|border": "#0078ff",
    };
  }, [darkTheme]);
  return theme;
}

export default useDataXLTheme;
