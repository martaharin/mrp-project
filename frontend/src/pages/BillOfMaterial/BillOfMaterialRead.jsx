import useLanguage from '@/locale/useLanguage';
import ReadBillOfMaterialModule from '@/modules/BillOfMaterialModule/ReadBillOfMaterialModule';

export default function BillOfMaterialRead() {
  const translate = useLanguage();

  const entity = 'billofmaterial';

  const Labels = {
    PANEL_TITLE: translate('billofmaterial'),
    DATATABLE_TITLE: translate('quote_list'),
    ADD_NEW_ENTITY: translate('add_new_quote'),
    ENTITY_NAME: translate('billofmaterial'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadBillOfMaterialModule config={configPage} />;
}
