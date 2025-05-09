import useLanguage from '@/locale/useLanguage';
import ReadMaterialRequirementModule from '@/modules/MaterialRequirementModule/ReadMaterialRequirementModule';

export default function MaterialRequirementRead() {
  const translate = useLanguage();

  const entity = 'productionSchedule';

  const Labels = {
    PANEL_TITLE: translate('productionSchedule'),
    DATATABLE_TITLE: translate('productionSchedule_list'),
    ADD_NEW_ENTITY: translate('add_new_productionSchedule'),
    ENTITY_NAME: translate('productionSchedule'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadMaterialRequirementModule config={configPage} />;
}
