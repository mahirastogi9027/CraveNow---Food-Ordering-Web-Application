import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const USERS_KEY = 'cravenow-users';
const SESSION_KEY = 'cravenow-session';

const AuthContext = createContext(null);

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function hashPassword(password) {
  return btoa(`${password}:cravenow`);
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = loadSession();
    if (session?.userId) {
      const users = loadUsers();
      const matched = users.find((entry) => entry.id === session.userId);
      if (matched) {
        setUser({
          id: matched.id,
          fullName: matched.fullName,
          email: matched.email,
          phone: matched.phone,
        });
      } else {
        saveSession(null);
      }
    }
    setIsLoading(false);
  }, []);

  const signup = useCallback(async ({ fullName, email, phone, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();

    if (users.some((entry) => entry.email === normalizedEmail)) {
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);

    const session = {
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      loggedInAt: new Date().toISOString(),
    };

    saveSession(session);
    setUser({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
    });

    return { message: 'Account created successfully. Welcome to Crave Now!' };
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();
    const matched = users.find((entry) => entry.email === normalizedEmail);

    if (!matched || matched.passwordHash !== hashPassword(password)) {
      throw new Error('Invalid email or password');
    }

    const session = {
      userId: matched.id,
      email: matched.email,
      fullName: matched.fullName,
      loggedInAt: new Date().toISOString(),
    };

    saveSession(session);
    setUser({
      id: matched.id,
      fullName: matched.fullName,
      email: matched.email,
      phone: matched.phone,
    });

    return { message: 'Welcome back! You are now signed in.' };
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signup,
      login,
      logout,
      initials: user ? getInitials(user.fullName) : '',
    }),
    [user, isLoading, signup, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
