import { useEffect, useState } from 'react'
import CustomerManagementTable from '../../components/Table/CustomerManagement';
import IUser from '../../interface/User';
import { fetchAllCustomers } from '../../api/admin/CustomerAPI';

// const originData: CustomerType[] = [];
// for (let i = 1; i < 10; i++) {
//   originData.push({
//     id: i.toString(),
//     email: `email${i}@gmail.com`,
//     address: `Số ${i}, đường ABC, Việt Nam`,
//     avatar: `https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png`,
//     firstName: i.toString(),
//     lastName: 'Nguyễn',
//     phoneNumber: `09441242${i}`,
//     logged_date: i + ' ngày trước',
//   });
// }

const CustomerManagement = () => {
  const [data, setData] = useState<IUser[]>();

  useEffect(() => {
    fetchAllCustomers().then(data => {
      console.log(data.data)
      setData(data.data);
    })
  }, [])
  return (
    <CustomerManagementTable data={data} setData={setData} />
  )
}

export default CustomerManagement