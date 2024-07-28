import OrderSearchForm from './OrderSearchForm';
import TableOrder from './TableOrder';

export default function Order() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1>Manage Order</h1>
        <OrderSearchForm />
        <TableOrder />
      </div>
    </>
  );
}
