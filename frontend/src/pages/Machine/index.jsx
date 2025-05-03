import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import useLanguage from '@/locale/useLanguage';

const fields = [
  {
    name: 'name',
    label: 'Nama Mesin',
    type: 'text',
    required: true,
  },
  {
    name: 'function',
    label: 'Fungsi Mesin',
    type: 'text',
    required: true,
  },
  {
    name: 'capacity',
    label: 'Kapasitas Maksimum',
    type: 'number',
    required: true,
  },
];

export default function Machine() {
  const translate = useLanguage();
  const entity = 'machine';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

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
  };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
