import useLanguage from '@/locale/useLanguage';
import CreateMaterialRequirementModule from '@/modules/MaterialRequirementModule/CreateMaterialRequirementModule';

export default function MaterialRequirementCreate() {
  const translate = useLanguage();

  const entity = 'materialrequirement';

  const Labels = {
    PANEL_TITLE: translate('materialrequirement'),
    DATATABLE_TITLE: translate('materialrequirement_list'),
    ADD_NEW_ENTITY: translate('add_new_materialrequirement'),
    ENTITY_NAME: translate('materialrequirement'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateMaterialRequirementModule config={configPage} />;
}
