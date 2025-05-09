import dayjs from 'dayjs';
import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';
import BillOfMaterialDataTableModule from '@/modules/BillOfMaterialModule/BillOfMaterialDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

export default function BillOfMaterial() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'billofmaterial';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'item',
    filter: { type: 'finish good' },
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['number', 'item.name'];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Item'),
      dataIndex: ['item', 'name'],
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('bill of material'),
    DATATABLE_TITLE: translate('bill of material list'),
    ADD_NEW_ENTITY: translate('add new bill of material'),
    ENTITY_NAME: translate('bill of material'),
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
  return <BillOfMaterialDataTableModule config={config} />;
}
