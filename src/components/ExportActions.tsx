"use client";

import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { MediaCompany } from '@/types/database.types';
import { exportToCSV, copyToClipboard } from '@/lib/utils';

interface ExportActionsProps {
  companies: MediaCompany[];
}

export default function ExportActions({ companies }: ExportActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(companies);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => exportToCSV(companies)}
        disabled={companies.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </button>
      <button
        onClick={handleCopy}
        disabled={companies.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy to Clipboard
          </>
        )}
      </button>
    </div>
  );
}
