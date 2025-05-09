import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import MaterialRequirementForm from '../Forms/MaterialRequirementForm';

export default function CreateMaterialRequirementModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={MaterialRequirementForm} />
    </ErpLayout>
  );
}
