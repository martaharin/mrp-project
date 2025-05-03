import { ErpLayout } from '@/layout';
import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import BOMForm from '@/modules/BOMModule/Forms/BOMForm';

export default function UpdateBOMModule({ config }) {
  return (
    <ErpLayout>
      <UpdateItem config={config} UpdateForm={BOMForm} />
    </ErpLayout>
  );
}