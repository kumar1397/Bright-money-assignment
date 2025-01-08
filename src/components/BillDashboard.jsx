import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBill, setBudget, calculateSelectedBills } from "../redux/billsSlice";
import AddEditBillModal from "./AddEditBillModal";
import BillFilter from "./BillFilter";
import TimeSeriesChart from "./TimeSeriesChart";

const BillDashboard = () => {
  const bills = useSelector((state) => state.bills.bills);
  const selectedBills = useSelector((state) => state.bills.selectedBills);
  const budget = useSelector((state) => state.bills.budget);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState(null);

  const handleHighlightBills = () => {
    dispatch(calculateSelectedBills());
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 shadow rounded-lg flex flex-col justify-center">
      <div className="flex justify-between items-center mb-4">
        <BillFilter />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setModalData({})}
        >
          Add Bill
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Monthly Budget:</label>
        <div className="flex items-center space-x-2 mt-1">
          <input
            type="number"
            value={budget || ""}
            onChange={(e) => dispatch(setBudget(Number(e.target.value)))}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleHighlightBills}
          >
            Calculate Minimum Bills
          </button>
        </div>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr
              key={bill.id}
              className={`border ${
                selectedBills.includes(bill.id) ? "bg-green-100" : "bg-white"
              }`}
            >
              <td className="border px-4 py-2">{bill.description}</td>
              <td className="border px-4 py-2">{bill.category}</td>
              <td className="border px-4 py-2">{bill.amount}</td>
              <td className="border px-4 py-2">{bill.date}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => setModalData(bill)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => dispatch(removeBill(bill.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddEditBillModal modalData={modalData} setModalData={setModalData} />
      <TimeSeriesChart bills={bills} />
    </div>
  );
};

export default BillDashboard;
