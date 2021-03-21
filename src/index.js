import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NoteProvider } from "./Components/notes-context";
import { MainNoteProvider } from "./Components/main-context";
import { TagsProvider } from "./Components/tags-context";
const predefinedTags = ["Personal", "Work", "Party"];
const noteColors = ["#414347", "#FDE68A", "#047857", "#FCA5A5", "#8B5CF6"];
ReactDOM.render(
  <React.StrictMode>
    <NoteProvider>
      <MainNoteProvider color={{ noteColors }}>
        <TagsProvider tags={{ predefinedTags }}>
          <App />
        </TagsProvider>
      </MainNoteProvider>
    </NoteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
