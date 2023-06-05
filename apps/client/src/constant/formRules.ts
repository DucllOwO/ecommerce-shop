import { Rule } from "antd/es/form"
import dayjs, { Dayjs } from "dayjs";

export const REQUIRED_RULE = { required: true, message: 'Không được bỏ trống!!' }

export const PHONENUMBER_FORMAT_RULE = {
      pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
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
    
export const STRING_LENGTH_RULE = (len: number) => ({
      len: len,
      message: 'Phải bao gồm 6 ký tự',
    })

export const VALUE_MUST_BETWEEN_0_100 = {
      type: 'number',
      min: 0,
      max: 100,
      message: 'Giá trị phải từ 0 đên 100'
    }

