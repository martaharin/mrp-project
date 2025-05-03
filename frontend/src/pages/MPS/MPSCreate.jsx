import useLanguage from '@/locale/useLanguage';
import CreateMPSModule from '@/modules/MpsModule/CreateMPSModule';

export default function MPSCreate() {
  const entity = 'mps';
  const translate = useLanguage();

  const Labels = {
    PANEL_TITLE: translate('mps'),
    DATATABLE_TITLE: translate('mps_list'),
    ADD_NEW_ENTITY: translate('add_new_mps'),
    ENTITY_NAME: translate('mps'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  return <CreateMPSModule config={configPage} />;
}