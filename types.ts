
export enum Language {
  EN = 'en',
  BN = 'bn'
}

export enum OrderStatus {
  PENDING = 'Pending Verification',
  VERIFIED = 'Verified',
  REJECTED = 'Rejected',
  ACTIVE = 'Active',
  EXPIRED = 'Expired'
}

export enum PaymentMethod {
  BKASH = 'bKash',
  NAGAD = 'Nagad',
  ROCKET = 'Rocket'
}

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface AITool {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  plans: Plan[];
}

export interface Order {
  id: string;
  userId: string;
  toolId: string;
  planId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  senderNumber: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  credentials?: {
    email: string;
    pass: string;
    expiry: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

export interface AppState {
  language: Language;
  user: User | null;
  orders: Order[];
  notifications: AppNotification[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}
