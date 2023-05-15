import { Button, DatePicker, Form, Space } from 'antd';
import { useEffect, useState } from 'react'
import VoucherTable from '../../components/Table/VoucherTable'
import IVoucher from '../../interface/Voucher';
import { fetchAllVouchers } from '../../api/admin/VoucherAPI';

// const originData: VoucherType[] = [];
// for (let i = 0; i < 10; i++) {
//   originData.push({
//     code: i + '_COOL',
//     name: `Discount ${i}`,
//     due: '12/05/2023',
//     discount: i + 10,
//     description: 'description ' + i
//   });
// }

const Voucher = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IVoucher[]>();

  useEffect(() => {
    fetchAllVouchers().then((data) => {
      setData(data.data);
    })
  },[])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type="primary">Thêm mới</Button>
      <Form form={form} component={false}>
        <VoucherTable form={form} data={data} setData={setData} />
      </Form>
    </Space>
  )
}

export default Voucher