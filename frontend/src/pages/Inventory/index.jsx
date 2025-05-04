import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function InventoryPage() {
  const translate = useLanguage();
  const entity = 'batch'; // ✅ ganti ini

  const searchConfig = {
    displayLabels: ['name'], // ✅ sesuaikan dengan field backend (`name` bukan `batchName`)
    searchFields: 'name',
  };

  const deleteModalLabels = ['name', 'quantity']; // ✅ sesuaikan juga

  const Labels = {
    PANEL_TITLE: translate('Inventory'),
    DATATABLE_TITLE: translate('Inventory List'),
    ADD_NEW_ENTITY: translate('Add New Inventory'),
    ENTITY_NAME: translate('Inventory'),
  };

  const configPage = { entity, ...Labels };
  const config = { ...configPage, fields, searchConfig, deleteModalLabels };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
