import { FileText, Download } from 'lucide-react';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useTheme } from '../../context/ThemeContext';

export default function InsightsHeader() {
  const { themeClasses } = useTheme();
  const { generatePDF, isGenerating } = usePDFExport();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
      <div className="max-w-2xl">
        <h1 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>AI Intelligence & Insights</h1>
        <p className={`text-sm italic ${themeClasses.textSecondary}`}>
          "Julian, your financial trajectory is currently leaning toward 'enthusiastic consumer' rather than 'principled architect'."
        </p>
      </div>

      <div className="flex flex-col lg:items-end gap-3">
        <div>
          <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase mb-1 inline-block">Status Report</span>
          <h3 className={`font-bold tracking-wide ${themeClasses.textPrimary}`}>Q4 Precision Analysis</h3>
        </div>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
        >
          {isGenerating ? (
            <>
              <Download size={14} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <FileText size={14} /> Export PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}
