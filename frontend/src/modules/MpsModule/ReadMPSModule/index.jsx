import { ErpLayout } from '@/layout';
import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import useLanguage from '@/locale/useLanguage';

export default function ReadMPSModule({ config }) {
  const translate = useLanguage();

  const entity = 'productionSchedule';

  const fields = [
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
    {
      title: translate('Note'),
      dataIndex: 'notes',
    },
  ];

  const subTables = [
    {
      title: translate('Material Requirement'),
      dataIndex: 'bomItems', // asumsi dari backend: array of material in BillOfMaterial
      columns: [
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
          title: translate('Status'),
          dataIndex: 'status',
        },
      ],
    },
  ];

  return (
    <ErpLayout>
      <ReadItem
        entity={entity}
        fields={fields}
        subTables={subTables}
        config={config}
      />
    </ErpLayout>
  );
}