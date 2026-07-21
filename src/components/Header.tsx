import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full flex justify-between items-center">
      <img src="/assets/logo.svg" alt="" className="w-10 h-10" />
      <div>
        <Link to="/profile">
          <div className="bg-accent w-10 h-10 rounded-[50%] overflow-hidden">
            {/* TODO:User Avatar */}
            <img
              src="https://images.unsplash.com/photo-1681131194788-613458a15616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBvcnRyYWl0fGVufDB8MnwwfHx8MA%3D%3D"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
