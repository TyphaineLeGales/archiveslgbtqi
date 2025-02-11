"use client";

type DocFile = {
  fileUrl: string
 
};
const FileModule = ({ item }: DocFile) => {

  return item.fileUrl && <iframe src={item.fileUrl} width="100%" height="700px"></iframe>

};

export default FileModule;