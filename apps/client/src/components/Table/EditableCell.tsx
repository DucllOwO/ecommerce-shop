import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { Rule } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import { locale } from "dayjs";
import { DATE, DATE_FORMAT, INPUT_NUMBER, SELECT, TEXTAREA } from "../../constant/constant";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  record: any;
  index: number;
  children: React.ReactNode;
  rules: Rule[];
  tooltip: string;
  initData: any;
}

const getComponentByType = (type: string) => {
  switch (type) {
    case DATE:
      return <DatePicker format={DATE_FORMAT} />;
    case INPUT_NUMBER:
      return <InputNumber />;
    case TEXTAREA:
      return <TextArea />;
    case SELECT:
      return <Select />;

    default:
      return <Input />;
  }
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  rules = [],
  tooltip = '',
  ...restProps
}) => {
  const inputNode = getComponentByType(inputType)
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={rules}
          tooltip={tooltip}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;