import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

<<<<<<< HEAD
export default function Customer() {
=======
export default function Item() {
>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
  const translate = useLanguage();
  const entity = 'item';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('item'),
    DATATABLE_TITLE: translate('item_list'),
    ADD_NEW_ENTITY: translate('add_new_item'),
    ENTITY_NAME: translate('item'),
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
<<<<<<< HEAD
      // allowedRoles={['owner', 'production']}
=======
>>>>>>> b5e4c5f8e5762a3322cc5781e7198531f0f0c105
    />
  );
}
