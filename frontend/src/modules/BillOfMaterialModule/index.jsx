import { useEffect, useState } from 'react';
import { Drawer, Button, Space, Popconfirm, message } from 'antd';
import useLanguage from '@/locale/useLanguage';
import useFetch from '@/hooks/useFetch';
import useCrud from '@/hooks/useCrud';
import DataTable from '@/components/DataTable';
import DynamicForm from '@/forms/DynamicForm';

export default function BillOfMaterialModule({ config }) {
  const translate = useLanguage();
  const { entity, fields, dataTableColumns, searchConfig, deleteModalLabels } = config;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { result, isLoading, crud, refresh } = useFetch({ entity });
  const { create, update, remove } = useCrud({ entity });

  const onFinish = async (values) => {
    const key = 'saving';
    message.loading({ content: 'Saving...', key });
    try {
      if (isUpdate) {
        await update(currentRecord._id, values);
        message.success({ content: 'Updated successfully', key });
      } else {
        await create(values);
        message.success({ content: 'Created successfully', key });
      }
      refresh();
      setOpenDrawer(false);
    } catch (err) {
      message.error({ content: 'Error occurred', key });
    }
  };

  const onDelete = async (id) => {
    await remove(id);
    refresh();
  };

  const openCreateDrawer = () => {
    setCurrentRecord(null);
    setIsUpdate(false);
    setOpenDrawer(true);
  };

  const openUpdateDrawer = (record) => {
    setCurrentRecord(record);
    setIsUpdate(true);
    setOpenDrawer(true);
  };

  const drawerTitle = isUpdate ? translate('Update BOM') : translate('Add BOM');

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreateDrawer}>
          + {translate('Add BOM')}
        </Button>
      </Space>
      <DataTable
        columns={[
          ...dataTableColumns,
          {
            title: translate('Actions'),
            dataIndex: 'actions',
            render: (_, record) => (
              <Space>
                <Button onClick={() => openUpdateDrawer(record)}>{translate('Edit')}</Button>
                <Popconfirm title="Are you sure?" onConfirm={() => onDelete(record._id)}>
                  <Button danger>{translate('Delete')}</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        dataSource={result}
        loading={isLoading}
        rowKey="_id"
        searchConfig={searchConfig}
      />
      <Drawer
        title={drawerTitle}
        width={720}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        destroyOnClose
      >
        <DynamicForm
          fields={fields}
          isUpdateForm={isUpdate}
          initialValues={currentRecord}
          onFinish={onFinish}
        />
      </Drawer>
    </>
  );
}
