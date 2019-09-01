import React, { useState, useEffect } from "react";
import { getContent } from "../apis/backend";
import { message } from "antd";

const ContentContext = React.createContext();


const connection = new WebSocket("ws://localhost:3001");

const ContentProvider = (props) => {
  const [ files, setFiles ] = useState([]);
  const [ folders, setFolders ] = useState([]);
  const [ currentPath, setCurrentPath ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ errored, setErrored ] = useState(false);
  const [ contentUpdated, setContentUpdated ] = useState(false);

  const fetchContent = async (subdir) => {
    try {
      setErrored(false)
      setLoading(true);
      const { files, folders } = await getContent(subdir);
      setFiles(files);
      setFolders(folders);
      setLoading(false);
    } catch (err) {
      setLoading(false)
      setErrored(true)
      console.log(err)
    }
  };


  connection.onerror = () => {
    message.error("Socket connection errored");
  }
  
  connection.onmessage = () => {
    message.loading("Updating content", 1);
    setContentUpdated(true) 
  };

  const changeCurrentPath = currentPath => setCurrentPath(currentPath);

  useEffect(() => {
    setContentUpdated(false);
    fetchContent(currentPath);
  }, [currentPath, contentUpdated]);

  return <ContentContext.Provider value ={{ files, folders, currentPath, loading, errored, changeCurrentPath }}>
    {props.children}
  </ContentContext.Provider>;
};

export { ContentContext, ContentProvider }