import React, { useState } from 'react';
import { Upload, CreditCard, Calendar, DollarSign, Hash, AlertCircle, CheckCircle2, Loader2, FileText } from 'lucide-react';

const SUPPORTED_ISSUERS = [
  'American Express',
  'Chase',
  'Citibank',
  'Capital One',
  'Discover'
];

export default function App() {
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      fakeParse(selectedFile);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  // Temporary fake parser for demo
  const fakeParse = (file) => {
    setParsing(true);
    setTimeout(() => {
      setParsing(false);
      setResult({
        issuer: 'Chase',
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2) + ' KB',
        cardLastFour: '1234',
        billingCycle: '01/10/2025 - 31/10/2025',
        paymentDueDate: '05/11/2025',
        totalBalance: '$1,234.56',
        minimumPayment: '$56.78'
      });
    }, 2000);
  };

  const DataPoint = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-lg font-semibold text-gray-900 break-words">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <CreditCard className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Credit Card Statement Parser</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Extract key information from credit card statements instantly
          </p>
        </div>

        {/* Supported Issuers */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Supported Card Issuers
          </h2>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_ISSUERS.map((issuer) => (
              <span
                key={issuer}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
              >
                {issuer}
              </span>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-indigo-600 mb-3" />
              <p className="mb-2 text-lg font-semibold text-gray-700">
                {file ? file.name : 'Click to upload PDF statement'}
              </p>
              <p className="text-sm text-gray-500">PDF files only • Max 10MB</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-semibold mb-1">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {parsing && (
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="text-gray-600 text-lg">Parsing your statement...</p>
          </div>
        )}

        {/* Results */}
        {result && !parsing && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <FileText className="w-6 h-6 text-indigo-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{result.issuer}</h2>
                <p className="text-sm text-gray-500">
                  {result.fileName} • {result.fileSize}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Data Points</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataPoint icon={Hash} label="Card Last 4 Digits" value={result.cardLastFour} color="bg-blue-500" />
              <DataPoint icon={Calendar} label="Billing Cycle" value={result.billingCycle} color="bg-purple-500" />
              <DataPoint icon={Calendar} label="Payment Due Date" value={result.paymentDueDate} color="bg-red-500" />
              <DataPoint icon={DollarSign} label="Total Balance" value={result.totalBalance} color="bg-green-500" />
              <DataPoint icon={DollarSign} label="Minimum Payment" value={result.minimumPayment} color="bg-orange-500" />
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Upload a credit card statement PDF to extract key information automatically</p>
          <p className="mt-1">Your data is processed locally and never sent to external servers</p>
        </div>
      </div>
    </div>
  );
}
