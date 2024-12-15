import { useState } from 'react';
import Comments from './Comments';
import { History } from './History';
import { FaSortAmountDown } from "react-icons/fa";

const historyData = [
    {
        id: 1,
        user: 'B Arun Bala Chockalingam',
        date: '17 September 2024 at 12:11',
        status: 'IN PROGRESS',
        tag: 'IN DEVELOPMENT',
    },
    {
        id: 2,
        user: 'B Arun Bala Chockalingam',
        date: '17 September 2024 at 12:11',
        status: 'IN DEVELOPMENT',
        tag: 'IN UAT',
    },
    {
        id: 3,
        user: 'B Arun Bala Chockalingam',
        date: '9 September 2024 at 08:16',
        status: 'IN PROGRESS',
        tag: 'IN DEVELOPMENT',
    },
    {
        id: 4,
        user: 'Automation for Jira',
        date: '20 August 2024 at 04:32',
        comment: 'Updated the code as per the configuration requirements',
    },
    {
        id: 5,
        user: 'Prashant Kumar Singh',
        date: '16 August 2024 at 12:17',
        description: 'Go through the Hangfire file clean-up job, take the full understanding of current flow, and make it configurable to pick locations and drop files conditionally.',
    },
];



const ActivityLog = ({ colors }: any) => {
    const [activeTab, setActiveTab] = useState('History');

    const [comments, setComments] = useState([{ comment: "Good job on the progress so far! Remember to focus on the key deliverables by next week.", author: "Alex Mentor", commentId: "Eqe23r", dateCreated: "01/02/2024 20:00:00" }]);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            const newCommentObject = {
                comment: newComment,
                author: "Current User", // Replace with dynamic user if needed
                commentId: Math.random().toString(36).substr(2, 9), // Generate a unique ID
                dateCreated: new Date().toLocaleString(), // Add a timestamp
            };
            setComments([...comments, newCommentObject]);
            setNewComment("");
        }
    };

    return (
        <div className={`${colors.bg} rounded-md`}>
            <h1 className={`text-md font-semibold ${colors.text}`}>Activity</h1>

            {/* Tabs */}
            <div className='flex justify-between border-b'>
                <div className="flex space-x-4 pb-2 mt-2">
                    <span className={`text-sm font-thin text-gray-400`}>Show:</span>
                    {['All', 'Comments', 'History'].map((tab) => (
                        <button
                            key={tab}
                            className={`text-sm font-semibold ${activeTab === tab ? `${colors.text} border-b-2 ${colors.border}` : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button className='text-black text-sm flex items-center justify-center text-gray-700/90'><span>Newest First</span> <FaSortAmountDown className='ml-2'/> </button>
            </div>

            {/* Conditional Render */}
            {activeTab === 'All' ?
                (<div>
                    <History colors={colors} historyData={historyData} />
                    <Comments isAll={true} colors={colors} setNewComment={setNewComment} newComment={newComment} comments={comments} handleAddComment={handleAddComment} />
                </div>) : activeTab === 'History' ? (
                    <History colors={colors} historyData={historyData} />
                ) : <Comments isAll={false} colors={colors} setNewComment={setNewComment} newComment={newComment} comments={comments} handleAddComment={handleAddComment} />
            }
        </div>
    );
};

export default ActivityLog;
