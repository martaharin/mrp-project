import useLanguage from '@/locale/useLanguage';
import UpdateBOMModule from '@/modules/BOMModule/UpdateBOMModule';

export default function BOMUpdate() {
  const translate = useLanguage();
  const entity = 'billofmaterial';

  const Labels = {
    PANEL_TITLE: translate('bom'),
    ENTITY_NAME: translate('bom'),
  };

  const config = {
    entity,
    ...Labels,
  };

  return <UpdateBOMModule config={config} />;
}