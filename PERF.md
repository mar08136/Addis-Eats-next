
## Lighthouse Results

### Homepage

**Test date:** October 14, 2026, at 12:42 PM (GMT+3)

**Test environment:**
- Lighthouse 13.4.1
- Chromium 154.0.0.0
- Emulated Moto G Power (mobile)
- Slow 4G network throttling
- Single-page session, initial page load

| Metric | Result | Target | Status |
|---|---:|---:|---|
| First Contentful Paint (FCP) | 1.1 s | Under 1.8 s | Pass |
| Largest Contentful Paint (LCP) | 1.4 s | Under 2.5 s | Pass |
| Total Blocking Time (TBT) | 20 ms | Under 200 ms | Pass |
| Cumulative Layout Shift (CLS) | 0.00 | Under 0.1 | Pass |
| Speed Index | 1.2 s | Under 3.4 s | Pass |
| Interaction to Next Paint (INP) | Not measured | Under 200 ms | Not measured |

**Performance score:** Record the score displayed at the top of the Lighthouse report.

**Original baseline:** Not recorded before optimization.

### Menu Page

Lighthouse testing has not yet been completed for this page.

| Metric | Result |
|---|---|
| Performance score | Not measured |
| LCP | Not measured |
| CLS | Not measured |
| TBT | Not measured |

## Lighthouse Insights and Diagnostics

The homepage report identified the following optimization opportunities:

- Render-blocking requests: estimated savings of 80 ms.
- Image delivery: estimated savings of 54 KiB.
- Legacy JavaScript: estimated savings of 14 KiB.
- Unused JavaScript: estimated savings of 22 KiB.
- Long main-thread tasks: 4 identified.

These are opportunities for further optimization. The report notes that the unused JavaScript and long-task diagnostics do not directly affect the Performance score.

## Remaining Opportunities

- Review render-blocking requests and determine whether they can be reduced.
- Optimize image delivery where practical.
- Review legacy and unused JavaScript.
- Investigate the four long main-thread tasks.
- Run Lighthouse on the deployed menu page.
- Measure INP through real-user data or appropriate interaction testing.
- Record the final Performance score shown in the Lighthouse report.
