import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Settings02Icon,
  Notification02Icon,
  Moon02Icon,
  Logout02Icon,
  UserCircleIcon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons";
import Button from "../components/Button";

function Profile() {
  const navigate = useNavigate();

  const profileOptions = [
    { icon: UserCircleIcon, label: "Account Details", onClick: () => {} },
    { icon: Settings02Icon, label: "Settings", onClick: () => {} },
    {
      icon: Notification02Icon,
      label: "Notifications",
      onClick: () => {},
      beta: true,
    },
    { icon: HelpCircleIcon, label: "Help & Support", onClick: () => {} },
  ];

  return (
    <div className="w-full flex flex-col gap-8 pb-12">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent w-8 h-8" />
        <h1 className="font-primary text-3xl font-semibold text-light">
          Profile
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
          <img
            src="https://images.unsplash.com/photo-1681131194788-613458a15616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBvcnRyYWl0fGVufDB8MnwwfHx8MA%3D%3D"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-light">Hello, User!</h2>
          <p className="text-accent-bg text-sm mt-1">user@example.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full mt-6">
        <div className="bg-dark-accent rounded-[15px] overflow-hidden flex flex-col">
          {profileOptions.map((option, index) => (
            <div
              key={option.label}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-[rgba(215,255,0,0.1)] ${
                index !== profileOptions.length - 1
                  ? "border-b border-[rgba(255,255,255,0.05)]"
                  : ""
              }`}
              onClick={option.onClick}
            >
              <HugeiconsIcon
                icon={option.icon}
                className="text-accent w-6 h-6"
              />
              <span className="text-light text-lg">{option.label}</span>
              {option.beta && (
                <span className="ml-2 text-[10px] font-bold bg-accent text-dark-bg px-1.5 py-0.5 rounded">
                  Beta
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-4">
        <button
          className="w-full flex items-center justify-center gap-2 p-4 rounded-[15px] border border-[rgba(255,99,71,0.5)] text-[#FF6347] hover:bg-[rgba(255,99,71,0.1)] transition-colors"
          onClick={() => {}}
        >
          <HugeiconsIcon icon={Logout02Icon} className="w-6 h-6" />
          <span className="text-lg font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
