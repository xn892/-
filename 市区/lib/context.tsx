"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type User = { name: string; email: string; phone?: string };

export type Comment = {
  id: string;
  recipeId: string;
  user: string;
  text: string;
  likes: number;
  time: string;
};

type AppContextValue = {
  user: User | null;
  guestMode: boolean;
  favorites: string[];
  shoppingList: { name: string; amount: string; recipe: string }[];
  comments: Comment[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  enterGuestMode: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToShoppingList: (recipeId: string, title: string, ingredients: { name: string; amount: string }[]) => void;
  removeFromShoppingList: (index: number) => void;
  clearShoppingList: () => void;
  addComment: (recipeId: string, text: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const USERS_KEY = "shiqu_users";
const SESSION_KEY = "shiqu_session";
const FAV_KEY = "shiqu_favorites";
const SHOP_KEY = "shiqu_shopping";
const COMMENTS_KEY = "shiqu_comments";
const GUEST_KEY = "shiqu_guest";

const DEFAULT_COMMENTS: Comment[] = [
  { id: "c1", recipeId: "1", user: "小厨娘", text: "按照视频做了一次，家人都说比饭店还好吃！", likes: 42, time: "2小时前" },
  { id: "c2", recipeId: "7", user: "吃货小明", text: "红烧肉一定要小火慢炖，急不得～", likes: 88, time: "5小时前" },
  { id: "c3", recipeId: "4", user: "甜品控", text: "提拉米苏冷藏过夜口感最佳，亲测！", likes: 56, time: "1天前" },
];

function loadUsers(): Record<string, { name: string; password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [guestMode, setGuestMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<{ name: string; amount: string; recipe: string }[]>([]);
  const [comments, setComments] = useState<Comment[]>(DEFAULT_COMMENTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setGuestMode(localStorage.getItem(GUEST_KEY) === "1");
    try {
      const fav = localStorage.getItem(FAV_KEY);
      if (fav) setFavorites(JSON.parse(fav));
      const shop = localStorage.getItem(SHOP_KEY);
      if (shop) setShoppingList(JSON.parse(shop));
      const cmts = localStorage.getItem(COMMENTS_KEY);
      if (cmts) setComments(JSON.parse(cmts));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = loadUsers();
    const record = users[email.trim()];
    if (!record || record.password !== password) return false;
    const u = { name: record.name, email: email.trim() };
    setUser(u);
    setGuestMode(false);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    localStorage.removeItem(GUEST_KEY);
    return true;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || password.length < 6) return false;
    const users = loadUsers();
    const key = email.trim();
    if (users[key]) return false;
    users[key] = { name: name.trim(), password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const u = { name: name.trim(), email: key };
    setUser(u);
    setGuestMode(false);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    localStorage.removeItem(GUEST_KEY);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setGuestMode(false);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(GUEST_KEY);
  }, []);

  const enterGuestMode = useCallback(() => {
    setGuestMode(true);
    localStorage.setItem(GUEST_KEY, "1");
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const addToShoppingList = useCallback(
    (recipeId: string, title: string, ingredients: { name: string; amount: string }[]) => {
      setShoppingList((prev) => {
        const existing = new Set(prev.map((i) => `${i.name}-${i.recipe}`));
        const added = ingredients
          .filter((ing) => !existing.has(`${ing.name}-${title}`))
          .map((ing) => ({ name: ing.name, amount: ing.amount, recipe: title }));
        const next = [...prev, ...added];
        localStorage.setItem(SHOP_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const removeFromShoppingList = useCallback((index: number) => {
    setShoppingList((prev) => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem(SHOP_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearShoppingList = useCallback(() => {
    setShoppingList([]);
    localStorage.removeItem(SHOP_KEY);
  }, []);

  const addComment = useCallback(
    (recipeId: string, text: string) => {
      if (!text.trim()) return;
      const c: Comment = {
        id: `c${Date.now()}`,
        recipeId,
        user: user?.name || "游客",
        text: text.trim(),
        likes: 0,
        time: "刚刚",
      };
      setComments((prev) => {
        const next = [c, ...prev];
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(next));
        return next;
      });
    },
    [user],
  );

  if (!ready) return null;

  return (
    <AppContext.Provider
      value={{
        user,
        guestMode,
        favorites,
        shoppingList,
        comments,
        login,
        register,
        logout,
        enterGuestMode,
        toggleFavorite,
        isFavorite,
        addToShoppingList,
        removeFromShoppingList,
        clearShoppingList,
        addComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function useCanAccessApp() {
  const { user, guestMode } = useApp();
  return !!user || guestMode;
}
