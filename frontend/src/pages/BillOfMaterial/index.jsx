import useLanguage from '@/locale/useLanguage';
import { fields } from './config';
import { useMoney, useDate } from '@/settings';
import InvoiceDataTableModule from '@/modules/InvoiceModule/InvoiceDataTableModule';
import DynamicForm from '@/forms/DynamicForm';
import dayjs from 'dayjs';

export default function BillOfMaterial() {
  const translate = useLanguage();
  const entity = 'billofmaterial';

  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'item',
    displayLabels: ['name'],
    searchFields: 'name',
  };

  const deleteModalLabels = ['name'];

  const dataTableColumns = [
    {
      title: translate('Product'),
      dataIndex: 'name',
    },
    {
      title: translate('Material'),
      dataIndex: 'items',
      render: (items) =>
        Array.isArray(items) ? (
          <ul style={{ paddingLeft: '16px', margin: 0 }}>
            {items.map((entry, idx) => (
              <li key={idx}>{entry.item?.name || '-'}</li>
            ))}
          </ul>
        ) : (
          '-'
        ),
    },
    {
      title: translate('Quantity'),
      dataIndex: 'items',
      render: (items) =>
        Array.isArray(items) ? (
          <ul style={{ paddingLeft: '16px', margin: 0 }}>
            {items.map((entry, idx) => (
              <li key={idx}>{entry.quantity}</li>
            ))}
          </ul>
        ) : (
          '-'
        ),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Bill of Material'),
    DATATABLE_TITLE: translate('BOM List'),
    ADD_NEW_ENTITY: translate('Add BOM'),
    ENTITY_NAME: translate('BOM'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
    fields,
    searchConfig,
    deleteModalLabels,
  };

  return (
    <InvoiceDataTableModule
      config={config}
      createForm={<DynamicForm fields={fields} entity={entity} />}
      updateForm={<DynamicForm fields={fields} entity={entity} isUpdateForm />}
    />
  );
}
