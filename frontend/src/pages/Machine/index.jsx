import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Customer() {
  const translate = useLanguage();
  const entity = 'machine';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Kapasitas'),
      dataIndex: 'kapasitas',
    },
    {
      title: translate('Item'),
      dataIndex: ['item', 'name'],
    },
  ];
  const Labels = {
    PANEL_TITLE: translate('machine'),
    DATATABLE_TITLE: translate('machine_list'),
    ADD_NEW_ENTITY: translate('add_new_machine'),
    ENTITY_NAME: translate('machine'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
    // dataTableColumns,
  };
  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
