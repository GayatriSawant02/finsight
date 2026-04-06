import InsightsHeader from './InsightsHeader';
import FinancialReport from './FinancialReport';
import SpendingInsights from './SpendingInsights';
import SmartSuggestions from './SmartSuggestions';
import AnomalyCard from './AnomalyCard';
import WeeklyWin from './WeeklyWin';
import SavingsOpportunities from './SavingsOpportunities';

export default function Insights() {
  return (
    <div className="p-4 lg:p-8 lg:pt-8 w-full max-w-[1200px] mx-auto min-h-screen">
      <InsightsHeader />
      <FinancialReport />
      
      {/* Grid structure mapping Left side and Right side blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
        
        {/* Left Column Sequence */}
        <div className="flex flex-col">
           <SpendingInsights />
           <SmartSuggestions />
        </div>

        {/* Right Column Sequence */}
        <div className="flex flex-col">
           <AnomalyCard />
           <WeeklyWin />
        </div>
      </div>

      {/* Full width bottom architecture */}
      <SavingsOpportunities />
    </div>
  );
}
