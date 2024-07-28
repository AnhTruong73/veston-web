import GoodInvoicelSearchForm from './GoodInvoiceSearchForm';
import TableGoodInvoice from './TableGoodInvoice';

export default function GoodInvoice() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1>Manage Good Invoice</h1>
        <GoodInvoicelSearchForm />
        <TableGoodInvoice />
      </div>
    </>
  );
}
