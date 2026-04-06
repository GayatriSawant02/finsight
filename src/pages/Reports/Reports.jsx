import ReportsHeader from './ReportsHeader';
import ReportsSummaryCards from './ReportsSummaryCards';
import SpendingTrends from './SpendingTrends';
import FinancialInsights from './FinancialInsights';
import CategoryBreakdown from './CategoryBreakdown';
import IncomeSources from './IncomeSources';
import ComparisonTable from './ComparisonTable';
import MobileExportCard from './MobileExportCard';

export default function Reports() {
  return (
    <div className="p-4 lg:p-8 lg:pt-8 w-full max-w-[1400px] mx-auto min-h-screen reports-container">
      <ReportsHeader />
      <ReportsSummaryCards />
      
      {/* Spending Trends Chart - Full width on all screens */}
      <SpendingTrends />
      
      {/* Financial Insights - Full width on all screens */}
      <FinancialInsights />
      
      {/* Category Breakdown and Income Sources - Responsive grid */}
      <div className="grid grid-cols-1 xl:grid-cols-9 gap-4 lg:gap-6">
        <div className="xl:col-span-5">
          <CategoryBreakdown />
        </div>
        <div className="xl:col-span-4">
          <IncomeSources />
        </div>
      </div>

      {/* Comparison Table - Full width with responsive padding */}
      <div className="mt-6">
        <ComparisonTable />
      </div>
      
      {/* Mobile Export Card */}
      <MobileExportCard />
    </div>
  );
}
