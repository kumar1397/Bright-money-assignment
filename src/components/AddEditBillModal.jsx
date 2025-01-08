import  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBill, editBill } from "../redux/billsSlice";

const AddEditBillModal = ({ modalData, setModalData }) => {
  const [bill, setBill] = useState(modalData || {});
  const dispatch = useDispatch();

  useEffect(() => {
    setBill(modalData || {});
  }, [modalData]);

  const handleSave = () => {
    if (bill.id) {
      dispatch(editBill(bill));
    } else {
      dispatch(addBill({ ...bill, id: Date.now() }));
    }
    setModalData(null);
  };

  return modalData ? (
    <div>
      <input
        type="text"
        placeholder="Description"
        value={bill.description || ""}
        onChange={(e) => setBill({ ...bill, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={bill.category || ""}
        onChange={(e) => setBill({ ...bill, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={bill.amount || ""}
        onChange={(e) => setBill({ ...bill, amount: e.target.value })}
      />
      <input
        type="date"
        value={bill.date || ""}
        onChange={(e) => setBill({ ...bill, date: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setModalData(null)}>Cancel</button>
    </div>
  ) : null;
};

export default AddEditBillModal;
