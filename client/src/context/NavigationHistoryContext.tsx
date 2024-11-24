// src/context/NavigationHistoryContext.tsx
import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LinkedList } from "../utils/LinkedList";

const NavigationHistoryContext = createContext<LinkedList | null>(null);

export const NavigationHistoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  const navigationHistory = new LinkedList();

  useEffect(() => {
    // Add the current route to the linked list when it changes
    navigationHistory.addPage(location.pathname);
  }, [location]);

  return (
    <NavigationHistoryContext.Provider value={navigationHistory}>
      {children}
    </NavigationHistoryContext.Provider>
  );
};

export const useNavigationHistory = () => {
  const context = useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error(
      "useNavigationHistory must be used within NavigationHistoryProvider"
    );
  }
  return context;
};
