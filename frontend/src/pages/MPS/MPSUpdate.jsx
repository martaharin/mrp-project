import useLanguage from '@/locale/useLanguage';
import UpdateMPSModule from '@/modules/MpsModule/UpdateMPSModule';

export default function MPSUpdate() {
  const entity = 'mps';
  const translate = useLanguage();

  const Labels = {
    PANEL_TITLE: translate('mps'),
    ENTITY_NAME: translate('mps'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  return <UpdateMPSModule config={configPage} />;
}