import React, { useState, useEffect } from "react";
import { message } from "antd";
import { getContent } from "../apis/backend";
import config from "../config";

const { websocket_url } = config;

message.config({ maxCount: 3 });

const ContentContext = React.createContext();

let connection;
const refreshSocket = ({ onSocketError, onClose, onMessage, onOpen }) => {
  connection = new WebSocket(websocket_url);
  connection.onopen = onOpen;
  connection.onmessage = onMessage;
  connection.onerror = onSocketError;
  connection.onclose = onClose;
}

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

  const onOpen = () => {
    message.success("Socket connected!");
    setContentUpdated(true);
  };
  const onSocketError = () => message.error("Socket connection errored");
  const onClose = () => setTimeout(() => refreshSocket({ onSocketError, onMessage, onOpen, onClose }), 5000);
  const onMessage = () => {
    message.loading("Updating content", 1);
    setContentUpdated(true);
  };
  
  const changeCurrentPath = currentPath => setCurrentPath(currentPath);
  // eslint-disable-next-line
  useEffect(() => refreshSocket({ onSocketError, onMessage, onOpen, onClose }), []);
  useEffect(() => {
    setContentUpdated(false);
    fetchContent(currentPath);
  }, [currentPath, contentUpdated]);

  return <ContentContext.Provider value ={{ files, folders, currentPath, loading, errored, changeCurrentPath }}>
    {props.children}
  </ContentContext.Provider>;
};

export { ContentContext, ContentProvider }