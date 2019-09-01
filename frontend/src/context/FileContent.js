import React, { useState } from "react";
import { getFile } from "../apis/backend";

const FileContentContext = React.createContext();

const FileContentProvider = (props) => {
  const [ fileContent, setFileContent ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ errored, setErrored ] = useState(false);
  
  const fetchFile = async (currentPath, filename) => {
    try {
      setErrored(false);
      setLoading(true);
      const file = await getFile(currentPath, filename, true);
      setFileContent(file);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrored(true);
      setLoading(false);
    }
  };
  
  const downloadFile = async (currentPath, filename) => {
    try {
      setErrored(false);
      setLoading(true);
      await getFile(currentPath, filename, false);
      setLoading(false);
    } catch (err) {
      setErrored(true);
      setLoading(false);
    }
  };

  return <FileContentContext.Provider value ={{ fileContent, fetchFile, downloadFile, loading, errored }}>
    {props.children}
  </FileContentContext.Provider>;
};

export { FileContentContext, FileContentProvider }