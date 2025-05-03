import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import MPSForm from '@/modules/MpsModule/Forms/MPSForm'; // ✅ disesuaikan

export default function CreateMPSModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={MPSForm} />
    </ErpLayout>
  );
}