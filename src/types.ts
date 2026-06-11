/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Therapy {
  id: string;
  name: string;
  nameEn?: string;
  japaneseName: string;
  description: string;
  descriptionEn?: string;
  duration: number; // in minutes
  price: number; // in EUR
  benefits: string[];
  benefitsEn?: string[];
  results?: string[]; // Specific results shown to guests
  resultsEn?: string[];
  category: 'massage' | 'ritual' | 'wellness' | 'special' | 'personalized' | 'relax-muscular' | 'body-aesthetic' | 'facial-aesthetic';
  imagePlaceholderId?: string; // fallback or specific visual
}

export interface DayAvailability {
  dateString: string; // YYYY-MM-DD
  status: 'available' | 'low-vacancy' | 'fully-booked';
  slots: string[]; // e.g., ["09:00", "10:30", ...]
}

export type PaymentMethod = 'mbway' | 'multibanco' | 'card';

export interface Booking {
  id: string;
  therapyId: string;
  dateTime: string; // ISO String or combination
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialNotes?: string;
  isPaid: boolean;
  paymentMethod: PaymentMethod;
  paymentReference?: {
    entity?: string; // For Multibanco
    reference?: string; // For Multibanco
    phone?: string; // For MBWay
    cardNumberLast4?: string; // For Card
  };
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  serviceReceived: string;
}
