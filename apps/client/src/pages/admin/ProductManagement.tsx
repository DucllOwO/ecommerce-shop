import { Button, Input, Space, Spin } from 'antd';
import { SetStateAction, useEffect, useReducer, useState, ChangeEvent } from 'react'
import ProductModal from '../../components/Modal/ProductModal';
import ProductTable from '../../components/Table/Product/ProductTable';
import IProduct from '../../interface/Product';
import { fetchAllProducts } from '../../api/admin/productAPI';
import { ACTION_READ, SET_ACTION, ACTION_CREATE, ACTION_EDIT } from '../../constant/constant';
import { searchDatabyPropertyName } from '../../helper/tableSorter';
import ErrorAlert from '../../components/Alert/ErrorAlert';

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
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchAllProducts().then(data => { setData(data.data); setSearchData(data.data); }).finally(() => setLoading(false));
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const text = e.target.value;
      setSearchText(text);
      if (text.length > 0)
        data && setSearchData(searchDatabyPropertyName(data, text, 'name'))
      else
        data && setSearchData(data);
    } catch (error) {
      ErrorAlert('Đã có lỗi khi tìm kiếm sản phẩm theo tên!!!')
    }

  }

  return (
    <>
      <Spin spinning={loading}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space direction='horizontal'>
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpen(true);
                dispatch({ type: SET_ACTION, payload: ACTION_CREATE })
              }}>Thêm mới</Button>
            <Input.Search value={searchText} size="middle" placeholder="Nhập tên sản phẩm" enterButton style={{ width: '100%' }} onChange={onChange} />
          </Space>

          {renderModal(isModalOpen, setIsModalOpen, state.action, setSearchData, selectedItem)}
          <ProductTable data={searchData} setSelectedItem={setSelectedItem} dispatch={dispatch} setIsModalOpen={setIsModalOpen} />
        </Space>
      </Spin>
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