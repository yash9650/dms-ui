export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <div className="flex gap-3">
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 w-16 bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 w-24 bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 w-16 bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-4 w-20 bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, idx) => (
                  <tr key={idx} className="h-16">
                    <td className="px-4 py-3">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
