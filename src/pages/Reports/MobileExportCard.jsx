import { FileText, Download } from 'lucide-react';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useTheme } from '../../context/ThemeContext';

export default function MobileExportCard() {
  const { generatePDF, isGenerating } = usePDFExport();
  const { themeClasses } = useTheme();

  return (
    <div className={`lg:hidden mt-6 mb-24 ${themeClasses.cardBg} rounded-xl p-5 border ${themeClasses.cardBorder} shadow-xl shadow-black/20 flex items-center justify-between`}>
      <div>
         <h4 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-0.5`}>Export Analysis</h4>
         <p className={`text-[10px] ${themeClasses.textMuted}`}>Generate deep-dive PDF report</p>
      </div>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2"
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
  );
}
