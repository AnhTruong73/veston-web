import EmployeeEditForm from './EmployeeEditForm';
import EmployeeAddForm from './EmployeeAddForm';
import EmployeeSearchForm from './EmployeeSearchForm';
import EmployeeDetailForm from './EmployeeDetailForm';
import TableEmployee from './TableEmployee';

export default function Employees() {
  return (
    <>
      <div className="space-y-4 rounded-lg w-full">
        <EmployeeSearchForm />
        <TableEmployee />
      </div>
      <EmployeeAddForm />
      <EmployeeEditForm />
      <EmployeeDetailForm />
    </>
  );
}
