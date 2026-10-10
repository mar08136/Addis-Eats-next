# Rendering Strategies

## Home Page
Static rendering because the content does not change frequently.

## Menu Page
Incremental Static Regeneration (ISR) with revalidation every 3600 seconds.

## Dish Detail Pages
Static Site Generation (SSG) using generateStaticParams() for kitfo and shiro.

## Checkout Page
Dynamic rendering using force-dynamic because checkout depends on request-specific information.

## Suspense
Suspense provides a fallback while asynchronous menu data is loading.
## Cart Page

The cart uses Client Components for browser-side interactions such as
updating cart state.

## API Routes

The `/api/dishes`, `/api/dishes/[id]`, and `/api/orders` endpoints use
Route Handlers to process server-side requests.

## Server Actions

Checkout uses the `placeOrder` Server Action from `app/actions.js`.
The action performs server-side validation before accepting the order.

## Not Found Handling

Dish detail pages use `notFound()` when a requested dish ID does not
exist.