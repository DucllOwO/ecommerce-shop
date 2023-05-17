import { DatePicker, Form, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, useState } from 'react'
import { DATE_GREATER_THAN_CURRENT_DATE_RULE, REQUIRED_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'


const VoucherCreateModal: FC<ModalProps> = ({ isOpen, setIsModalOpen }) => {
  const [createForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values: any) => {

  }

  return (
    <Modal title={'Tạo khuyến mãi: '} open={isOpen} width={'40vw'}
      onCancel={() => setIsModalOpen((prev: boolean) => !prev)}
      cancelText={'Huỷ bỏ'}
      cancelButtonProps={{
        onClick: () => {
          createForm.resetFields();
          setIsModalOpen(false)
        }
      }}
      okText={'Lưu'}
      okButtonProps={{
        onClick: () => {
          createForm.submit();
        }
      }}
      confirmLoading={isLoading}>
      <Form form={createForm} onFinish={onFinish} layout='vertical'>
        <Form.Item name={'name'} label={'Tên khuyến mãi'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discount'} label={'Giảm giá (%)'} rules={[REQUIRED_RULE]}>
          <InputNumber controls={false} />
        </Form.Item>
        <Form.Item name={'date'} label={'Ngày hết hạn'} rules={[REQUIRED_RULE, DATE_GREATER_THAN_CURRENT_DATE_RULE]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name={'discount'} label={'Mô tả'} rules={[REQUIRED_RULE]}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default VoucherCreateModal