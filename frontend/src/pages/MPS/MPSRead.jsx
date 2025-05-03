import useLanguage from '@/locale/useLanguage';
import ReadMPSModule from '@/modules/MpsModule/ReadMPSModule';

export default function MPSRead() {
  const entity = 'productionSchedule';
  const translate = useLanguage();

  const Labels = {
    PANEL_TITLE: translate('productionSchedule'),
    ENTITY_NAME: translate('productionSchedule'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  return <ReadMPSModule config={configPage} />;
}