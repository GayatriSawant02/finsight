import SummaryCards from './SummaryCards';
import SpendingCategories from './SpendingCategories';
import SpendingBreakdown from './SpendingBreakdown';
import UpcomingBills from './UpcomingBills';
import CashFlowDynamics from './CashFlowDynamics';

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-8 pt-4">
      {/* Top Cards Row */}
      <SummaryCards />
      
      {/* 3 Column Layout for Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SpendingCategories />
        <SpendingBreakdown />
        <UpcomingBills />
      </div>

      {/* Bottom Full Width Chart Row */}
      <CashFlowDynamics />
    </div>
  );
}
