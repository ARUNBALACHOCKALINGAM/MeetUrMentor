// import React from 'react'

type AttachmentsProps = {
    colors: { bg: string; border: string; text: string; shadow: string; hoverBg: string },
    isEditing: boolean,
    handleFileUpload:(e: React.ChangeEvent<HTMLInputElement>) => void,
    attachments: File[]

}

export const Attachments = ({colors,isEditing,handleFileUpload,attachments}:AttachmentsProps) => {
  return (
      <div className="mb-6">
      <h3 className={`text-md font-semibold ${colors.text}`}>Attachments</h3>
      {isEditing && (
          <div className="mt-2">
              <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mentorPrimary"
              >
                  Upload Files
                  <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={handleFileUpload}
                  />
              </label>
          </div>
      )}
      {attachments.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {attachments.map((file, index) => (
                  <div key={index} className="border rounded-lg shadow-sm p-2">
                      {file.type.startsWith("image/") ? (
                          <img
                              src={"src/assets/aiavatars/ryan.png"}
                              alt={file.name}
                              className="w-full h-24 object-cover rounded"
                          />
                      ) : file.type === "application/pdf" ? (
                          <embed
                              src={URL.createObjectURL(file)}
                              type="application/pdf"
                              className="w-full h-24 rounded"
                          />
                      ) : (
                          <p className="text-sm text-gray-500">Unsupported File Type</p>
                      )}
                      <p className="text-xs text-gray-700 truncate mt-1">{file.name}</p>
                  </div>
              ))}
          </div>
      ) : <p className="text-sm text-gray-400 italic mt-2">No Attachements</p>}
  </div>
  )
}
