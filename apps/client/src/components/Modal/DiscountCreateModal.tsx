import { Form, Input, InputNumber, Modal } from 'antd'
import { FC, useState } from 'react'
import { createDiscount } from '../../api/admin/DiscountAPI'
import { REQUIRED_RULE } from '../../constant/formRules'
import IDiscount from '../../interface/Discount'
import { ModalProps } from '../../interface/ModalProps'
import SuccessAlert from '../Alert/SuccessAlert'


const DiscountCreateModal: FC<ModalProps> = ({ isOpen, setIsModalOpen, setDataState }) => {
  const [createForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (value: any) => {
    setIsLoading(true)
    createDiscount(value.name, value.discount)
      .then(({ data }) => {
        setDataState && setDataState((prev: IDiscount[]) => [...prev, data]);
        createForm.resetFields();
        setIsModalOpen(false)
        SuccessAlert('Tạo khuyến mãi thành công.')
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <Modal title={'Tạo khuyến mãi: '} open={isOpen} width={'40vw'}
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
      onCancel={() => setIsModalOpen((prev: boolean) => !prev)} confirmLoading={isLoading}>
      <Form form={createForm} onFinish={onFinish} layout='vertical'>
        <Form.Item name={'name'} label={'Tên khuyến mãi'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discount'} label={'Giảm giá (%)'} rules={[REQUIRED_RULE]}>
          <InputNumber min={0} max={100} controls={false} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DiscountCreateModal