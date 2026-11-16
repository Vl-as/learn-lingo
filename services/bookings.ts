import { auth, db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export interface BookingData {
  teacherId: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
}

export const createBooking = async (data: BookingData) => {
  return await addDoc(collection(db, 'bookings'), {
    ...data,
    userId: auth.currentUser?.uid ?? null,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
};
