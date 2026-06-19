import { APIRequestContext } from '@playwright/test';

interface AuthResponse {
  token: string;
}

interface BookingResponse {
  bookingid: number;
}

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
}

export class ApiUtils {
  constructor(private request: APIRequestContext) {}

  async getToken(): Promise<string> {
    const res = await this.request.post('/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    const body: AuthResponse = await res.json();
    return body.token;
  }

  async createBooking(): Promise<{ token: string; bookingId: number; payload: BookingPayload }> {
    const token = await this.getToken();
    const payload: BookingPayload = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2026-06-19', checkout: '2026-06-20' }
    };

    const res = await this.request.post('/booking', { data: payload });
    const body: BookingResponse = await res.json();
    return { token, bookingId: body.bookingid, payload };
  }
}
