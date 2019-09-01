import axios from "axios";
import config from "../config";

const { backend_url, backend_api_endpoint } = config
const backendClient = axios.create({ baseURL: config.backend_url + backend_api_endpoint });

const getContent = async (subdir ="") => {
  const { data: { data } } = await backendClient.get("/content", { params: { 
    subdir: `${subdir.charAt(0)==="/" ? "": "/"}${subdir}`
  } });
  return data;
};

const getFile = async (subdir, filename, preview) => {
  const { data } = await backendClient.get("/file", { 
    params: { subdir, filename, preview }, 
    responseType: "blob", 
    transformResponse: [] 
  });
  if (!preview) {
    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename); //any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return data;
};

const postFile = async (subdir, files = []) => {
  const formData = new FormData();
  formData.set("subdir", `${subdir.charAt(0)==="/" ? "": "/"}${subdir}`);
  files.forEach(file => formData.append(file.name, file));

  const { data } = await backendClient.post("/file", formData, { headers: {'Content-Type': 'multipart/form-data' }});
  return data;
};

const deleteFile = async (subdir, filename) => {
  const { data } = await backendClient.delete("/file", { params: { subdir: `${subdir.charAt(0)==="/" ? "": "/"}${subdir}`, filename }});
  return data;
};

const deleteDirectory = async subdir => {
  const { data } = await backendClient.delete("/content", { params: { subdir: `${subdir.charAt(0)==="/" ? "": "/"}${subdir}` }});
  return data;
};

export { getContent, getFile, postFile, deleteFile, deleteDirectory };