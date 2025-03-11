import { useEffect, useState } from 'react';
import Comments from './Comments';
import { History } from './History';
import { FaSortAmountDown } from "react-icons/fa";
import { Activity } from '../../abstraction/types/tasks.types';
import { axiosTask } from '../../utils/axiosInstance';

const ActivityLog = ({ activities, colors, taskId }: any) => {
    const [activeTab, setActiveTab] = useState('History');
    const [comments, setComments] = useState<Activity[]>([]);
    const [newComment, setNewComment] = useState("");

    // Fetch comments from the backend
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosTask.get(`/activity/comments/${taskId}`);
                setComments(response.data); // Update the comments state with the fetched data
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [taskId]);

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                // Make a POST request to add a comment
                const response = await axiosTask.post(`/activity/comments/${taskId}`, {
                    content: newComment,
                });

                // Update the local state with the new comment
                const newActivity = response.data; // Assuming the response contains the new activity
                setComments((prevActivities) => [...prevActivities, newActivity]);

                // Clear the comment input
                setNewComment("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
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
                <button className='text-black text-sm flex items-center justify-center text-gray-700/90'>
                    <span>Newest First</span> <FaSortAmountDown className='ml-2' />
                </button>
            </div>

            {/* Conditional Render */}
            {activeTab === 'All' ? (
                <div>
                    <History colors={colors} historyData={activities} />
                    <Comments
                        isAll={true}
                        colors={colors}
                        setNewComment={setNewComment}
                        newComment={newComment}
                        comments={comments}
                        handleAddComment={handleAddComment}
                    />
                </div>
            ) : activeTab === 'History' ? (
                <History colors={colors} historyData={activities} />
            ) : (
                <Comments
                    isAll={false}
                    colors={colors}
                    setNewComment={setNewComment}
                    newComment={newComment}
                    comments={comments}
                    handleAddComment={handleAddComment}
                />
            )}
        </div>
    );
};

export default ActivityLog;