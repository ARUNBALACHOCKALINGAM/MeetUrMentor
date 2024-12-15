import { TrophyIcon } from "@heroicons/react/24/solid";
import { AiFillCheckCircle } from "react-icons/ai";

export const Achievements = () => {
  const achievements = [
    {
      level: "Level 1",
      description:
        "Completed the first milestone with outstanding performance. You have shown great determination and skill!",
      isAchieved: true,
    },
    {
      level: "Level 2",
      description:
        "On your way to completing the next level. Keep up the great work and aim for success!",
      isAchieved: false,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>
      <hr className="my-4 "/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md border ${
              achievement.isAchieved ? "border-green-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center mb-4">
              <TrophyIcon
                className={`w-8 h-8 ${
                  achievement.isAchieved ? "text-yellow-500" : "text-gray-400"
                }`}
              />
              <h2 className="ml-4 text-xl font-semibold">
                {achievement.level}
              </h2>
              {achievement.isAchieved && (
                <AiFillCheckCircle className="ml-2 text-green-500 w-6 h-6" />
              )}
            </div>
            <p className="text-gray-600 text-sm text-left">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
