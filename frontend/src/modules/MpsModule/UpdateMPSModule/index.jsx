import { ErpLayout } from '@/layout';
import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import MPSForm from '@/modules/MPSModule/Forms/MPSForm';

export default function UpdateMPSModule({ config }) {
  return (
    <ErpLayout>
      <UpdateItem config={config} UpdateForm={MPSForm} />
    </ErpLayout>
  );
}