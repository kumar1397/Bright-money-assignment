
import BillDashboard from "./components/BillDashboard";

const App = () => {
  return (
    <div className=" bg-yellow-100 flex flex-col py-6 justify-center">
      <div className="flex justify-center items-center h-full ">
        <span className="font-bold text-blue-600 text-2xl">Bill Manager</span>
      </div>
      <BillDashboard />
    </div>
  );
};

export default App;
