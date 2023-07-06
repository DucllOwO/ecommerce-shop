import { Tag, Descriptions, Modal, Image as AntdImage, InputNumber, Button, Space, Divider, UploadFile } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { FC, useEffect, useState } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductInventoryTable from '../Table/Product/ProductInventoryTable'
import ITag from '../../interface/Tag'
import { fetchAllCollection, postProduct, updateProduct, uploadImage } from '../../api/admin/productAPI'
import ICollection from '../../interface/Collection'
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI'
import IDiscount from '../../interface/Discount'
import IProduct from '../../interface/Product'
import { IHaveTag } from '../../interface/HaveTag'
import { ACTION_CREATE, ACTION_EDIT, ACTION_READ, BUCKET_URL } from '../../constant/constant'
import ProductCreateForm from '../Form/ProductCreateForm'
import ProductEditForm from '../Form/ProductEditForm'
import slugify from 'slugify'
import { deleteHaveTag, fetchAllTag } from '../../api/admin/tagAPI'
import SuccessAlert from '../Alert/SuccessAlert'
import { formatNumberWithComma } from '../../helper/utils'
import IProduct_item from '../../interface/ProductItem'
import { createImport } from '../../api/admin/importAPI'

interface ProductModalProps extends ModalProps {
  action: string,
  selectedItem?: IProduct
}

