import { ErpLayout } from '@/layout';
import DataTable from '@/modules/ErpPanelModule/DataTable';
import useLanguage from '@/locale/useLanguage';

export default function MPSDataTableModule({ config }) {
  const translate = useLanguage();

  const entity = 'productionSchedule';

  const columns = [
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
    },
    {
      title: translate('End Date'),
      dataIndex: 'endDate',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  return (
    <ErpLayout>
      <DataTable
        entity={entity}
        columns={columns}
        searchFields="productName"
        addButtonLabel={translate('Create MPS')}
        config={config}
      />
    </ErpLayout>
  );
}
