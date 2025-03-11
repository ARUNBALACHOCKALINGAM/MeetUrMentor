import { formatDate } from "../../utils/dateformat";

export const History = ({ colors, historyData }: any) => {
    
  
    return (
      <div className="mt-4">
        {historyData.filter((data:any) => data.type==="history").map((entry: any) => (
          <div key={entry._id} className="flex items-start space-x-4 py-4 border-b">
            {/* User Icon */}
            <div className={`flex-shrink-0 w-8 h-8 ${colors.border} rounded-full flex items-center justify-center font-semibold`}>
              {entry.username.charAt(0)}
            </div>
  
            {/* Entry Content */}
            <div className="flex-1">
              <div className={`text-gray-800 font-medium`}>
                {entry.username}{' '}
                <span className="text-gray-500 text-sm">
                  {formatDate(entry.createdAt)} {/* Format the createdAt timestamp */}
                </span>
              </div>
              {entry.content.startsWith("Status") ? (
                <div className="mt-1">
                  <span className={`text-sm ${colors.text} font-semibold`}>
                    Changed the <span className="text-gray-800 font-medium">Status</span> to{' '}
                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded">
                      {(entry.content.split(" ").slice(-1)[0]).toUpperCase()} {/* Fixed: Use slice(-1) */}
                    </span>
                  </span>
                </div>
              ) : (
                entry.type === "history" && <pre className="mt-1 text-gray-600 whitespace-pre-wrap">{entry.content}</pre>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };