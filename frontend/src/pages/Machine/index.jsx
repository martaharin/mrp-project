import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
<<<<<<< HEAD
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Customer() {
=======
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
>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  const translate = useLanguage();
  const entity = 'machine';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

<<<<<<< HEAD
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
=======
>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  const Labels = {
    PANEL_TITLE: translate('machine'),
    DATATABLE_TITLE: translate('machine_list'),
    ADD_NEW_ENTITY: translate('add_new_machine'),
    ENTITY_NAME: translate('machine'),
  };
<<<<<<< HEAD
=======

>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  const configPage = {
    entity,
    ...Labels,
  };
<<<<<<< HEAD
=======

>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
<<<<<<< HEAD
    // dataTableColumns,
  };
=======
  };

>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
