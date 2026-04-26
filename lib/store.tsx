'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import hayaElHoreya from '@/app/assets/حى الحريه.jpeg';
import alzaher from '@/app/assets/الظهير الصحراوى.jpeg';
import maliky1 from '@/app/assets/المالكى1.jpeg';
import maliky2 from '@/app/assets/المالكى2.jpeg';
import maliky3 from '@/app/assets/المالكى3.jpeg';
import laza from '@/app/assets/ملعب لازا.jpeg';
import mawakif from '@/app/assets/نادى الخانكه الرياضى فرع الموقف.jpeg';
import bulaqi1 from '@/app/assets/الخانكه البولاقى1.jpeg';
import bulaqi2 from '@/app/assets/الخانكه البولاقى2.jpeg';
import amal1_1 from '@/app/assets/الامل11.jpeg';
import amal1_2 from '@/app/assets/ملعب الامل12.jpeg';
import amal1_3 from '@/app/assets/ملعب الامل 13.jpeg';
import amal2_1 from '@/app/assets/ملعب الامل21.jpeg';
import amal2_2 from '@/app/assets/ملعب الامل22.jpeg';
import amal2_3 from '@/app/assets/ملعب الامل23.jpeg';

export type Field = {
  id: string | number;
  name: string;
  location: string;
  city?: string;
  price: number;
  type: string;
  images: string[];
  image?: string;
  description: string;
  phone?: string;
  map?: string;
  bookedHours?: number[];
};

export type Booking = {
  id: string;
  fieldId: string | number;
  userEmail?: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
};

export type User = {
  email: string;
  role: 'user' | 'admin';
};

export type TrainingSession = {
  id: string;
  fieldId: string | number;
  date: string;
  time: string;
};

interface AppState {
  user: User | null;
  fields: Field[];
  bookings: Booking[];
  trainingSessions: TrainingSession[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addField: (field: Omit<Field, 'id'>) => void;
  updateField: (id: string, field: Partial<Field>) => void;
  deleteField: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  confirmBooking: (id: string) => void;
  cancelBooking: (id: string) => void;
  addTrainingSession: (session: Omit<TrainingSession, 'id'>) => void;
  removeTrainingSession: (id: string) => void;
}

const mockFields: Field[] = [
  {
    id: 1,
    name: "ملعب كرة قدم خماسي – الحي التاسع",
    type: "خماسي",
    city: "العبور",
    location: "العبور الحي التاسع",
    price: 250,
    phone: "01032250099",
    map: "https://maps.google.com/?q=30.2726459,31.50345",
    image: hayaElHoreya.src,
    images: [hayaElHoreya.src],
    bookedHours: [],
    description: "ملعب كرة قدم خماسي – الحي التاسع"
  },
  {
    id: 2,
    name: "الملعب الخماسي – الظهير الصحراوي",
    type: "خماسي",
    city: "العبور",
    location: "العبور الظهير الصحراوي",
    price: 250,
    phone: "01021002511",
    map: "https://maps.google.com/?q=30.2757712,31.5085926",
    image: alzaher.src,
    images: [alzaher.src],
    bookedHours: [],
    description: "الملعب الخماسي – الظهير الصحراوي"
  },
  {
    id: 3,
    name: "ملعب الملكي – الحي الخامس",
    type: "خماسي",
    city: "العبور",
    location: "مدينة العبور",
    price: 300,
    phone: "01032250099",
    map: "https://maps.app.goo.gl/6px7vNzRSP3foq1r8",
    image: maliky1.src,
    images: [maliky1.src, maliky2.src, maliky3.src],
    bookedHours: [10, 11, 15, 16],
    description: "ملعب الملكي – الحي الخامس"
  },
  {
    id: 4,
    name: "ملعب نادي بلازا العبور الشباب",
    type: "خماسي",
    city: "العبور",
    location: "مدينة العبور",
    price: 250,
    phone: "01021002511",
    map: "https://maps.app.goo.gl/PmLnYiBNthJKrWP38",
    image: laza.src,
    images: [laza.src],
    bookedHours: [9, 14, 17, 18],
    description: "ملعب نادي بلازا العبور الشباب"
  },
  {
    id: 5,
    name: "ملعب خماسي – مركز شباب العبور الحي الثاني",
    type: "خماسي",
    city: "العبور",
    location: "مدينة العبور",
    price: 300,
    phone: "01030545355",
    map: "https://maps.app.goo.gl/gcbAg9dyhTVV57Gh9",
    image: hayaElHoreya.src,
    images: [hayaElHoreya.src],
    bookedHours: [12, 13, 19],
    description: "ملعب خماسي – مركز شباب العبور الحي الثاني"
  },
  {
    id: 6,
    name: "نادي الخانكة الرياضي – فرع الموقف",
    type: "خماسي",
    city: "الخانكة",
    location: "الخانكة",
    price: 250,
    phone: "0244699305",
    map: "https://maps.app.goo.gl/vNAWtzrNW4NYYZNm9",
    image: mawakif.src,
    images: [mawakif.src],
    bookedHours: [],
    description: "نادي الخانكة الرياضي – فرع الموقف"
  },
  {
    id: 7,
    name: "نادي الخانكة – فرع البولاقي",
    type: "خماسي",
    city: "الخانكة",
    location: "الخانكة",
    price: 200,
    phone: "+201010415256",
    map: "https://maps.app.goo.gl/5ACPEqr2BeUKVMT97",
    image: bulaqi1.src,
    images: [bulaqi1.src, bulaqi2.src],
    bookedHours: [],
    description: "نادي الخانكة – فرع البولاقي"
  },
  {
    id: 8,
    name: "ملعب الأمل 1",
    type: "خماسي",
    city: "الخانكة",
    location: "الخانكة",
    price: 250,
    phone: "01090010070",
    map: "https://maps.app.goo.gl/41TbgMwbzDhX1Hb6A",
    image: amal1_1.src,
    images: [amal1_1.src, amal1_2.src, amal1_3.src],
    bookedHours: [10, 11, 12, 13, 14],
    description: "ملعب الأمل 1"
  },
  {
    id: 9,
    name: "ملعب الأمل 2",
    type: "خماسي",
    city: "الخانكة",
    location: "الخانكة",
    price: 250,
    phone: "01090010070",
    map: "https://maps.app.goo.gl/41TbgMwbzDhX1Hb6A",
    image: amal2_1.src,
    images: [amal2_1.src, amal2_2.src, amal2_3.src],
    bookedHours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    description: "ملعب الأمل 2"
  }
];

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedFields = localStorage.getItem('fields');
    const storedBookings = localStorage.getItem('bookings');
    const storedTraining = localStorage.getItem('trainingSessions');

