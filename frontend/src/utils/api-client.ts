import type { RegisterFormData, SignInFormData, UserType, HotelType, HotelSearchResponse, PaymentIntentResponse, SearchParams } from "@/types/index";
import { axiosInstance } from "./axiosInstance";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const { data } = await axiosInstance.get("/api/users/me");
  return data;
};

export const register = async (formData: RegisterFormData) => {
  const { data } = await axiosInstance.post("/api/users/register", formData);
  return data;
};

export const signIn = async (formData: SignInFormData) => {
  const { data } = await axiosInstance.post("/api/auth/login", formData);
  return data;
};

export const validateToken = async () => {
  const { data } = await axiosInstance.get("/api/auth/validate-token");
  return data;
};

export const signOut = async () => {
  await axiosInstance.post("/api/auth/logout");
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const { data } = await axiosInstance.post("/api/my-hotels", hotelFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const { data } = await axiosInstance.get("/api/my-hotels");
  return data;
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const { data } = await axiosInstance.get(`/api/my-hotels/${hotelId}`);
  return data;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const hotelId = hotelFormData.get("hotelId");
  const { data } = await axiosInstance.put(`/api/my-hotels/${hotelId}`, hotelFormData, { headers: { "Content-Type": "multipart/form-data" } });
  return data;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
  const { data } = await axiosInstance.get("/api/hotels/search", {
    params: {
      destination: searchParams.destination || "",
      checkIn: searchParams.checkIn || "",
      checkOut: searchParams.checkOut || "",
      adultCount: searchParams.adultCount || "",
      childCount: searchParams.childCount || "",
      page: searchParams.page || "",
      maxPrice: searchParams.maxPrice || "",
      sortOption: searchParams.sortOption || "",
      facilities: searchParams.facilities,
      types: searchParams.types,
      stars: searchParams.stars,
    },
  });
  return data;
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const { data } = await axiosInstance.get("/api/hotels");
  return data;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const { data } = await axiosInstance.get(`/api/hotels/${hotelId}`);
  return data;
};

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
  const { data } = await axiosInstance.post(`/api/hotels/${hotelId}/bookings/payment-intent`, { numberOfNights });
  return data;
};

// TODO: complete booking form and api
// export const createRoomBooking = async (formData: BookingFormData) => {
//   await axiosInstance.post(`/api/hotels/${formData.hotelId}/bookings`, formData);
// };

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const { data } = await axiosInstance.get("/api/my-bookings");
  return data;
};
