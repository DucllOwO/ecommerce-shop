import { Button, Image, InputNumber, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import productData from '../../../../assets/fake-data/products';
import LocalStorage from '../../../../helper/localStorage';
import ICart from '../../../../interface/Cart';
import { deleteCart, updateCart } from '../../../../api/CustomerAPI';

export type CartItemType = {
  image01: string,
  quantity: string,
  title: string,
  color: string,
  size: string,
  slug: string
}
export type CartTableProps = {
  cartList?: ICart[],
  setCartList: React.SetStateAction<any>
}



const CartTable = ({setCartList, cartList  } : CartTableProps) => {
  const [quantity, setQuantity] = useState();

  const columns: ColumnsType<ICart> = [
    {
      title: 'Sản phẩm',
      key: '1',
      width: '15%',
      render: (text, record) => {
        return <Image src={record.product_item.product.image[0]} />
      },
    },
    {
      title: '',
      key: '2',
      width: '30%',
      render: (text, record) => {
        return <Space style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
          <p>{`${record.product_item.product.name} `}</p>
          <p>{`(${record.product_item.size.trim()} ${record.product_item.color})`}</p>
        </Space>
      },
    },
    {
      title: 'Đơn giá',
      key: '3',
      width: '15%',
      render: (text, record) => {
        return <p>{record.product_item.product.price}</p>
      },
    },
    {
      title: 'Số lượng',
      key: '4',
      width: '15%',
      dataIndex: 'tags',
      render: (_, record) => {
        return <InputNumber defaultValue={record.quantity} onChange={(value) => {
          console.log(value)
          console.log(cartList)
          const currentUser = LocalStorage.getItem('user');
          setCartList((prev: any) => prev.map((data: ICart) => {
              if(data.itemID === record.itemID){
                if(currentUser){
                  updateCart(data.id, {quantity: value});
                }
                return {
                  ...data,
                  quantity: value
                }
              }
              else{
                return data;
              }
            })
          )
          LocalStorage.setItem('cart', cartList?.map((data: ICart) => {
            if(data.itemID === record.itemID){
              return {
                ...data,
                quantity: value
              }
            }
            else{
              return data;
            }
          }));
        }}/>
      }
    },
    {
      title: 'Tổng tiền',
      key: '5',
      width: '25%',
      dataIndex: 'tags',
      render: (text, record) => {
        return <p>{record.product_item.product.price * record.quantity}</p>
      }
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => {
        return <Button onClick={() => {
          console.log(record.id);
          deleteCart(record.id).then((data) => {
            LocalStorage.setItem('cart', LocalStorage.getItem('cart').filter((item: any) => JSON.stringify(item) !== JSON.stringify(record)))
            setCartList((prev: ICart[]) => prev.filter((item) => JSON.stringify(item) !== JSON.stringify(record)));
          })
        }}>Xóa</Button>
      }
    },
  ];
  return (
    <Table columns={columns} dataSource={cartList} scroll={{ x: '100%' }} ></Table>
  )
}

export default CartTable