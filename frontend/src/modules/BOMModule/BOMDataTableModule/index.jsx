import { useEffect } from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';

const fields = {
  product: {
    type: 'string',
  },
  materials: {
    type: 'string',
  },
  qty: {
    type: 'number',
  },
};

export default function BOMDataTableModule({ config }) {
  useEffect(() => {
    document.title = config.DATATABLE_TITLE;
  }, [config]);

  const moduleConfig = {
    ...config,
    fields,
    searchConfig: {
      displayLabels: ['product'],
      searchFields: 'product',
    },
  };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={moduleConfig}
    />
  );
}
