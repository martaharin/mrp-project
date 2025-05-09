import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import ProductionScheduleForm from '../Forms/MaterialRequirementForm';

export default function CreateProductionScheduleModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={ProductionScheduleForm} />
    </ErpLayout>
  );
}
