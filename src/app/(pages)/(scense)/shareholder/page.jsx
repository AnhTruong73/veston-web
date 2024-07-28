
import ShareDetailForm from './ShareDetailForm';
import ShareholderTable from './ShareholderTable';
import SHSearchForm from './SHSearchForm';

export default function Shareholder() {
  return (
    <>

      <div className="space-y-4 rounded-lg w-full">
        <SHSearchForm/>
        <ShareholderTable/>
      </div>
      <ShareDetailForm/>

    </>
  );
}
