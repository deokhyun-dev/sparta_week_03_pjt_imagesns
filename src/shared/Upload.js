import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../elements";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = props => {
  const dispatch = useDispatch();
  const uploading = useSelector(state => state);
  const fileInput = useRef();

  const selectFile = e => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요.");
      return;
    }
    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  return (
    <>
      <input onChange={selectFile} type="file" ref={fileInput} />
      <Button _onClick={uploadFB}>업로드</Button>
    </>
  );
};

export default Upload;
