
import CustomerDetailForm from './CustomerDetailForm';
import CustomerTable from './CustomerTable';
import CustomerSearchForm from './CustomerSearchForm';

export default function Shareholder() {
  return (
    <>

      <div className="space-y-4 rounded-lg w-full">
        <CustomerSearchForm/>
        <CustomerTable/>
      </div>
      <CustomerDetailForm/>

    </>
  );
}
