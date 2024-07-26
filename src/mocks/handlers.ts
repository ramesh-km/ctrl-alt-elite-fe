// src/mocks/handlers.js
import { http, HttpResponse, RequestHandler } from 'msw';
import { faker } from '@faker-js/faker';

const store = {
  bankAccounts: [
    { accountNumber: 1234567891, accountHolderName: 'krishna@gmail.com', balance: 1000.0 },
    { accountNumber: 2839048348, accountHolderName: 'kumar@gmail.com', balance: 2323.0 },
    { accountNumber: 3298349348, accountHolderName: 'raghuvaran@gmail.com', balance: 2398.0 },
  ],
};

export const handlers: RequestHandler[] = [
  // Intercept "GET /user" requests...
  http.get('/api/user', () => {
    return HttpResponse.json({});
  }),
  http.post('/api/login', () => {
    return HttpResponse.json({});
  }),
  http.post('/api/register', () => {
    return HttpResponse.json({});
  }),
  http.get('/api/bank-accounts', ({ request }) => {
    const url = new URL(request.url);
    const userId = Number.parseInt(url.searchParams.get('userId') || '1');

    console.log(request.body);
    // Mutate store data
    return HttpResponse.json(
      new Array(Math.floor(Math.random() * 10)).fill(null).map((account) => ({
        // Generate random data based on userId
        accountNumber: faker.finance.accountNumber(),
        accountHolderName: faker.finance.accountName(),
        balance: faker.finance.amount(),
      }))
    );
  }),
  http.post('/api/transfer', async ({ request }) => {
    console.log(request);
    const data:any = await request.json();
    const fromAccount = store.bankAccounts.find(
      (account) => account.accountNumber === data.fromAccountNumber
    );
    const toAccount = store.bankAccounts.find(
      (account) => account.accountNumber === data.toAccountNumber
    );

    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
