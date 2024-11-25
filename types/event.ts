export type ResponseObject<T> = {
  data: T;
  message: string;
  statusCode: string;
};

type EventStatus = "UPCOMING" | "PUBLISHED";

interface EventCreatedBy {
  _id: string;
  email: string;
  username: string;
  gender: string;
  dob: string;
  fullName: string;
  isEmailVerified: boolean;
  deletedAt: string;
  imageUrl: string;
  backgroundImage: string;
  bio: string;
  google: null;
  instagram: null;
  twitter: null;
  facebook: null;
  linkedIn: null;
  playerId: null;
  howYouHeardAboutUs: null;
  referralCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserEvent {
  _id: RecordId;
  createdBy: EventCreatedBy;
  title: string;
  linkId: string;
  description: string;
  isPublished: boolean;
  disablePayout: boolean;
  startTime: string;
  endTime: string;
  deletedAt: null;
  cancelledDate: null;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  banner: string;
}

interface EventPaymentTotal {
  _id: string;
  total: number;
}
interface EventPaymentTransactions {
  _id: string;
  sender_name: string;
  note: string;
  amount: number;
  currency: string;
  event: string;
  charge: number;
  net: number;
  gross: number;
  reference: string;
  status: string;
  confirmationAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface EventPayment {
  total: EventPaymentTotal[];
  transactions: EventPaymentTransactions[];
}
