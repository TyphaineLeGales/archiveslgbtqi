"use client";


const FileModule = ({ item }) => {

  return item.fileUrl && <iframe src={item.fileUrl} width="100%" height="700px"></iframe>

};

export default FileModule;