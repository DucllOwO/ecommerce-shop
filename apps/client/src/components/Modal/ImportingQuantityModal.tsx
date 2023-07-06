import { Modal } from 'antd'
import { FC } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import { IImportDetail } from '../../interface/ImportDetail'
import ProductInventoryTable from '../Table/Product/ProductInventoryTable'

interface ImportingModalProps extends ModalProps {
  data: IImportDetail[]
}

const ImportingQuantityModal: FC<ImportingModalProps> = ({ isOpen, setIsModalOpen, data }) => {
  console.log(data)
  return (
    <Modal
      title={'Thông tin nhập hàng'}
      open={isOpen} width={'70vw'}
      onCancel={() => {
        setIsModalOpen((prev: boolean) => !prev)
      }} footer={null}>
      <ProductInventoryTable data={data}/>
    </Modal>
  )
}

export default ImportingQuantityModal