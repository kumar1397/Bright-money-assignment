
import BillDashboard from "./components/BillDashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Bill Manager</h1>
      <BillDashboard />
    </div>
  );
};

export default App;
