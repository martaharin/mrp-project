import useLanguage from '@/locale/useLanguage';
import ReadMPSModule from '@/modules/MpsModule/ReadMPSModule';

export default function MPSRead() {
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

  return <ReadMPSModule config={configPage} />;
}