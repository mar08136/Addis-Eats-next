# Addis Eats Authentication

## Authentication Flow

1. User visits a protected route.
2. Middleware checks for the session cookie.
3. If no session exists, the user is redirected to `/signin`.
4. The original route is stored in the `next` parameter.
5. User signs in with email and password.
6. The server creates a signed session cookie.
7. The browser sends the session cookie with future requests.
8. Server-side pages and actions verify the session.
9. Users can only access their own orders.
10. Staff users can access the kitchen route.

## Protected Routes

- `/checkout`
- `/orders`
- `/kitchen`

## Demo Accounts

Customer:

- Email: mariam@example.com
- Password: 123456

Staff:

- Email: staff@example.com
- Password: 123456

## Security Layers

### Middleware

Provides an early redirect when no session cookie exists.

### Page / Layout

Checks the session before displaying protected data.

### Server Action / Route Handler

Checks authentication and authorization again before performing an action.

## Authorization

Authentication answers:

"Who is this user?"

Authorization answers:

"Is this user allowed to perform this action?"

Orders must always be scoped to the authenticated user's ID.

Users must not be able to cancel or access another user's order by changing an order ID.

## Redirect Protection

The `next` parameter must be an internal path.

External destinations such as:

`https://example.com`

must be rejected.

## Secrets

Session secrets must not use `NEXT_PUBLIC_` environment variables.

Production applications should use a proper authentication library such as Auth.js rather than this classroom implementation.