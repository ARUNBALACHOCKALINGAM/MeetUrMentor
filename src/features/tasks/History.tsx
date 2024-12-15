
export const History = ({colors,historyData}:any) => {
    return (
        <div className="mt-4">
            {historyData.map((entry:any) => (
                <div key={entry.id} className="flex items-start space-x-4 py-4 border-b">
                    {/* User Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 ${colors.border} rounded-full flex items-center justify-center font-semibold`}>
                        {entry.user.charAt(0)}
                    </div>

                    {/* Entry Content */}
                    <div className="flex-1">
                        <div className={`text-gray-800 font-medium`}>
                            {entry.user} <span className="text-gray-500 text-sm">{entry.date}</span>
                        </div>
                        {entry.status && (
                            <div className="mt-1">
                                <span className={`text-sm ${colors.text} font-semibold`}>
                                    Changed the <span className="text-gray-800 font-medium">Status</span> to{' '}
                                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded">{entry.tag}</span>
                                </span>
                            </div>
                        )}
                        {entry.comment && <p className="mt-1 text-gray-700">{entry.comment}</p>}
                        {entry.description && (
                            <pre className="mt-1 text-gray-600 whitespace-pre-wrap">{entry.description}</pre>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
