import useLanguage from '@/locale/useLanguage';
import CreateBillOfMaterialModule from '@/modules/BillOfMaterialModule/CreateBillOfMaterialModule';

export default function BillOfMaterialCreate() {
  const translate = useLanguage();

  const entity = 'billofmaterial';

  const Labels = {
    PANEL_TITLE: translate('quote'),
    DATATABLE_TITLE: translate('quote_list'),
    ADD_NEW_ENTITY: translate('add_new_quote'),
    ENTITY_NAME: translate('billofmaterial'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateBillOfMaterialModule config={configPage} />;
}
