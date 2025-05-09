import { ErpLayout } from '@/layout';
import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import useLanguage from '@/locale/useLanguage';

export default function ReadBOMModule({ config }) {
  const translate = useLanguage();
  const entity = 'bom';

  const fields = [
    {
      title: translate('Product'),
      dataIndex: ['product', 'name'],
    },
  ];

  const subTables = [
    {
      title: translate('Materials'),
      dataIndex: 'materials',
      columns: [
        {
          title: translate('Material'),
          dataIndex: ['material', 'name'],
        },
        {
          title: translate('Quantity per Unit'),
          dataIndex: 'quantity',
        },
      ],
    },
  ];

  return (
    <ErpLayout>
      <ReadItem entity={entity} fields={fields} subTables={subTables} config={config} />
    </ErpLayout>
  );
}