const ProductModal: FC<ProductModalProps> = ({ isOpen, setIsModalOpen, action, selectedItem, setDataState }) => {
  const [form] = useForm();

  const [tag, setTag] = useState([]);
  const [collection, setCollection] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    console.log(selectedItem)
    fetchAllTag().then((data) => {
      setTag(data.data.map((item: ITag) => {
        return { value: item.id, label: item.name }
      }))
    });
    fetchAllCollection().then((data) => {
      setCollection(data.data.map((item: ICollection) => {
        return { value: item.id, label: item.name }
      }))
    });
    fetchAllDiscounts().then((data) => {
      setDiscount(data.data.map((item: IDiscount) => {
        return { value: item.id, label: item.name }
      }))
    });
  }, [])

  const handleOKModal = () => {
    form.validateFields().then((data) => {
      console.log(data)
      const slugString = slugify(data.name);
      if (action == ACTION_CREATE) {
        const newProduct = {
          name: data.name,
          slug: slugString,
          price: data.price,
          description: data.note,
          discount: data.discount ? {
            connect: {
              id: data.discount
            }
          } : undefined,
          image: createImageName(imageList, slugString),
          HaveTag: {
            createMany: {
              data: data.tags.map((item: number) => {
                return { tagID: item }
              }),
              skipDuplicates: true
            }
          },
          collection: data.collection ? {
            connect: {
              id: data.collection
            }
          } : undefined,
          product_item: {
            createMany: {
              data: getProductItemCreate(data.inventory),
              skipDuplicates: true
            }
          }
        }
        postProduct(newProduct).then(async (response) => {
          await uploadImageFunc(imageList, slugString);
          importProduct(response.data, data);
          setDataState((prev: IProduct[]) => [...prev, response.data]);
          SuccessAlert("Thêm sản phẩm thành công");
        }).catch((error) => {
          console.log(error);
          throw new Error;
        })
        setIsModalOpen(false)
      }
      else if (selectedItem) {
        console.log(data)
        const newProduct = {
          name: data.name,
          slug: slugString,
          price: data.price,
          description: data.note,
          discountID: data.discount ? data.discount : null,
          image: createImageName(imageList, slugString),
          HaveTag: {
            createMany: {
              data: data.tags.map((item: number) => {
                return { tagID: item.value ? item.value : item }
              }),
              skipDuplicates: true
            }
          },
          collectionID: data.collection ? data.collection : null,
        };
        console.log(newProduct);
        clearHaveTag(selectedItem).then(() => {
          updateProduct(newProduct, selectedItem.id).then((data) => {
            console.log(data)
            setDataState((prev: IProduct[]) => prev.map((item) => {
              if (item.id === data.data.id)
                return data.data;
              else
                return item;
            }))
            setIsModalOpen((prev: boolean) => !prev)
            updateImageFunc(imageList, slugString);
            SuccessAlert("Chỉnh sửa sản phẩm thành công");
          }).catch((error) => console.log(error));
        })
      }
    });
  }


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
      {renderModalContent(action, form, tag, collection, discount, selectedItem, setImageList)}
    </Modal>
  )

  function setModalFooter(action: string) {
    return action == ACTION_CREATE || action == ACTION_EDIT ? [
      <Button key="submit" type="primary" onClick={handleOKModal}>
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
async function clearHaveTag(selectedItem: IProduct): Promise<any> {
  return new Promise((resolve, reject) => {
    selectedItem.HaveTag.forEach((item: IHaveTag) => {
      deleteHaveTag(item);
    })
    resolve(true);
  });
}

function importProduct(productCreateResponse: IProduct, formData: any) {
  console.log(productCreateResponse);
  console.log(formData);
  let importDetail: any = [];
  productCreateResponse.product_item.forEach((item: IProduct_item) => {
    getProductItem(formData.inventory).forEach((inventory: any) => {
      console.log(inventory)
      if (inventory.size === item.size.trim() && inventory.color === item.color)
        importDetail = [...importDetail, {
          item: item.id,
          quantity: inventory.quantity,
          price: formData.import_price,
          total_cost: formData.import_price * inventory.quantity,
        }]
    })

  })
  const newImport = {
    total_cost: getTotalPrice(importDetail),
    total_amount: getTotalAmount(importDetail),
    ImportDetail: {
      createMany: {
        data: importDetail
      }
    }
  }
  createImport(newImport);
}

function getTotalPrice(data: any) {
  let result = 0;
  data.forEach((item: any) => {
    result = result + item.total_cost;
  })
  return result;
}

function getTotalAmount(data: any) {
  let result = 0;;
  data.forEach((item: any) => {
    result = result + item.quantity;
  })
  return result
}

function createImageName(imageList: any, slugString: string) {
  return imageList.map((item: any, index: number) => item.url ? item.url : `${BUCKET_URL}${slugString}-${index + 1}.${item.originFileObj.type.split('/')[1]}`)
}

async function uploadImageFunc(imageList: UploadFile[], slugString: string) {
  console.log(imageList);
  imageList.forEach((item: any, index: number) => {

    console.log(item);

    const formData = new FormData();
    formData.append('file', item.originFileObj, `${slugString}-${index + 1}.${item.originFileObj.type.split('/')[1]}`);
    uploadImage(formData).catch((error) => {
      console.log(error);
      throw new Error();
    })
  })
}

function updateImageFunc(imageList: UploadFile[], slugString: string) {
  console.log(imageList);
  imageList.forEach((item: any, index: number) => {

    console.log(item);
    if (item.originFileObj) {
      const formData = new FormData();
      formData.append('file', item.originFileObj, `${slugString}-${index + 1}.${item.originFileObj.type.split('/')[1]}`);
      uploadImage(formData).catch((error) => {
        console.log(error);
        throw new Error();
      })
    }
  })
}

function getProductItemCreate(inventory: any) {
  const productItemValue = inventory
    .map((item: any) => {
      let result: any = [];
      for (var property in item.amount) {
        result = [
          ...result, {
            color: item.color,
            size: property,
            quantity: 0,
          }]
      }
      return [...result];
    })
  let result: any = [];
  productItemValue.forEach((item: any) => {
    result = [...result, ...item];
  })
  return result;
}

function getProductItem(inventory: any) {
  const productItemValue = inventory
    .map((item: any) => {
      let result: any = [];
      for (var property in item.amount) {
        result = [
          ...result, {
            color: item.color,
            size: property,
            quantity: item.amount[property],
          }]
      }
      return [...result];
    })
  let result: any = [];
  productItemValue.forEach((item: any) => {
    result = [...result, ...item];
  })
  return result;
}

function renderModalContent(action: string, form: FormInstance<any>, tags: ITag[], collections: ICollection[], discounts: IDiscount[], selectedItem?: IProduct, setImageList?: any) {
  switch (action) {
    case ACTION_CREATE:
      return <ProductCreateForm form={form} tagInit={tags} collectionInit={collections} discountInit={discounts} setImageList={setImageList} />
    case ACTION_EDIT:
      return selectedItem ? <ProductEditForm form={form} tagInit={tags} collectionInit={collections} discountInit={discounts} selectedItem={selectedItem} setImageList={setImageList} /> : null
    case ACTION_READ:
      return <Space direction='vertical' style={{ width: '100%' }}>
        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} >
          <Descriptions.Item label="ID" span={1}>{selectedItem?.id}</Descriptions.Item>
          <Descriptions.Item label="Bộ siêu tập" span={2}>{selectedItem?.collection?.name ? selectedItem?.collection?.name : 'Không thuộc bộ sưu tập'}</Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={3} style={{ minWidth: 150 }}><p>{selectedItem?.name}</p></Descriptions.Item>
          <Descriptions.Item label="Nhãn" span={3}>
            {selectedItem?.HaveTag?.map((item: IHaveTag) => <Tag>{item.tag.name}</Tag>)}
          </Descriptions.Item>

          <Descriptions.Item label="Lượt xem" span={1}>{formatNumberWithComma(selectedItem?.view)}</Descriptions.Item>
          <Descriptions.Item label="Lượt mua" span={1}>
            {formatNumberWithComma(selectedItem?.sold)}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={1}>
            {selectedItem?.isActive ? <Tag>Đang bán</Tag> : <Tag>Đã tạm ngừng</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Hỉnh ảnh" span={3}>
            <AntdImage.PreviewGroup
            >
              {selectedItem?.image.map((source) =>
                <AntdImage width={200} src={source} />
              )}
            </AntdImage.PreviewGroup>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={3}>
            {selectedItem?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá" span={3}>{selectedItem?.discount?.name ? selectedItem?.discount?.name : 'Chưa áp dụng giảm giá'}</Descriptions.Item>
          <Descriptions.Item label="Giá bán (đ)" span={3}>
            {formatNumberWithComma(selectedItem?.price)}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <ProductInventoryTable data={selectedItem?.product_item} />
      </Space>
    default:
      break;
  }
}



export default ProductModal