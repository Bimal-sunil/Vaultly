import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { profile } = useAuth();
  return (
    <div className="w-full flex justify-between items-center">
      <img src="/assets/logo.svg" alt="" className="w-10 h-10" />
      <div>
        <Link to="/profile">
          <div className="bg-accent w-10 h-10 rounded-[50%] overflow-hidden flex items-center justify-center">
            {profile?.avatar_url ? (
              <img
                src={profile?.avatar_url}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-dark font-bold text-lg uppercase">
                {profile?.first_name?.[0] || "U"}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
