import ReportsHeader from './ReportsHeader';
import ReportsSummaryCards from './ReportsSummaryCards';
import CategoryBreakdown from './CategoryBreakdown';
import IncomeSources from './IncomeSources';
import ComparisonTable from './ComparisonTable';
import MobileExportCard from './MobileExportCard';

export default function Reports() {
  return (
    <div className="p-4 lg:p-8 lg:pt-8 w-full max-w-[1200px] mx-auto min-h-screen">
      <ReportsHeader />
      <ReportsSummaryCards />
      
      {/* 9 columns total on desktop: Left is 5, Right is 4 (or similar ratio) */}
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
        <CategoryBreakdown />
        <IncomeSources />
      </div>

      {/* Contains desktop-first detailed tables */}
      <ComparisonTable />
      
      {/* Bottom overlay/card for mobile layout specifically */}
      <MobileExportCard />
    </div>
  );
}
