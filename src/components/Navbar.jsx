import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const Navbar = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      toast.warning("Enter a search keyword first.", { title: "Search" });
      return;
    }
    toast.info(`Searching for "${query.trim()}"`, { title: "Search Started", duration: 2200 });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-logo">N</span>
        <span>NotifyHub</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>

      <div className="nav-actions">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search"
          />
        </form>
        <button
          type="button"
          className="profile-btn"
          aria-label="Profile"
          onClick={() => toast.success("Profile opened.", { title: "Profile" })}
        >
          <span className="profile-dot" />
          <span className="profile-text">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
