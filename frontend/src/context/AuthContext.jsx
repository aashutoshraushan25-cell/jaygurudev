import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('jay_guru_dev_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Failed to verify session:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'लॉगिन विफल रहा (Login failed)');
      }

      setToken(data.data.token);
      setUser(data.data);
      localStorage.setItem('jay_guru_dev_token', data.data.token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'पंजीकरण विफल रहा (Registration failed)');
      }

      setToken(data.data.token);
      setUser(data.data);
      localStorage.setItem('jay_guru_dev_token', data.data.token);
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'प्रोफाइल अपडेट विफल रहा');
      }

      setUser((prev) => ({ ...prev, ...data.data }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jay_guru_dev_token');
  };

  const getAuthHeaders = () => {
    return token
      ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      : {
          'Content-Type': 'application/json',
        };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        register,
        updateProfile,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
