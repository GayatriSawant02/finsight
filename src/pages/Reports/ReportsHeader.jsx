import { FileText, Download } from 'lucide-react';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useTheme } from '../../context/ThemeContext';

export default function ReportsHeader() {
  const { generatePDF, isGenerating } = usePDFExport();
  const { themeClasses } = useTheme();
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
      <div>
        <h1 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>Financial Reports</h1>
        <p className={`text-sm ${themeClasses.textSecondary}`}>Deep-dive performance analysis for your fiscal portfolio.</p>
      </div>

      {/* Desktop Controls */}
      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-white text-black hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Download size={14} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <FileText size={14} /> PDF
            </>
          )}
        </button>
      </div>

      {/* Mobile Controls - Empty for now */}
      <div className="flex lg:hidden w-full justify-end items-center mt-2">
      </div>
    </div>
  );
}
