import { Rule } from "antd/es/form"

export const REQUIRED_RULE = { required: true, message: 'Không được bỏ trống!!' }

export const PHONENUMBER_FORMAT_RULE = {
      pattern: /^(\+?84|0)(1\d{9}|9\d{8})$/,
      message: 'Số điện thoại không hợp lệ',
}

export const EMAIL_FORMAT_RULE: Rule = {
      type: 'email',
      message: 'Email không hợp lệ',
    }
    


