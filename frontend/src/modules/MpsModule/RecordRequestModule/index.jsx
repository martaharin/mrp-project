import { ErpLayout } from '@/layout';
import useLanguage from '@/locale/useLanguage';
import { useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import { fetchData, postData } from '@/utils/api'; // pastikan ada utils ini

const { Title } = Typography;

export default function RecordRequestModule({ config }) {
  const translate = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const entity = 'mps/shortage'; // asumsi endpoint REST API

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`/${entity}`);
      setData(result);
    } catch (err) {
      message.error('Failed to load shortage data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (record) => {
    try {
      await postData('/inventory/request', { materialId: record.materialId, qty: record.shortage });
      message.success('Request sent to inventory');
    } catch (err) {
      message.error('Failed to send request');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: translate('Product'),
      dataIndex: 'productName',
    },
    {
      title: translate('Material'),
      dataIndex: 'materialName',
    },
    {
      title: translate('Required Qty'),
      dataIndex: 'requiredQty',
    },
    {
      title: translate('Available Qty'),
      dataIndex: 'availableQty',
    },
    {
      title: translate('Shortage'),
      dataIndex: 'shortage',
    },
    {
      title: translate('Action'),
      render: (_, record) =>
        record.shortage > 0 ? (
          <Button type="primary" onClick={() => handleRequest(record)}>
            {translate('Request')}
          </Button>
        ) : (
          'Sufficient'
        ),
    },
  ];

  return (
    <ErpLayout>
      <Title level={4}>{translate('Material Shortage Requests')}</Title>
      <Table
        rowKey={(row) => `${row.mpsId}-${row.materialId}`}
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </ErpLayout>
  );
}
