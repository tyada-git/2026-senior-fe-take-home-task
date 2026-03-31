# NOTES.md

## Implementation summary

This document explains the decisions and trade-offs made during the implementation of the multi-step booking flow.

---

## What was built

### File structure

| File                                | Purpose                                                                                                                                                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pages/booking.tsx`                 | Main page – `getServerSideProps` + client-side step state.                                                                                                                                         |
| `components/StepIndicator.tsx`      | Progress indicator with default set to step 2 as Traveller details form                                                                                                                            |
| `components/TravellerForm.tsx`      | Step 2 traveller details form including all the fields - First Name, Last Name, Email, phone number, No of traveller which is fetched from server side and special request along with validations. |
| `components/StepNavigation.tsx`     | Reusable back/next button bar used across all steps                                                                                                                                                |
| `components/StepThreeComponent.tsx` | Component rendered as step 3 to display trip name and destination from server side.                                                                                                                |
| `components/InputField.tsx`         | Reusable component for input field.                                                                                                                                                                |
| `BookingPage.module.css`            | CSS related to Bookingpage                                                                                                                                                                         |
| `TravellerForm.module.css`          | CSS related to Traveller form fields                                                                                                                                                               |

---

## Step flow

The page opens on **Step 2** using `useState(2)`. Each step is rendered conditionally:

- **Step 1** — placeholder ("coming soon") with a **Next →** button that advances to Step 2.
- **Step 2** — the fully implemented traveller details form. Has a **← Back** button (returns to Step 1) and a **Continue →** submit button (advances to Step 3 on valid submission).
- **Step 3** — a confirmation message. Shows the trip name, destination sourced from the server-side props also persists the data while going back to step 2 and can edit the form again.

---

## Server-side data (`getServerSideProps`)

`getServerSideProps` resolves three props before the page renders:

| Prop                   | Used for                                                      |
| ---------------------- | ------------------------------------------------------------- |
| `tripDetails`          | Trip name and destination shown in the confirmation on Step 3 |
| `serverMessage`        | Introductory message shown above the form on Step 2           |
| `defaultNumTravellers` | Pre-fills the "Number of travellers" field                    |

All data is mocked locally.

---

## Assumptions

1. **Step navigation via `useState`.** The current step is tracked with `useState(2)` in `booking.tsx`. `onBack` / `onNext` callbacks are passed as props to `TravellerForm`, keeping navigation logic in the page and the form focused on its own concerns.

2. **State Lifting**: Form state is managed in the BookingPage (parent) rather than the individual step components. This ensures that if a user navigates back to Step 1 or forward to Step 3 and back again, their entered data is persisted and not lost due to component unmounting.

3. **No form library used.** Validation and form state are managed with plain `useState` and a `handleSubmit` function. This keeps the implementation transparent and avoids an unnecessary dependency for the given scope.

4. **Phone validation uses a permissive regex.** International phone numbers vary widely in format. The pattern `/^\+?[\d\s\-().]{7,25}$/` accepts numbers like `+44 7700 900000` or `+1-800-555-0199` while rejecting obviously invalid input.

5. **Form does not submit to a backend.**

6. **No external UI or validation library.** Given the scope, they did not add enough value to justify the extra complexity.

---

## Accessibility decisions

- Every `<input>` and `<textarea>` has a `<label>` associated via `htmlFor` / `id`.
- Fields display `aria-invalid` when an error is present.
- Error messages are rendered with `role="alert"` so screen readers announce them immediately on submission.
- Each error message is linked to its field via `aria-describedby`.
- The submit button is a native `<button type="submit">` — no `role` override needed.

---

## What I would improve for production

1. **Real API in `getServerSideProps`** – fetch trip details from a backend service, with error handling and redirects if the booking reference is invalid.

2. **Form Management Scalability** -
   For this specific exercise, I chose to manage form state and validation using standard React useState to keep the bundle size small and the logic transparent. However, for a production application with larger, more complex forms or deeply nested fields, I would migrate to a library like React Hook Form or Formik. Better performance by reducing re-renders on every keystroke.

3. **Tests** – unit tests for validation logic, and React Testing Library component tests for form submission behaviour and error states.

4. **E2E tests**

5. **Internationalisation** – error messages and labels are currently hardcoded English strings.

6. **Phone validation library** – use library if tis validation is needed at multiple places.