    if (storedUser) setUser(JSON.parse(storedUser));

    if (storedFields) {
      const parsedFields = JSON.parse(storedFields) as Field[];
      const mergedFields = parsedFields.map(field => {
        const mockField = mockFields.find(m => m.id === field.id);
        if (mockField) {
          // هذه الخطوة تضمن أن أي تعديل تقوم به في الأرقام أو الأسعار أو اللوكيشن في الكود سيظهر مباشرة في الموقع
          return mockField;
        }
        return field;
      });
      setFields(mergedFields);
    } else {
      setFields(mockFields);
      localStorage.setItem('fields', JSON.stringify(mockFields));
    }

    if (storedBookings) setBookings(JSON.parse(storedBookings));
    if (storedTraining) setTrainingSessions(JSON.parse(storedTraining));

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized && user) localStorage.setItem('user', JSON.stringify(user));
    if (isInitialized && !user) localStorage.removeItem('user');
  }, [user, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('fields', JSON.stringify(fields));
  }, [fields, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('trainingSessions', JSON.stringify(trainingSessions));
  }, [trainingSessions, isInitialized]);

  const login = (email: string, password: string): boolean => {
    // Admin override
    if (email === 'admin123@filed.com' && password === 'admin123456') {
      setUser({ email, role: 'admin' });
      return true;
    }

    // Test user
    if (email.length > 3 && password.length >= 4) {
      setUser({ email, role: 'user' });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addField = (field: Omit<Field, 'id'>) => {
    setFields(prev => [...prev, { ...field, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateField = (id: string, updatedField: Partial<Field>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...updatedField } : f));
  };

  const deleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    setBookings(prev => [...prev, { ...booking, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const confirmBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  const addTrainingSession = (session: Omit<TrainingSession, 'id'>) => {
    setTrainingSessions(prev => [...prev, { ...session, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeTrainingSession = (id: string) => {
    setTrainingSessions(prev => prev.filter(s => s.id !== id));
  };

  if (!isInitialized) return null;

  return (
    <AppContext.Provider value={{
      user, login, logout,
      fields, bookings, trainingSessions,
      addField, updateField, deleteField,
      addBooking, confirmBooking, cancelBooking,
      addTrainingSession, removeTrainingSession
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}

