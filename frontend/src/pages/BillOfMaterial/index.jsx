import useLanguage from '@/locale/useLanguage';
import BOMDataTableModule from '@/modules/BOMModule/BOMDataTableModule';

export default function BillOfMaterial() {
  const translate = useLanguage();
  const entity = 'billofmaterial';

  const Labels = {
    PANEL_TITLE: translate('bom'),
    DATATABLE_TITLE: translate('bom_list'),
    ADD_NEW_ENTITY: translate('add_new_bom'),
    ENTITY_NAME: translate('bom'),
  };

  const config = {
    entity,
    ...Labels,
    deleteModalLabels: ['product.name'],
  };

  return <BOMDataTableModule config={config} />;
}