import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{bill.id ? "Edit Bill" : "Add Bill"}</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Description"
            value={bill.description || ""}
            onChange={(e) => setBill({ ...bill, description: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <select
            value={bill.category || ""}
            onChange={(e) => setBill({ ...bill, category: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="FoodNDining">Food & Dining</option>
            <option value="Utility">Utility</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="PersonalCare">Personal Care</option>
            <option value="Travel">Travel</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={bill.amount || ""}
            onChange={(e) => setBill({ ...bill, amount: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            type="date"
            value={bill.date || ""}
            onChange={(e) => setBill({ ...bill, date: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setModalData(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

AddEditBillModal.propTypes = {
  modalData: PropTypes.object,
  setModalData: PropTypes.func.isRequired,
};

export default AddEditBillModal;
