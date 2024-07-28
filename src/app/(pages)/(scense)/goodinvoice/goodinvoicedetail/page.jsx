import GoodInvoicelDetailForm from './GoodInvoiceDetailForm';
import GoodInvoicelMasterForm from './GoodInvoicelMasterForm';

export default function GoodInvoiceDetail() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1>Good Invoice Detail</h1>
        <GoodInvoicelMasterForm />
        <GoodInvoicelDetailForm />
      </div>
    </>
  );
}
