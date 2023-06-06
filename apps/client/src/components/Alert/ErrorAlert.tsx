import { notification } from "antd";
import React from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";

const ErrorAlert = (description = "Something wrong!!") => {
  return notification.open({
    message: "Lỗi !!",
    description: description,
    duration: 5,
    icon: <CloseCircleTwoTone twoToneColor="#ff0000" />,
  });
};

export default ErrorAlert;