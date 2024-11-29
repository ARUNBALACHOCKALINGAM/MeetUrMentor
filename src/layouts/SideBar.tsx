import React from "react";
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaChalkboardTeacher, FaTasks, FaTrophy } from "react-icons/fa";
import { FaBarsProgress, FaMessage, FaNoteSticky } from "react-icons/fa6";
import { useSelector } from "react-redux";

export function SideBar() {
    const [sideBarOpen, setSideBarOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(0);
    const userType = useSelector((state: any) => state.user.userType);

    const colors =
        userType === "mentor"
            ? {
                bg: "bg-white", // Keep bg as white
                border: "border-[#FFC400]",
                text: "text-gray-600/80",
                hoverBg: "hover:bg-[#FFF5E6]",
                shadow: "hover:shadow-sm shadow-[#FFC400]",
                selectedText: "text-[#FF8C00] font-semibold", // Darker color for selected
                selectedBg: "bg-[#FFF5E6]", // Light background for selected
            }
            : {
                bg: "bg-white", // Keep bg as white
                border: "border-[#1D4ED8]",
                text: "text-gray-600/80",
                hoverBg: "hover:bg-studentButtonColor hover:text-white",
                shadow: "shadow-xs hover:shadow-[#1D4ED8]",
                selectedText: "text-white font-semibold", // Darker color for selected
                selectedBg: "bg-[#1D4ED8]", // Dark background for selected
            };

    const items = [
        { item: `Find your ${userType === "mentor" ? "student" : "mentor"}`, icon: <FaChalkboardTeacher /> },
        { item: "Chat", icon: <FaMessage /> },
        { item: "Tasks", icon: <FaTasks /> },
        { item: "Progress", icon: <FaBarsProgress /> },
        { item: "Achievements", icon: <FaTrophy /> },
        { item: "Resources", icon: <FaNoteSticky /> },
    ];

    return (
        <div className="absolute lg:grid lg:grid-cols-[24rem_auto] h-screen lg:relative">
            {/* Hamburger Menu (Small Screens) */}
            <div className="lg:hidden">
                <HiOutlineMenuAlt3
                    className="text-gray-900 text-4xl m-4 cursor-pointer z-50"
                    onClick={() => setSideBarOpen(true)}
                />
            </div>

            {/* Sidebar */}
            <Card
                className={`fixed top-0 left-0 h-full text-center w-64 p-4 shadow-xl shadow-blue-gray-900/5 ${colors.bg} text-black z-40 transition-transform lg:w-full lg:relative lg:translate-x-0 ${sideBarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center text-center justify-between my-2 ml-2">
                    <div className="flex items-center">
                        <UserCircleIcon className={`h-12 w-12 ${userType === "mentor" ? 'text-mentorButtonColor' : 'text-studentPrimary/80'}`} />
                        <h1 className={`ml-2  tracking-wide text-lg ml-4 lg:text-xl ${userType === "mentor" ? 'text-mentorButtonColor' : 'text-studentButtonColor'}`}>Hey Arun!</h1>
                    </div>
                    {/* Close Button for Small Screens */}
                    <IoMdClose
                        onClick={() => setSideBarOpen(false)}
                        size={20}
                        className="cursor-pointer lg:hidden"
                    />
                </div>
                <hr className="my-2 border-blue-gray-50" />
                {/* Main Content Area */}
                <div className="flex flex-col items-center flex-grow text-center">
                    <List className="text-lg flex flex-col items-center w-full">

                        {items.map((item, index) => (
                            <ListItem
                                className={`text-center ${selectedItem === index ? colors.selectedText : colors.text} ${selectedItem === index ? colors.selectedBg : ''} ${colors.border} ${colors.hoverBg} mt-4 w-full cursor-pointer`} // Hover text color
                                key={item.item}
                                onClick={() => setSelectedItem(index)} // Update selected item on click
                            >
                                {/* <ListItemPrefix>{item.icon}</ListItemPrefix> */}
                                {item.item}
                                {item.item === "Chat" && (
                                    <ListItemSuffix>
                                        <Chip
                                            value=""
                                            size="sm"
                                            variant="ghost"
                                            color="blue-gray"
                                            className="rounded-full"
                                        />
                                    </ListItemSuffix>
                                )}
                            </ListItem>
                        ))}
                    </List>

                    {/* Profile, Settings, Log Out at the Bottom */}
                    <div className="mt-auto w-full">
                        <ListItem
                            className={`${colors.text} ${colors.border} hover:${colors.selectedText} hover:${colors.selectedBg} cursor-pointer`}
                        >
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem
                            className={`${colors.text} ${colors.border} hover:${colors.selectedText} hover:${colors.selectedBg} cursor-pointer`}
                        >
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem
                            className={`${colors.text} ${colors.border} hover:${colors.selectedText} hover:${colors.selectedBg} cursor-pointer`}
                        >
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>;

                    </div>
                </div>
            </Card>

            {/* Overlay for Small Screens */}
            {sideBarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSideBarOpen(false)}
                ></div>
            )}
        </div>
    );
}
