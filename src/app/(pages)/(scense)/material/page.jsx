import MaterialSearchForm from './MaterialSearchForm';
import TableMaterial from './TableMaterial';

export default function Employees() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <h1>Manage Material</h1>
        <MaterialSearchForm />
        <TableMaterial />
      </div>
    </>
  );
}
