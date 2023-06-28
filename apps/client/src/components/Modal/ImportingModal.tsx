import { AutoComplete, Form, Input, Modal, Select } from 'antd'
import React, { FC, useEffect } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import IProduct from '../../interface/Product'
import { useForm } from 'antd/es/form/Form'
import ProductInventoryForm from '../Form/ProductInventoryForm'

interface ImportingModalProps extends ModalProps {
  setIsReadOnly?: Function,
  isReadOnly?: boolean,
  selectedItem?: IProduct
}

const ImportingModal: FC<ImportingModalProps> = ({ isOpen, setIsModalOpen, selectedItem, isReadOnly = false, setIsReadOnly }) => {
  const [form] = useForm();

  const handleOkeModal = () => {
    form.validateFields().then((data) => {
      console.log(data)
    })
  }
  useEffect(() => {
    console.log(selectedItem)
  },[selectedItem])

  return (
    <Modal
      title={'Nhập sản phẩm'}
      open={isOpen} width={'70vw'}
      onOk={handleOkeModal}
      onCancel={() => {
        if(!isReadOnly){
          Modal.confirm({
            title: 'Cảnh báo mất dữ liệu',
            content: 'Thoát sẽ bị mất hết thông tin nhập hàng, bạn có đồng ý?',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            onOk: () => {
              setIsModalOpen((prev: boolean) => !prev)
            },
          });
        } 
        else{
          setIsReadOnly(false);
          setIsModalOpen((prev: boolean) => !prev)
        }
      }}>
      <Form form={form}>
        <Form.Item initialValue={selectedItem?.name} name="product" label="Nhập sản phẩm">
          <Input disabled={true}/>
        </Form.Item>
        <ProductInventoryForm isReadOnly={isReadOnly} selectedItem={selectedItem} form={form}/>
      </Form>
    </Modal>
  )
}

export default ImportingModal