import dayjs from 'dayjs';
import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';
import ProductionScheduleDataTableModule from '@/modules/ProductionScheduleModule/ProductionScheduleDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

export default function ProductionSchedule() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'productionSchedule';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'productionSchedule',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['number', 'productionSchedule.name'];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('BOM'),
      dataIndex: ['bom', 'name'],
    },
    {
      title: translate('Quantity'),
      dataIndex: 'qty',
    },
    // {
    //   title: translate('Requs Date'),
    //   dataIndex: 'expiredDate',
    //   render: (date) => {
    //     return dayjs(date).format(dateFormat);
    //   },
    // },

    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Production Schedule'),
    DATATABLE_TITLE: translate('Production Schedule_list'),
    ADD_NEW_ENTITY: translate('add_new_Production Schedule'),
    ENTITY_NAME: translate('Production Schedule'),
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
  return <ProductionScheduleDataTableModule config={config} />;
}
