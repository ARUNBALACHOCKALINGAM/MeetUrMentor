import React, { useEffect, useState } from 'react';
import { Attachment } from '../../abstraction/types/tasks.types';
import { DownloadIcon, TrashIcon } from 'lucide-react';
import { axiosTask } from '../../utils/axiosInstance';

type AttachmentsProps = {
  colors: { bg: string; border: string; text: string; shadow: string; hoverBg: string };
  isEditing: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  attachments: Attachment[];
  handleDeleteAttachment: (id: string) => void;
  handleDownloadAttachment: (file: string) => void;
};

export const Attachments = ({
  colors,
  isEditing,
  handleFileUpload,
  attachments,
  handleDeleteAttachment,
  handleDownloadAttachment,
}: AttachmentsProps) => {
  const [fileDetails, setFileDetails] = useState<{ [key: string]: any }>({});

  

  // Fetch file details for each attachment
  useEffect(() => {
    const fetchFileDetails = async () => {
      const details: { [key: string]: any } = {};
      for (const file of attachments) {
        try {
          const response = await axiosTask.get(`/tasks/files/${file.name}`);
          details[file._id] = response.data;
        } catch (error) {
          console.error(`Error fetching details for file ${file.name}:`, error);
        }
      }
      setFileDetails(details);
    };

    if (attachments.length > 0) {
      fetchFileDetails();
    }
  }, [attachments]);

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
          {attachments.map((file) => {
            const fileUrl = `/api/files/${file._id}`; // Endpoint to download the file

            return (
              <div key={file._id} className="border rounded-lg shadow-sm p-2 relative">
                <p className="text-xs text-gray-700 truncate mt-1">{file.name.split("-")[file.name.split("-").length - 1]}</p>
                <p className="text-xs text-gray-500">
                  Size: {fileDetails[file._id]?.metadata.size ? `${(fileDetails[file._id].size / 1024).toFixed(2)} KB` : 'Loading...'}
                </p>
                <p className="text-xs text-gray-500">
                  Type: {fileDetails[file._id]?.metadata.mimetype || 'Loading...'}
                </p>

                {isEditing ? (
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full hover:bg-red-600"
                    onClick={() => handleDeleteAttachment(file._id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="absolute top-1 right-1 bg-blue-500 text-white text-xs p-1 rounded-full hover:bg-blue-600"
                    onClick={() => handleDownloadAttachment(file._id)}
                  >
                    <DownloadIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic mt-2">No Attachments</p>
      )}
    </div>
  );
};