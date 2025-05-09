import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import BillOfMaterialForm from '@/modules/BillOfMaterialModule/Forms/BillOfMaterialForm';

export default function CreateBillOfMaterialModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={BillOfMaterialForm} />
    </ErpLayout>
  );
}
