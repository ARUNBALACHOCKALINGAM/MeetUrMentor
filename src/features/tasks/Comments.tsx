
type Comment = {
    commentId: string;
    author: string;
    dateCreated: string;
    comment: string;
};

type CommentsProps = {
    comments: Comment[];
    newComment: string;
    setNewComment: (arg0: string) => void;
    handleAddComment: () => void;
    colors: {
        bg: string;
        text: string;
        border: string;
        hoverBg: string;
    };
    isAll: Boolean
};

const Comments = ({
    comments,
    newComment,
    setNewComment,
    handleAddComment,
    colors,
    isAll
}: CommentsProps) => {


    return (
        <div className={`${colors.bg}`}>
            <div className=" mt-4">
                {/* New Comment Input */}
                {!isAll && (
                    <div className="mt-4 flex space-x-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-grow border border-gray-300 rounded-md px-2 py-1 text-sm"
                        />
                        <button
                            onClick={handleAddComment}
                            className={`bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm`}
                        >
                            Add
                        </button>
                    </div>
                )}
                {/* Existing Comments */}
                {comments.map((comment) => (
                    <div
                        key={comment.commentId}
                        className="flex items-start space-x-2 mt-6"
                    >
                        {/* Avatar */}
                        <div
                            className={`w-8 h-8 ${colors.border} self-center rounded-full flex items-center justify-center font-bold text-sm`}
                        >
                            {comment.author[0]}
                        </div>
                        {/* Comment Details */}
                        <div>
                            <p
                                className={`text-sm font-semibold ${colors.text}`}
                            >
                                {comment.author} <span className="text-xs text-gray-500">{comment.dateCreated}</span>
                            </p>
                            <p
                                className={`text-sm text-gray-700 bg-gray-100 rounded-md p-2`}
                            >
                                {comment.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;