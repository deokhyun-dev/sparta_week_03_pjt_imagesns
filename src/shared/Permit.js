import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = props => {
  // 유저 정보, 토큰 체크
  const user_info = useSelector(state => state.user.user);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  // 세션 체크
  const is_login = sessionStorage.getItem(_session_key);

  if (is_login && user_info) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;
