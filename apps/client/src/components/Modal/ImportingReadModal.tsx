import { Modal } from 'antd'
import { FC } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ImportingDetailTable from '../Table/ImportingDetailTable'
import { IImportDetail } from '../../interface/ImportDetail'

interface ImportingModalProps extends ModalProps {
  data: IImportDetail[]
}

const ImportingReadModal: FC<ImportingModalProps> = ({ isOpen, setIsModalOpen, data }) => {
  console.log(data)
  return (
    <Modal
      title={'Thông tin nhập hàng'}
      open={isOpen} width={'70vw'}
      onCancel={() => {
        setIsModalOpen((prev: boolean) => !prev)
      }} footer={null}>
      <ImportingDetailTable data={data} />
    </Modal>
  )
}

export default ImportingReadModal