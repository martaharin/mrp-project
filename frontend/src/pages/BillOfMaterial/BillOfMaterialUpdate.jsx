import useLanguage from '@/locale/useLanguage';
import UpdateBillOfMaterialModule from '@/modules/BillOfMaterialModule/UpdateBillOfMaterialModule';

export default function BillOfMaterialUpdate() {
  const translate = useLanguage();

  const entity = 'billofmaterial';

  const Labels = {
    PANEL_TITLE: translate('bill of material'),
    DATATABLE_TITLE: translate('quote_list'),
    ADD_NEW_ENTITY: translate('add_new_quote'),
    ENTITY_NAME: translate('billofmaterial'),
  };

  const configPage = {
    entity,
    ...Labels,
    title: 'Bill Of Material',
  };
  return <UpdateBillOfMaterialModule config={configPage} />;
}
