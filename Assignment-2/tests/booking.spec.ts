import { test, expect, request } from '@playwright/test';
import { ApiUtils, BookingPayload } from './api-utils/ApiUtils';

let bookingId: number;
let token: string;
let payload: BookingPayload;

test.beforeAll(async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com'
  });
  const apiUtils = new ApiUtils(apiContext);
  const result = await apiUtils.createBooking();
  bookingId = result.bookingId;
  token = result.token;
  payload = result.payload;
});

test('@api GET booking by id', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com'
  });
  const res = await apiContext.get(`/booking/${bookingId}`);
  const body = await res.json();

  const bookingData = body.booking ? body.booking : body;
  expect(bookingData.firstname).toBe(payload.firstname);
  expect(bookingData.lastname).toBe(payload.lastname);
});

test('@web Token injection works', async ({ page }) => {
  // Inject token into localStorage
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, token);

  // Navigate to a valid endpoint (ping)
  await page.goto('https://restful-booker.herokuapp.com/ping');

  // Verify token is stored in browser
  const storedToken = await page.evaluate(() => window.localStorage.getItem('token'));
  expect(storedToken).toBe(token);
});
