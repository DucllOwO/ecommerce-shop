import { Button, Space } from 'antd';
import { SetStateAction, useEffect, useReducer, useState } from 'react'
import ProductModal from '../../components/Modal/ProductModal';
import ProductTable from '../../components/Table/Product/ProductTable';
import IProduct from '../../interface/Product';
import { fetchAllProducts } from '../../api/admin/productAPI';
import { ACTION_READ, SET_ACTION, ACTION_CREATE, ACTION_EDIT } from '../../constant/constant';

const initValue = {
  action: ACTION_READ,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_ACTION:
      return { ...state, action: action.payload };
  }
}

const ProductManagement = () => {
  const [data, setData] = useState<IProduct[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>();
  const [state, dispatch] = useReducer(reducer, initValue);
  useEffect(() => {
    fetchAllProducts().then(data => setData(data.data));
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            dispatch({ type: SET_ACTION, payload: ACTION_CREATE })
          }}>Thêm mới</Button>
        {renderModal(isModalOpen, setIsModalOpen, state.action, setData, selectedItem)}
        <ProductTable data={data} setSelectedItem={setSelectedItem} dispatch={dispatch} setIsModalOpen={setIsModalOpen} />
      </Space>
    </>
  )
}

function renderModal(isOpen: boolean, setIsModalOpen: Function, action: string, setData: SetStateAction<any>, selectedItem?: IProduct,) {
  if (isOpen === false)
    return null;
  // console.log(selectedItem)
  switch (action) {
    case ACTION_CREATE:
      return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} action={ACTION_CREATE} setDataState={setData} />
    case ACTION_EDIT:
      return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} action={ACTION_EDIT} selectedItem={selectedItem} setDataState={setData} />
    case ACTION_READ:
      return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} action={ACTION_READ} selectedItem={selectedItem} setDataState={setData} />
  }
}

export default ProductManagement