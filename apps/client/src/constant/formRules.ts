import { Rule } from "antd/es/form"
import dayjs, { Dayjs } from "dayjs";

export const REQUIRED_RULE = { required: true, message: 'Không được bỏ trống!!' }

export const PHONENUMBER_FORMAT_RULE = {
      pattern: /^(\+?84|0)(1\d{9}|9\d{8})$/,
      message: 'Số điện thoại không hợp lệ',
}

export const EMAIL_FORMAT_RULE: Rule = {
      type: 'email',
      message: 'Email không hợp lệ',
}

const validateDateGreaterThanCurrentDate = (_ : any, date: Dayjs) => {
    const currentDate = dayjs();
    if (date.isBefore(currentDate, 'day')) {
      return Promise.reject('Ngày chọn phải lớn hơn ngày hiện tại!');
    }
    return Promise.resolve();
};

export const DATE_GREATER_THAN_CURRENT_DATE_RULE = {
      validator: validateDateGreaterThanCurrentDate
}
    


