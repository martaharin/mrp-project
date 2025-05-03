import useLanguage from '@/locale/useLanguage';
import ReadBOMModule from '@/modules/BOMModule/ReadBOMModule';

export default function BOMRead() {
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

  return <ReadBOMModule config={config} />;
}