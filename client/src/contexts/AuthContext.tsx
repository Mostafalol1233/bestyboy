import { createContext, useState, useEffect, ReactNode } from "react";

// Simplified LoginCredentials type for local authentication
interface LoginCredentials {
  username: string;
  password: string;
}

// Simplified User type for local authentication
interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

// Default admin credentials - matches what we set in config.js
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "bestyboy123"
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Check localStorage for saved authentication
  const savedAuth = localStorage.getItem('bestyboy_auth');
  const initialUser = savedAuth ? JSON.parse(savedAuth) : null;
  
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  // Save authentication to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('bestyboy_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('bestyboy_auth');
    }
  }, [user]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simple local authentication - check against hard-coded admin credentials
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        
        // Create a local user object
        const userData: User = {
          id: '1',
          username: credentials.username,
          isAdmin: true
        };
        
        setUser(userData);
        return;
      }
      
      // If credentials don't match, throw error
      throw new Error("Invalid credentials");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
