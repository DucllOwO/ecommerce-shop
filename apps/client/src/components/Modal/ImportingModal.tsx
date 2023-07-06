import { AutoComplete, Form, Input, InputNumber, Modal, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import IProduct from '../../interface/Product'
import { useForm } from 'antd/es/form/Form'
import ProductInventoryForm from '../Form/ProductInventoryForm'
import { REQUIRED_RULE } from '../../constant/formRules'
import IProduct_item from '../../interface/ProductItem'
import { createImport } from '../../api/admin/importAPI'
import SuccessAlert from '../Alert/SuccessAlert'

interface ImportingModalProps extends ModalProps {
  setIsReadOnly?: Function,
  isReadOnly?: boolean,
  selectedItem?: IProduct
}

const ImportingModal: FC<ImportingModalProps> = ({ isOpen, setIsModalOpen, selectedItem, isReadOnly = false, setIsReadOnly }) => {
  const [form] = useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const handleOkModal = () => {
    form.validateFields().then((data) => {
      console.log(data);
      const newImport = {
        total_cost: price,
        total_amount: totalAmount,
        ImportDetail: {
          createMany: {
            data: createImportDetail(data)
          }
        }
      }
      createImport(newImport).then((data) => {
        console.log(data.data);
        SuccessAlert("Nhập hàng thành công");
        setIsModalOpen((prev : boolean) => !prev)
      })
    })
  }
  const createImportDetail = (data: any) => {
    let result = [];
    data.inventory.map((item: any) => {
      for (var property in item.amount) {
        if(item.amount[property] > 0){
          console.log(property);
          
          const productItem = selectedItem?.product_item.filter((product) => product.color === item.color && product.size.trim() === property);
          result = [
            ...result,
            { 
              item: productItem[0]?.id,
              quantity: item.amount[property],
              price: data.price,
              total_cost: data.price * item.amount[property],
            }
          ]
        } 
      }
    })
    return result;
  }

  return (
    <Modal
      title={'Nhập sản phẩm'}
      open={isOpen} width={'70vw'}
      onOk={handleOkModal}
      onCancel={() => {
        if(!isReadOnly){
          Modal.confirm({
            title: 'Cảnh báo mất dữ liệu',
            content: 'Thoát sẽ bị mất hết thông tin nhập hàng, bạn có đồng ý?',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            onOk: () => {
              setIsModalOpen((prev: boolean) => !prev)
              console.log(totalAmount)
              setPrice(0);
              setTotalAmount(0);
            },
          });
        } 
        else{
          setIsReadOnly(false);
          setIsModalOpen((prev: boolean) => !prev);
          setPrice(0);
          setTotalAmount(0);
        }
      }}>
      <Form form={form}>
        <Form.Item initialValue={selectedItem?.name} name="product" label="Nhập sản phẩm">
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item name="price" label="Giá nhập" rules={[REQUIRED_RULE]}>
          <InputNumber style={{width: 250}} addonAfter={"VND"} onChange={(value) => setPrice(value)}/>
        </Form.Item>
        <ProductInventoryForm isReadOnly={isReadOnly} selectedItem={selectedItem} form={form} setTotalAmount={setTotalAmount}/>
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>
              Bạn đang nhập tổng cộng {totalAmount} sản phẩm
            </p>
            <div
              className="cart__info__txt__price">
                <span>Thành tiền:</span> <span>{price*totalAmount}</span>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default ImportingModal