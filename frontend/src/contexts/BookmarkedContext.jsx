import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const BookmarkContext = createContext();

// Provider component
export const BookmarkProvider = ({ children }) => {
  // Load bookmarks from localStorage or start with empty array
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Toggle bookmark: add if not present, remove if present (by unique link)
  const toggleBookmark = (article) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.link === article.link);
      if (exists) {
        return prev.filter((b) => b.link !== article.link);
      } else {
        return [...prev, article];
      }
    });
  };

  // Clear all bookmarks (optional utility)
  const clearBookmarks = () => setBookmarks([]);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, clearBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook to use the bookmark context easily
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
