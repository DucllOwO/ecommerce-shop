import { Button, Form, Space, Spin } from 'antd';
import { useEffect, useState } from 'react'
import VoucherTable from '../../components/Table/VoucherTable'
import IVoucher from '../../interface/Voucher';
import { fetchAllVouchers } from '../../api/admin/VoucherAPI';
import VoucherCreateModal from '../../components/Modal/VoucherCreateModal';

const Voucher = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IVoucher[]>();
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchAllVouchers().then((data) => {
      setData(data.data);
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
        <Form form={form} component={false}>
          <VoucherTable form={form} data={data} setData={setData} />
        </Form>
      </Space>
      <VoucherCreateModal setDataState={setData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Spin>
  )
}

export default Voucher