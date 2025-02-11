import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

const colors: Record<
  "mentor" | "student",
  {
    bg: string;
    border: string;
    text: string;
    buttonBg: string;
    buttonHoverBg: string;
  }
> = {
  mentor: {
    bg: "bg-[#FFF5E6]",
    border: "border-[#FFC400]",
    text: "text-[#FF8C00]",
    buttonBg: "bg-[#FFC400]",
    buttonHoverBg: "hover:bg-[#FFD966]",
  },
  student: {
    bg: "bg-[#EFF6FF]",
    border: "border-[#1D4ED8]",
    text: "text-[#1D4ED8]",
    buttonBg: "bg-[#1D4ED8]",
    buttonHoverBg: "hover:bg-[#3B82F6]",
  },
};

type Article = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

interface ArticleProps {
  role: "mentor" | "student";
}

// Dummy Articles Data
const initialArticles: Article[] = [
  {
    id: 1,
    title: "5 Strategies for Effective Mentorship",
    description:
      "Learn how to guide and support students or junior employees effectively.",
    image: "https://source.unsplash.com/400x250/?mentorship,teamwork",
    link: "#",
  },
  {
    id: 2,
    title: "Mastering Time Management as a Student",
    description:
      "Discover time management techniques to balance studies and personal life.",
    image: "https://source.unsplash.com/400x250/?time,student",
    link: "#",
  },
  {
    id: 3,
    title: "Latest Trends in the Tech Industry",
    description:
      "Stay updated with the emerging technologies shaping the industry today.",
    image: "https://source.unsplash.com/400x250/?technology,innovation",
    link: "#",
  },
];

export const Article: React.FC<ArticleProps> = ({ role }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleAddArticle = () => {
    if (newArticle.title && newArticle.description && newArticle.link) {
      setArticles([
        ...articles,
        {
          id: Date.now(),
          title: newArticle.title,
          description: newArticle.description,
          image: "https://source.unsplash.com/400x250/?news,reading",
          link: newArticle.link,
        },
      ]);
      setNewArticle({ title: "", description: "", link: "" });
    }
  };

  return (
    <div
      className={`w-full px-2 py-2 md:px-6 md:py-8 h-full overflow-auto mx-auto rounded-lg shadow-md ${colors[role].bg} ${colors[role].border} border-2`}
    >
      <h1 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${colors[role].text}`}>
        Articles and News - Mentor's Pick
      </h1>

      {/* Mentor: Add Article Section */}
      {role === "mentor" && (
        <div className="mb-4 flex p-4 border rounded-lg  shadow-sm">
          <input
            type="text"
            placeholder="Article Link"
            className="w-full flex-1 p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newArticle.link}
            onChange={(e) => setNewArticle({ ...newArticle, link: e.target.value })}
          />
          <button
            onClick={handleAddArticle}
            className={`px-2 w-20 flex justify-center align-center h-10 ml-2 text-white font-semibold rounded-lg transition ${colors.mentor.buttonBg} ${colors.mentor.buttonHoverBg}`}
          >
            <PlusCircle className="self-center"/>
          </button>
        </div>
      )}

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col sm:flex-row items-center border bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Image */}
            <img
              src={article.image}
              alt={article.title}
              className="w-full sm:w-40 h-32 object-cover"
            />

            {/* Article Details */}
            <div className="p-4 flex flex-col justify-between">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.description}</p>
              <a
                href={article.link}
                className={`mt-2 text-sm font-semibold ${colors[role].text} hover:underline`}
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
