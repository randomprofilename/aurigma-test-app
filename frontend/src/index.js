import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContentProvider } from "./context/Content";
import { FileContentProvider } from "./context/FileContent";

ReactDOM.render(<ContentProvider>
    <FileContentProvider>
      <App />
    </FileContentProvider>
  </ContentProvider>
  , document.getElementById("root"));
