import { Tag, Descriptions, Modal, Image as AntdImage, Select, Form, InputNumber, Switch, Upload, UploadFile, UploadProps, Input, Button, Space, Divider } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import { useForm } from 'antd/es/form/Form'
import { RcFile } from 'antd/es/upload'
import { FC, useEffect, useState } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { FORM_NO_BOTTOM_MARGIN } from '../../constant/styles'
import { onPreview } from '../../helper/uploadFileAntd'
import { ModalProps } from '../../interface/ModalProps'
import ProductInventoryForm from '../Form/ProductInventoryForm'
import ProductInventoryTable from '../Table/Product/ProductInventoryTable'
import ITag from '../../interface/Tag'
import { fetchAllCollection, fetchAllTag } from '../../api/admin/ProductAPI'
import ICollection from '../../interface/Collection'
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI'
import IDiscount from '../../interface/Discount'
import IProduct from '../../interface/Product'
import { IHaveTag } from '../../interface/HaveTag'

interface ProductModalProps extends ModalProps {
  isEditing?: boolean,
  setIsEditing: Function,
  selectedItem?: IProduct
}

const ProductModal: FC<ProductModalProps> = ({ isOpen, setIsModalOpen, isEditing, setIsEditing, selectedItem }) => {
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

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      title={'Thông tin chi tiết sản phẩm'}
      open={isOpen} width={'70vw'} footer={setModalFooter(isEditing)}
      onCancel={() => {
        if (isEditing === true)
          Modal.confirm({
            title: 'Cảnh báo mất dữ liệu',
            content: 'Chưa lưu chỉnh sửa, thoát sẽ bị mất hết thông tin, bạn có đồng ý?',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            onOk: () => {
              setIsEditing((prev: boolean) => !prev)
              setIsModalOpen((prev: boolean) => !prev)
            }
          })
        else
          setIsModalOpen((prev: boolean) => !prev)
      }} >
      {!isEditing ?
        <Form form={form}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Descriptions title="Thông tin sản phẩm" bordered>
              <Descriptions.Item label="ID" span={1}>1</Descriptions.Item>
              <Descriptions.Item label="Bộ siêu tập" span={2}>
                <Form.Item name={'collection'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Select
                    allowClear
                    style={{ width: '100%', color: 'black'}}
                    placeholder="Chọn nhãn cho sản phẩm"
                    options={collection}
                    
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Tên sản phẩm" span={3}>
                <Form.Item name={'name'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Nhãn" span={3}>
                <Form.Item name={'tags'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Chọn nhãn cho sản phẩm"
                    options={tag}
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán (đ)" span={1}>
                <Form.Item name={'price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <InputNumber
                    min={0}
                    max={100}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Lượt xem" span={1}>
                1000
              </Descriptions.Item>
              <Descriptions.Item label="Lượt mua" span={1}>
                1000
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={3}>
                <Form.Item name={'collection'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Switch defaultChecked />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Hỉnh ảnh" span={3}>
                <Form.Item
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  style={FORM_NO_BOTTOM_MARGIN}
                >
                  <AntdImgCrop rotationSlider>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                    >
                      {fileList.length < 4 && '+ Thêm ảnh'}
                    </Upload>
                  </AntdImgCrop>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú" span={3}>
                <Form.Item name={'note'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Input.TextArea style={{ width: '100%', height: 150 }} />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giảm giá (%)" span={3}>
                <Form.Item name={'discount'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Chọn mã giảm giá áp dụng cho sản phẩm"
                    options={discount}
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá nhập (đ)" span={3}>
                <Form.Item name={'import_price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán (đ)" span={3}>
                <Form.Item name={'actual_price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <ProductInventoryForm />
          </Space>
        </Form>
        :
        <Space direction='vertical' style={{ width: '100%' }}>
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
              <Tag color={'green'} title={'Hoàn thành'} />
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
              <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                controls={false}
                style={{ width: "100%" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá" span={3}>$60.00</Descriptions.Item>
          </Descriptions>
          <Divider />
          <ProductInventoryTable data={selectedItem?.Product_item} />
        </Space>
      }



    </Modal>
  )

  function setModalFooter(isEditing: boolean | undefined) {
    return isEditing ? [
      <Button key="back" onClick={() => {
        setIsEditing(false)
        setIsModalOpen(false)
      }}>
        Hủy bỏ
      </Button>,
      <Button key="submit" type="primary" onClick={() => {
        setIsEditing(false)
        setIsModalOpen(false)
      }}>
        Lưu
      </Button>
    ] : null
  }
}



export default ProductModal