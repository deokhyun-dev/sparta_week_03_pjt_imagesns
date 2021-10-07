import React, { useRef } from "react";
import { Button } from "../elements";

const Upload = props => {
  const fileInput = useRef();

  const selectFile = e => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.file[0];
    reader.readAsDataURL(file);
  };

  const uploadFB = () => {
    console.log("업로드");
  };
  return (
    <>
      <input onChange={selectFile} type="file" ref={fileInput} />
      <Button onClick={uploadFB}>업로드</Button>
    </>
  );
};

export default Upload;
