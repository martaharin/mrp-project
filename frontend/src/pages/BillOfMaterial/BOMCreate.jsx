import useLanguage from '@/locale/useLanguage';
import CreateBOMModule from '@/modules/BOMModule/CreateBOMModule';

export default function BOMCreate() {
  const translate = useLanguage();
  const entity = 'billofmaterial';

  const Labels = {
    PANEL_TITLE: translate('bom'),
    ADD_NEW_ENTITY: translate('add_new_bom'),
    ENTITY_NAME: translate('bom'),
  };

  const config = {
    entity,
    ...Labels,
  };

  return <CreateBOMModule config={config} />;
}
