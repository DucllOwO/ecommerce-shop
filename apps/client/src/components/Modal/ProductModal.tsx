import { Tag, Descriptions, Modal, Image as AntdImage, InputNumber, Button, Space, Divider } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { FC, useEffect, useState } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductInventoryTable from '../Table/Product/ProductInventoryTable'
import ITag from '../../interface/Tag'
import { fetchAllCollection, fetchAllTag, postProduct } from '../../api/admin/ProductAPI'
import ICollection from '../../interface/Collection'
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI'
import IDiscount from '../../interface/Discount'
import IProduct from '../../interface/Product'
import { IHaveTag } from '../../interface/HaveTag'
import { ACTION_CREATE, ACTION_EDIT, ACTION_READ } from '../../constant/constant'
import ProductCreateForm from '../Form/ProductCreateForm'
import ProductEditForm from '../Form/ProductEditForm'

interface ProductModalProps extends ModalProps {
  action: string,
  selectedItem?: IProduct
}

const ProductModal: FC<ProductModalProps> = ({ isOpen, setIsModalOpen, action, selectedItem }) => {
  const [form] = useForm();

  const [tag, setTag] = useState([]);
  const [collection, setCollection] = useState([]);
  const [discount, setDiscount] = useState([]);

  useEffect(()=> {
    console.log(selectedItem)
    fetchAllTag().then((data) => {
      setTag(data.data.map((item: ITag) =>{ 
        return {value: item.id, label: item.name}
      }))});
    fetchAllCollection().then((data) => {
      setCollection(data.data.map((item: ICollection) =>{ 
        return {value: item.id, label: item.name}
      }))});
    fetchAllDiscounts().then((data) => {
      setDiscount(data.data.map((item: IDiscount) =>{ 
        return {value: item.id, label: item.name}
      }))});
  },[])

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  

  return (
    <Modal
      title={'Thông tin chi tiết sản phẩm'}
      open={isOpen} width={'70vw'} footer={setModalFooter(action)}
      onCancel={() => {
        if (action == ACTION_CREATE || action == ACTION_EDIT)
          Modal.confirm({
            title: 'Cảnh báo mất dữ liệu',
            content: 'Chưa lưu chỉnh sửa, thoát sẽ bị mất hết thông tin, bạn có đồng ý?',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            onOk: () => {
              setIsModalOpen((prev: boolean) => !prev)
            }
          })
        else
          setIsModalOpen((prev: boolean) => !prev)
      }} >
      {renderModalContent(action, form, tag, collection, discount, selectedItem)}
    </Modal>
  )

  function setModalFooter(action: string) {
    return action == ACTION_CREATE || action == ACTION_EDIT ? [
      <Button key="submit" type="primary" onClick={() => {
        form.validateFields();
        console.log(form.getFieldValue('inventory'))
        if(ACTION_CREATE){
          const newProduct = {
            name: form.getFieldValue('name'),
            price: form.getFieldValue('price'),
            description: form.getFieldValue('description'),
            discount: {
              connect: {
                id: form.getFieldValue('discount')
              }
            },
            HaveTag:{
              createMany:{
                data: form.getFieldValue('tags').map((item: number) => {
                  return {tagID: item}
                }),
                skipDuplicates: true
              }
            },
            collection: {
              connect: {
                id: form.getFieldValue('collection')
              }
            },
            Product_item: {
              createMany: {
                data: getProductItem(form),
                skipDuplicates: true
              }}
          }
          console.log(newProduct)
          setIsModalOpen(false)
        }
      }}>
        Lưu
      </Button>,
      <Button key="back" onClick={() => {
        setIsModalOpen(false)
      }}>
        Hủy bỏ
      </Button>
    ] : null
  }
}
function getProductItem(form: FormInstance<any>){
  const productItemValue = form.getFieldValue('inventory')
  .map((item: any) => {
    let result: any = [];
    for(var property in item.amount){
      result = [
        ...result, {
          color: item.color,
          size: property,
          amount: item.amount[property] ,
      }]
    }
    return [...result];
  })
  let result : any = [];
  productItemValue.forEach((item: any) => {
    result = [...result, ...item];
  })
  return result;
}

function renderModalContent(action: string, form: FormInstance<any>, tags : ITag[], collections: ICollection[], discounts: IDiscount[], selectedItem?: IProduct) {
  switch (action) {
    case ACTION_CREATE:
      return <ProductCreateForm form={form} tagInit={tags} collectionInit={collections} discountInit={discounts}/>
    case ACTION_EDIT:
      return <ProductEditForm form={form} tagInit={tags} collectionInit={collections} discountInit={discounts} selectedItem={selectedItem}/>
    case ACTION_READ:
      return <Space direction='vertical' style={{ width: '100%' }}>
      <Descriptions title="Thông tin sản phẩm" bordered>
        <Descriptions.Item label="ID" span={1}>{selectedItem?.id}</Descriptions.Item>
        <Descriptions.Item label="Bộ siêu tập" span={2}>{selectedItem?.collection?.name}</Descriptions.Item>
        <Descriptions.Item label="Tên sản phẩm" span={3}>{selectedItem?.name}</Descriptions.Item>
        <Descriptions.Item label="Nhãn" span={3}>
          {selectedItem?.HaveTag?.map((item: IHaveTag) => <Tag>{item.tag.name}</Tag>)}
          {/* <Tag>Tag 1</Tag>
          <Tag>Tag 1</Tag>
          <Tag>Tag 1</Tag>
          <Tag>Tag 1</Tag>
          <Tag>Tag 1</Tag>
          <Tag>Tag 1</Tag> */}
        </Descriptions.Item>
        <Descriptions.Item label="Giá bán (đ)" span={1}>
          {selectedItem?.price}
        </Descriptions.Item>
        <Descriptions.Item label="Lượt xem" span={1}>{selectedItem?.view}</Descriptions.Item>
        <Descriptions.Item label="Lượt mua" span={1}>
          {selectedItem?.sold}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          {selectedItem?.isActive ? <Tag>Đang bán</Tag> : <Tag>Đã tạm ngừng</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="Hỉnh ảnh" span={3}>
          <AntdImage.PreviewGroup
            preview={{
              onVisibleChange(value, prevValue) {

              },
            }}
          >
            {selectedItem?.image.map((source) => 
              <AntdImage width={200} src={source} />
            )}
              </AntdImage.PreviewGroup>
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú" span={3}>
          {selectedItem?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Giảm giá" span={3}>{selectedItem?.discount?.name}</Descriptions.Item>
        <Descriptions.Item label="Giá nhập (đ)" span={3}>
          {selectedItem?.price}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng giá" span={3}>{selectedItem?.price}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductInventoryTable data={selectedItem?.Product_item} />
    </Space>
    default:
      break;
  }
}



export default ProductModal