import { DatePicker, Form, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, useState } from 'react'
import { createVoucher } from '../../api/admin/VoucherAPI'
import { DATE_FORMAT } from '../../constant/constant'
import { DATE_GREATER_THAN_CURRENT_DATE_RULE, REQUIRED_RULE, STRING_LENGTH_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'
import IVoucher from '../../interface/Voucher'
import SuccessAlert from '../Alert/SuccessAlert'


const VoucherCreateModal: FC<ModalProps> = ({ setDataState, isOpen, setIsModalOpen }) => {
  const [createForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values: any) => {
    setIsLoading(true);
    createVoucher(values)
      .then(({ data }) => {
        setDataState && setDataState((prev: IVoucher[]) => [...prev, data])
        SuccessAlert('Tạo voucher thành công.');
        setIsModalOpen(false)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
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
        <Form.Item name={'code'} label={'Mã khuyến mãi'} rules={[REQUIRED_RULE, STRING_LENGTH_RULE(6)]}>
          <Input />
        </Form.Item>
        <Form.Item name={'name'} label={'Tên khuyến mãi'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discount'} label={'Giảm giá (%)'} rules={[REQUIRED_RULE]}>
          <InputNumber controls={false} min={1} max={100} />
        </Form.Item>
        <Form.Item name={'due'} label={'Ngày hết hạn'} rules={[REQUIRED_RULE, DATE_GREATER_THAN_CURRENT_DATE_RULE]}>
          <DatePicker format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item name={'description'} label={'Mô tả'}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default VoucherCreateModal