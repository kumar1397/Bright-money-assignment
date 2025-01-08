
import { useDispatch } from "react-redux";
import { filterCategory } from "../redux/billsSlice";

const BillFilter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(filterCategory(e.target.value));
  };

  return (
    <select onChange={handleFilter}>
      <option value="">All</option>
      <option value="FoodNDining">Food & Dining</option>
      <option value="Utility">Utility</option>
      <option value="Shopping">Shopping</option>
      <option value="Education">Education</option>
      <option value="PersonalCare">Personal Care</option>
      <option value="Travel">Travel</option>
    </select>
  );
};

export default BillFilter;
