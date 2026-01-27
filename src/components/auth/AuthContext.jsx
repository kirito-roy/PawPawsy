import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data or null if not logged in
  const [loading, setLoading] = useState(true); // To handle initial token check

  // On component mount, check for a stored token/user data
  // On component mount, check for a stored token/user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
        }
    }
    setLoading(false); // Finished checking
  }, []);

  const login = (token) => {
    // const decoded = jwtDecode(token);
    // setUser(decoded.user);
    const userData = token.data.user;
    setUser(userData);
    localStorage.setItem("token", token.data.access_token);
    localStorage.setItem("token_type", token.data.token_type);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem("roles", JSON.stringify(token.data.roles));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear stored data
    localStorage.removeItem("token_type");
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
  };
  const userRole = () => {
    const roles = localStorage.getItem("roles");
    if (roles) {
      try {
        const parsedRoles = JSON.parse(roles);
        if (Array.isArray(parsedRoles)) {
            return parsedRoles.includes('admin') ? 'admin' : 'user';
        }
        return parsedRoles;
      } catch (e) {
          return roles;
      }
    }
    return null;
  };

  // Simple check for authentication status
  const isAuthenticated = !!user;

  // Provide loading state if needed for initial rendering before auth check completes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
