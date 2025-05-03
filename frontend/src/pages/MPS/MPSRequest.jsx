import useLanguage from '@/locale/useLanguage';
import RecordRequestModule from '@/modules/MpsModule/RecordRequestModule';

export default function MPSRequest() {
  const entity = 'productionSchedule';
  const translate = useLanguage();

  const Labels = {
    PANEL_TITLE: translate('material_shortage_request'),
    ENTITY_NAME: translate('productionSchedule'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  return <RecordRequestModule config={configPage} />;
}