import { Tag, Descriptions, Modal, Image as AntdImage, Select, Form, InputNumber, Switch, Upload, UploadFile, UploadProps, Input, Button } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import { FC, useState } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductOrderDetailTable from '../Table/Product/ProductDetailTable.Order'

interface ProductModalProps extends ModalProps {
  isEditing?: boolean,
  setIsEditing: Function
}

const onPreview = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image: HTMLImageElement = new Image();
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const ProductModal: FC<ProductModalProps> = ({ isOpen, setIsModalOpen, isEditing, setIsEditing }) => {

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
      {isEditing ?
        <Form>
          <Descriptions title="Thông tin sản phẩm" bordered>
            <Descriptions.Item label="ID" span={1}>1</Descriptions.Item>
            <Descriptions.Item label="Bộ siêu tập" span={2}>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn nhãn cho sản phẩm"
                options={[
                  {
                    value: 'jack',
                    label: 'Jack (100)',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy (101)',
                  },
                ]}
                onChange={handleChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Tên sản phẩm" span={3}>
              <Input style={{ width: '100%' }} />
            </Descriptions.Item>
            <Descriptions.Item label="Nhãn" span={3}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn nhãn cho sản phẩm"
                options={[
                  {
                    value: 'jack',
                    label: 'Jack (100)',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy (101)',
                  },
                ]}
                onChange={handleChange}

              />
            </Descriptions.Item>
            <Descriptions.Item label="Gía bán (đ)" span={1}>
              <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                controls={false}
                style={{ width: "100%" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Lượt xem" span={1}>
              1000
            </Descriptions.Item>
            <Descriptions.Item label="Lượt mua" span={1}>
              1000
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              <Switch defaultChecked />
            </Descriptions.Item>
            <Descriptions.Item label="Hỉnh ảnh" span={3}>
              <AntdImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}

                >
                  {fileList.length < 4 && '+ Thêm ảnh'}
                </Upload>
              </AntdImgCrop>
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú" span={3}>
              <Input.TextArea style={{ width: '100%', height: 150 }} />
            </Descriptions.Item>
            <Descriptions.Item label="Giảm giá (%)" span={3}>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn mã giảm giá áp dụng cho sản phẩm"
                options={[
                  {
                    value: 'jack',
                    label: 'Jack (100)',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy (101)',
                  },
                ]}
                onChange={handleChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá (đ)" span={3}>
              <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                controls={false}
                style={{ width: "100%" }}
              />
            </Descriptions.Item>
          </Descriptions>
        </Form>
        :
        <Descriptions title="Thông tin sản phẩm" bordered>
          <Descriptions.Item label="ID" span={1}>1</Descriptions.Item>
          <Descriptions.Item label="Bộ siêu tập" span={2}>Quần dài test</Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={3}>Quần dài thồng lòng</Descriptions.Item>
          <Descriptions.Item label="Nhãn" span={3}>
            <Tag>Tag 1</Tag>
            <Tag>Tag 1</Tag>
            <Tag>Tag 1</Tag>
            <Tag>Tag 1</Tag>
            <Tag>Tag 1</Tag>
            <Tag>Tag 1</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Gía bán (đ)" span={1}>
            100000
          </Descriptions.Item>
          <Descriptions.Item label="Lượt xem" span={1}>10000</Descriptions.Item>
          <Descriptions.Item label="Lượt mua" span={1}>
            999999
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
              <AntdImage width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
              <AntdImage
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </AntdImage.PreviewGroup>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={3}>
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá" span={3}>20</Descriptions.Item>
          <Descriptions.Item label="Tổng giá" span={3}>$60.00</Descriptions.Item>
        </Descriptions>
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