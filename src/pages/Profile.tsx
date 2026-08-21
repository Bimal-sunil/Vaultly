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
import { supabase } from "../../utils/supabase";
import { useAuth } from "../context/AuthContext";
import ProfileImageUpload from "../components/ProfileImageUpload";

function Profile() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const profileOptions = [
    {
      icon: UserCircleIcon,
      label: "Account Details",
      onClick: () => navigate("/account-details"),
    },
    { icon: Settings02Icon, label: "Settings", onClick: () => {}, beta: true },
    {
      icon: Notification02Icon,
      label: "Notifications",
      onClick: () => {},
      beta: true,
    },
    {
      icon: HelpCircleIcon,
      label: "Help & Support",
      onClick: () => {},
      beta: true,
    },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-12">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent w-8 h-8" />
        <h1 className="h3 text-light">Profile</h1>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <ProfileImageUpload />
        <div className="text-center">
          <h2 className="h3 text-light">
            {profile?.first_name || "User"} {profile?.last_name || ""}
          </h2>
          <p className="text-accent-bg text-sm mt-1">{profile?.email}</p>
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
          onClick={handleLogout}
        >
          <HugeiconsIcon icon={Logout02Icon} className="w-6 h-6" />
          <span className="text-lg font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
