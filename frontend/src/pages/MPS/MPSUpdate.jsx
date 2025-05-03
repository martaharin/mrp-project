import useLanguage from '@/locale/useLanguage';
import UpdateMPSModule from '@/modules/MpsModule/UpdateMPSModule';

export default function MPSUpdate() {
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

  return <UpdateMPSModule config={configPage} />;
}