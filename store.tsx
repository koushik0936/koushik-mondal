
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Language, User, Order, AppNotification, OrderStatus } from './types';

interface AppContextType {
  state: AppState;
  setLanguage: (lang: Language) => void;
  setUser: (user: User | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('aisub_state');
    return saved ? JSON.parse(saved) : {
      language: Language.EN,
      user: null,
      orders: [],
      notifications: []
    };
  });

  useEffect(() => {
    localStorage.setItem('aisub_state', JSON.stringify(state));
  }, [state]);

  const setLanguage = (language: Language) => setState(prev => ({ ...prev, language }));
  
  const setUser = (user: User | null) => setState(prev => ({ ...prev, user }));

  const addOrder = (order: Order) => setState(prev => ({ ...prev, orders: [...prev.orders, order] }));

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === orderId ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o)
    }));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      isRead: false
    };
    setState(prev => ({ ...prev, notifications: [newNotif, ...prev.notifications] }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));
  };

  return (
    <AppContext.Provider value={{ state, setLanguage, setUser, addOrder, updateOrder, addNotification, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
