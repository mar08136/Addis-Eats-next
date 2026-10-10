# Server and Client Boundaries

## Server Components

The application uses Server Components by default.

Examples include:

- `app/menu/page.js`
- `app/menu/[id]/page.js`
- `app/orders/page.js`
- `app/layout.js`

These components handle server-side data access and rendering.

## Client Components

Client Components are used where browser-side interaction or React
client hooks are required.

Examples include:

- `app/checkout/checkoutForm.jsx`
- `app/menu/MenuClient.jsx`
- `app/orders/cancelButton.jsx`

These files use `"use client"`.

## Server Actions

Server Actions are kept on the server and are used for operations that
should not expose server-side logic to the browser.

Examples:

- `placeOrder`
- `cancelOrder`

Both are defined in `app/actions.js` with `"use server"`.

## API Route Handlers

API requests are handled by Route Handlers under `app/api`.

The API routes validate incoming data and return appropriate HTTP
responses.

## Validation

Order input is validated on the server using
`app/lib/orderValidation.js`.

Invalid input is rejected before an order is confirmed.

## Rendering Verification

The production build verifies:

- Home page as static
- Menu page as ISR with 1-hour revalidation
- Dish detail pages as SSG
- Checkout as dynamic
