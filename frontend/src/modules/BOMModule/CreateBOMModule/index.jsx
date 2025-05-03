import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import BOMForm from '@/modules/BOMModule/Forms/BOMForm';

export default function CreateBOMModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={BOMForm} />
    </ErpLayout>
  );
}