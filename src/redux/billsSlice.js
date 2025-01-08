import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [
    { id: 1, description: "Dominoes", category: "FoodNDining", amount: 430, date: "2020-02-01" },
    { id: 2, description: "Car wash", category: "Utility", amount: 500, date: "2020-06-01" },
    { id: 3, description: "Amazon", category: "Shopping", amount: 2030, date: "2020-07-01" },
    { id: 4, description: "House rent", category: "FoodNDining", amount: 35900, date: "2020-03-01" },
    { id: 5, description: "Tuition", category: "Education", amount: 2200, date: "2020-12-01" },
    { id: 6, description: "Laundry", category: "PersonalCare", amount: 320, date: "2020-01-14" },
    { id: 7, description: "Vacation", category: "Travel", amount: 3430, date: "2020-01-18" },
  ],
  filteredCategory: "",
  selectedBills: [], // Highlighted bills
  budget: 0, // Monthly budget
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index >= 0) {
        state.bills[index] = action.payload;
      }
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
    filterCategory: (state, action) => {
      state.filteredCategory = action.payload;
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
    calculateSelectedBills: (state) => {
      // Sort bills by amount (ascending)
      const sortedBills = [...state.bills].sort((a, b) => a.amount - b.amount);

      let remainingBudget = state.budget;
      state.selectedBills = [];

      for (const bill of sortedBills) {
        if (bill.amount <= remainingBudget) {
          state.selectedBills.push(bill.id);
          remainingBudget -= bill.amount;
        } else {
          break;
        }
      }
    },
  },
});

export const {
  addBill,
  editBill,
  removeBill,
  filterCategory,
  setBudget,
  calculateSelectedBills,
} = billsSlice.actions;

export default billsSlice.reducer;
