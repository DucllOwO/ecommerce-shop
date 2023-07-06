import { useState, useEffect } from 'react'
import { Line } from '@ant-design/plots';
import { fetchReport } from '../../api/admin/dashboardAPI';
import IYearly_report from '../../interface/YearlyReport';
import IMonthly_report from '../../interface/MonthlyReport';
import dayjs from 'dayjs';

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReport()
      .then(data => setData(data.data[0].Monthly_report))
      .then(() => {
        console.log(mapData())
        config.data = mapData();
      })
      .catch((error) => {
        console.log("fetch error", error)
      });

  }, []);

  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
  //     .then((response) => response.json())
  //     .then((json) => console.log(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  const mapData = () => {
    const mapIncome = data.map((item : IMonthly_report) => {      
      return {month: dayjs(item.month).format("MM/YYYY"), value: Number(item.income), category: "Doanh thu"};       
    });
    const mapOutcome = data.map((item : IMonthly_report) => {
      return {month: dayjs(item.month).format("MM/YYYY"), value: Number(item.outcome), category: "Chi phí"};
    }); 
    const mapProfit = data.map((item : IMonthly_report) => {
      return {month: dayjs(item.month).format("MM/YYYY"), value: Number(item.profit), category: "Lợi nhuận"};
    });
    return [...mapIncome,...mapOutcome,...mapProfit];
  }
  const config = {
    data: mapData(),
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },

  };

  return <Line {...config} />;
}

export default LineChart