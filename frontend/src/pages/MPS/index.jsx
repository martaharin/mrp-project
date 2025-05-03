import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';
import MPSDataTableModule from '@/modules/MpsModule/MPSDataTableModule';

export default function MPS() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'mps';

  const dataTableColumns = [
    {
      title: translate('Product'),
      dataIndex: 'productName',
    },
    {
      title: translate('Quantity'),
      dataIndex: 'qty',
    },
    {
      title: translate('Start Date'),
      dataIndex: 'startDate',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('End Date'),
      dataIndex: 'endDate',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'confirmed' ? 'green' : 'orange'}>
          {translate(status)}
        </Tag>
      ),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('mps'),
    DATATABLE_TITLE: translate('MPS_list'),
    ADD_NEW_ENTITY: translate('add_new_mps'),
    ENTITY_NAME: translate('mps'),
    RECORD_ENTITY: translate('request_shortage'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig: null, // bisa ditambahkan nanti jika perlu
    deleteModalLabels: ['productName', 'startDate'],
  };

  return <MPSDataTableModule config={config} />;
}