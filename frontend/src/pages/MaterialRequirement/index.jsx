import dayjs from 'dayjs';
import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';
import MaterialRequirementDataTableModule from '@/modules/MaterialRequirementModule/MaterialRequirementDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

export default function MaterialRequirement() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'materialrequirement';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'materialrequirement',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['number', 'materialrequirement.name'];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Item Count'),
      dataIndex: 'items',
      render: (items) => items?.length || 0,
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Material Requirement'),
    DATATABLE_TITLE: translate('Material Requirement_list'),
    ADD_NEW_ENTITY: translate('add_new_Material Requirement'),
    ENTITY_NAME: translate('Material Requirement'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return <MaterialRequirementDataTableModule config={config} />;
}
