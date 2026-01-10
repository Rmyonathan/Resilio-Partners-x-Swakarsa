"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberRole: string;
  cvFile: string;
}

export default function CVModal({ isOpen, onClose, memberName, memberRole, cvFile }: CVModalProps) {
  const [cvContent, setCvContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && cvFile) {
      setIsLoading(true);
      setError(null);
      fetch(cvFile)
        .then(response => {
          if (!response.ok) throw new Error("Failed to load CV");
          return response.text();
        })
        .then(text => {
          setCvContent(text);
          setIsLoading(false);
        })
        .catch(err => {
          setError("Failed to load resume. Please try again later.");
          setIsLoading(false);
          console.error(err);
        });
    } else {
      setCvContent("");
    }
  }, [isOpen, cvFile]);

  // Handle escape key and body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${memberName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format CV content with proper line breaks and styling
  const formatCVContent = (text: string) => {
    const lines = text.split('\n');
    const sections: string[] = [];
    
    // Common section headers to identify
    const sectionHeaders = [
      'PROFESSIONAL SUMMARY',
      'TECHNICAL SKILLS',
      'PROFESSIONAL EXPERIENCE',
      'WORK EXPERIENCE',
      'LEADERSHIP EXPERIENCE',
      'KEY PROJECTS',
      'PROJECTS',
      'EDUCATION',
      'CERTIFICATIONS',
      'HONORS AND AWARDS',
      'CORE COMPETENCIES',
      'RELEVANT EXPERIENCE',
      'PROFESSIONAL CONTACT'
    ];

    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (trimmedLine === '') {
        return <div key={index} className="h-3" />;
      }
      
      // Check if this is a section header (all caps and matches known headers)
      const isSectionHeader = sectionHeaders.some(header => 
        trimmedLine.toUpperCase().includes(header) || 
        (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 60 && trimmedLine.length > 3)
      );
      
      // Check if this is likely a name (first line, all caps, reasonable length)
      const isName = index === 0 && trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 50;
      
      // Check if this is a role/title (second line after name)
      const isRole = index === 1 && trimmedLine.length < 80;
      
      // Format as name (largest, boldest)
      if (isName) {
        return (
          <div key={index} className="font-bold text-white text-2xl mb-2 mt-0">
            {trimmedLine}
          </div>
        );
      }
      
      // Format as role
      if (isRole) {
        return (
          <div key={index} className="text-indigo-400 text-lg mb-6 font-medium">
            {trimmedLine}
          </div>
        );
      }
      
      // Format as section header
      if (isSectionHeader) {
        return (
          <div key={index} className="font-bold text-white text-xl mt-8 mb-4 pt-4 border-t border-slate-700 first:border-t-0 first:mt-0">
            {trimmedLine}
          </div>
        );
      }
      
      // Check if line starts with bullet or dash
      if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•') || trimmedLine.match(/^\d+\./)) {
        return (
          <div key={index} className="text-slate-300 leading-relaxed mb-3 ml-6 flex items-start gap-3">
            <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
            <span className="flex-1">{trimmedLine.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      
      // Check if line is a date range or location (contains dates, locations, or years)
      if (trimmedLine.match(/\d{4}|Present|Remote|Indonesia|Jakarta/i)) {
        return (
          <div key={index} className="text-slate-400 leading-relaxed mb-2 italic text-sm">
            {trimmedLine}
          </div>
        );
      }
      
      // Format as regular text with better spacing
      return (
        <div key={index} className="text-slate-300 leading-relaxed mb-2.5">
          {trimmedLine}
        </div>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative z-10 w-full max-w-4xl rounded-2xl max-h-[90vh] overflow-hidden flex flex-col
            bg-slate-900 border border-slate-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
            <div>
              <h3 className="text-xl font-bold text-white">{memberName}</h3>
              <p className="text-sm text-slate-400 mt-1">{memberRole}</p>
            </div>
            <div className="flex items-center gap-3">
              {cvContent && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 transition-all text-sm font-medium"
                >
                  <Download size={16} />
                  Download
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div 
            className="flex-1 overflow-y-auto p-8 bg-slate-950/30"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #0f172a'
            }}
          >
            {isLoading && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
                  <p className="text-slate-400">Loading resume...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-400 mb-4">{error}</p>
                  <a
                    href={cvFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline inline-flex items-center gap-2 mt-2"
                  >
                    Open in new tab instead
                  </a>
                </div>
              </div>
            )}

            {!isLoading && !error && cvContent && (
              <div className="max-w-3xl mx-auto">
                <div className="text-slate-200 space-y-0 leading-relaxed">
                  {formatCVContent(cvContent)}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

