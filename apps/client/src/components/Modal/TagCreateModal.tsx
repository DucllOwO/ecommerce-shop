import { Button, Form, Input, Modal, Select } from 'antd'
import { FC } from 'react'
import { createTag } from '../../api/admin/tagAPI'
import { DISCOUNT_RULE_TOOLTIP } from '../../constant/constant'
import { REQUIRED_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'
import ITag from '../../interface/Tag'
import ErrorAlert from '../Alert/ErrorAlert'
import SuccessAlert from '../Alert/SuccessAlert'

interface TagCreateModalProps extends ModalProps {
  discounts: any
}


const TagCreateModal: FC<TagCreateModalProps> = ({ isOpen, setIsModalOpen, setDataState, discounts }) => {
  const [createForm] = Form.useForm();

  const onSubmit = () => {
    const tag = createForm.getFieldsValue();

    createTag(tag).then(({ data }) => {
      setDataState && setDataState((prev: ITag[]) => [...prev, data]);
      SuccessAlert('Tạo thẻ thành công.')
      setIsModalOpen(false);
    }).catch((err) => {
      ErrorAlert('Tạo thẻ thất bại!!');
      console.log(err)
    });
  }

  return (
    <Modal title={'Tạo nhãn: '} open={isOpen} width={'40vw'} footer={[
      <Button key="back" onClick={() => {
        setIsModalOpen(false)
      }}>
        Hủy bỏ
      </Button>,
      <Button key="submit" type="primary" onClick={() => {
        createForm.submit();
      }}>
        Lưu
      </Button>
    ]} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <Form form={createForm} layout='vertical' onFinish={onSubmit}>
        <Form.Item name={'name'} label={'Name'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discountID'} label={'Giảm giá'} tooltip={DISCOUNT_RULE_TOOLTIP}>
          <Select allowClear
            placeholder="Chọn mã giảm giá áp dụng cho nhãn"
            options={discounts} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TagCreateModal