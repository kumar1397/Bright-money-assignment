import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBill, setBudget, calculateSelectedBills } from "../redux/billsSlice";
import AddEditBillModal from "./AddEditBillModal";
import BillFilter from "./BillFilter";
import TimeSeriesChart from "./TimeSeriesChart";

const BillDashboard = () => {
  const bills = useSelector((state) => state.bills.bills);
  const filteredCategory = useSelector((state) => state.bills.filteredCategory);
  const selectedBills = useSelector((state) => state.bills.selectedBills);
  const budget = useSelector((state) => state.bills.budget);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState(null);

  const filteredBills = filteredCategory
    ? bills.filter((bill) => bill.category === filteredCategory)
    : bills;

  const handleHighlightBills = () => {
    dispatch(calculateSelectedBills());
  };

  return (
    <div>
      <BillFilter />
      <button onClick={() => setModalData({})}>Add Bill</button>
      <div>
        <label>Monthly Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => dispatch(setBudget(Number(e.target.value)))}
        />
        <button onClick={handleHighlightBills}>Calculate Minimum Bills</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => (
            <tr
              key={bill.id}
              style={{ backgroundColor: selectedBills.includes(bill.id) ? "lightgreen" : "white" }}
            >
              <td>{bill.description}</td>
              <td>{bill.category}</td>
              <td>{bill.amount}</td>
              <td>{bill.date}</td>
              <td>
                <button onClick={() => setModalData(bill)}>Edit</button>
                <button onClick={() => dispatch(removeBill(bill.id))}>Delete</button>
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
