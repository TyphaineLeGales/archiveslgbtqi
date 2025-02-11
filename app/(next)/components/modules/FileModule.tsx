"use client";

type Props = {
  item: {
    fileUrl: string
  }
 
};
const FileModule = ( {item} : Props) => {

  return item.fileUrl && <iframe src={item.fileUrl} width="100%" height="700px"></iframe>

};

export default FileModule;