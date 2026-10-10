# Day 41 Data Fetching

## SWR

This project uses SWR for client-side data fetching.

The shared fetcher is located at:

lib/fetcher.js

It checks the response and returns JSON data.

## Menu Data

The menu uses:

/api/dishes

The API supports:

- search
- category
- page
- pagination

The page number is included in the SWR request key.

Example:

/api/dishes?page=1

Search example:

/api/dishes?search=burger&page=1

Category example:

/api/dishes?category=fast-food&page=1

The menu displays 6 dishes per page.

## Search

Search uses a 300ms debounce.

This prevents a request from being made for every character typed.

SWR keeps the previous results visible while new results are loading.

## Order Status

Order status uses:

/api/orders/[id]

The server component provides the initial order data.

The client component uses this data as fallbackData.

SWR then refreshes the order every 5 seconds.

This allows the order status to update while the page is open.

## Pagination

Pagination uses the page number as part of the API request.

Example:

/api/dishes?page=2

The API returns:

- dishes
- page
- pageSize
- total
- totalPages