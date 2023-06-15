import { Button, Form, FormInstance, Input, Modal, Select } from 'antd'
import React, { FC } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'
import { createCollection } from '../../api/admin/collectionAPI'
import ICollection from '../../interface/Collection'
import SuccessAlert from '../Alert/SuccessAlert'
import ErrorAlert from '../Alert/ErrorAlert'

interface CollectionCreateModalProps extends ModalProps {
  discounts: any
}

const CollectionCreateModal: FC<CollectionCreateModalProps> = ({ isOpen, setIsModalOpen, setDataState, discounts }) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    const tag = form.getFieldsValue();

    createCollection(tag).then(({ data }) => {
      setDataState && setDataState((prev: ICollection[]) => [...prev, data]);
      SuccessAlert('Tạo bộ sưu tập thành công.')
      setIsModalOpen(false);
    }).catch((err) => {
      ErrorAlert('Tạo bộ sưu tập thất bại!!');
      console.log(err)
    });
  }
  return (
    <Modal title={'Tạo bộ siêu tập: '} open={isOpen} width={'40vw'} footer={[
      <Button key="back" onClick={() => {
        setIsModalOpen(false)
      }}>
        Hủy bỏ
      </Button>,
      <Button key="submit" type="primary" onClick={() => {
        form.submit();
      }}>
        Lưu
      </Button>
    ]} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <Form form={form} layout='vertical' onFinish={onSubmit}>
        <Form.Item name={'name'} label={'Name'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discount'} label={'Giảm giá'}>
          <Select />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CollectionCreateModal