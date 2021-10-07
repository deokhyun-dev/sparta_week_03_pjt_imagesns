import React from "react";
import styled from "styled-components";

const Button = props => {
  const { text, _onClick, is_float, children, margin, width, padding, size } =
    props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin,
    width,
    padding,
    size,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: false,
};

const ElButton = styled.button`
  width: ${props => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  border-radius: 7px;
  padding: ${props => props.padding};
  ${props => (props.margin ? `margin: ${props.margin};` : "")};
  font-size: ${props => (props.size ? props.size : "")};
  font-weight: ${props => (props.bold ? "600" : "400")};
`;

const FloatButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 600;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
