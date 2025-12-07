"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Documents
          </h1>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="h-10 bg-white border border-gray-300 rounded-lg"></div>
            </div>

            <div className="flex gap-3">
              <div className="h-10 w-32 bg-white border border-gray-300 rounded-lg"></div>
              <div className="h-10 w-40 bg-blue-600 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Created by
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    File size
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td colSpan={6} className="h-80">
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <div className="bg-red-50 rounded-full p-4 mb-4">
                        <AlertCircle className="text-red-600" size={48} />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Something went wrong
                      </h2>
                      <p className="text-gray-600 mb-6 text-center max-w-md">
                        We encountered an error while loading your documents.
                        Please try again.
                      </p>
                      {error.message && (
                        <p className="text-sm text-gray-500 mb-6 bg-gray-50 px-4 py-2 rounded border border-gray-200 max-w-md">
                          {error.message}
                        </p>
                      )}
                      <div className="flex gap-3">
                        <button
                          onClick={reset}
                          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <RefreshCw size={18} />
                          Try again
                        </button>
                        <button
                          onClick={() => (window.location.href = "/")}
                          className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <Home size={18} />
                          Go home
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200">
            <div className="text-sm text-gray-400">Show 10 rows per page</div>
            <div className="flex items-center gap-2 opacity-50">
              <button disabled className="p-1 rounded cursor-not-allowed">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  disabled
                  className="w-8 h-8 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  {num}
                </button>
              ))}
              <button disabled className="p-1 rounded cursor-not-allowed">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
