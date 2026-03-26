# TravelLocal - Senior Frontend Engineer take-home exercise

Thank you for taking the time to complete this exercise.

This task is designed to reflect the kind of frontend work we do at TravelLocal: building clear, accessible interfaces around booking flows and form-heavy user journeys.

We typically expect this exercise to take **around 2–3 hours**. You can complete it at your own pace within that range.

The goal is not to build a production-ready system, but to help us understand how you structure code, approach UI problems, and think about accessibility and user experience.

**Freelance applicants:** The take-home is **paid**; if that applies to you, use the arrangements shared in your invitation or ask your contact if anything is unclear.

---

## Local development

- **Node.js** 18.18 or newer (20 LTS recommended)
- Install: `npm install`
- Dev server: `npm run dev` — open [http://localhost:3000](http://localhost:3000) (requests to `/` redirect to `/booking`)
- Lint: `npm run lint`
- Production build: `npm run build`, then `npm start`

Start from **`pages/booking.tsx`**. You may add files under `components/`, `lib/`, or elsewhere as you prefer.

---

## The task

Build a **simple multi-step booking flow** using **Next.js with the Pages Router**.

The flow should contain **three steps**, but **only `Step 2` needs to be fully implemented**.

### Step indicator

At the top of the page, display a simple **step indicator**, for example:

`Step 1 → Step 2 → Step 3`

`Step 2` should appear as the **active step**.

Steps 1 and 3 can be placeholders (for example, a short message like *“Step 1 - coming soon”*).

The purpose of those placeholders is to show how the overall flow would work.

### `Step 2` - Traveller details form

`Step 2` should contain a form that collects basic traveller information.

#### Required fields

- First name  
- Last name  
- Email  
- Number of travellers  

#### Optional fields

- International phone number  
- Special requests  

The form should include:

- Client-side validation  
- Clear error messages  
- Accessible form markup  

Example validation expectations:

| Field | Validation |
| :---- | :---- |
| First name | Required |
| Last name | Required |
| Email | Required and valid email format |
| Number of travellers | Required and numeric |
| Phone number | Optional; if present, valid phone format |
| Special requests | Optional |

You are free to choose the exact validation approach (libraries, patterns, etc.).

---

## Server-side data requirement

To show use of **Next.js server-side rendering**, the page must load **some data on the server** and pass it into the page.

For example:

- A short message shown above the form  
- Default values for one or more fields  
- A small JSON object representing trip details  

You may mock this data locally (no real API required).

Use **`getServerSideProps`** (Pages Router) to fetch or resolve this data and pass it to the page as props.

---

## Client-side behaviour

Everything interactive - validation, error display, form state, and UI updates - should be implemented **on the client**.

Examples:

- Validation feedback  
- Error messaging  
- Form state management  

The form **does not need to submit to a backend**. A `console.log` of the payload, an on-screen success message, or similar is enough.

---

## Technical requirements

Please use:

- **Next.js** (this repo uses the **Pages Router** - not the App Router)  
- **React**  
- **TypeScript**  

You may use additional libraries if they help (for example validation or form helpers).

---

## What we’re evaluating

We care about **how you approach the problem**, not only whether the UI works.

### Form semantics and accessibility

- Proper `<label>` association with controls  
- Accessible error messages (including association with fields)  
- Appropriate attributes where needed, for example `aria-describedby`, `aria-invalid`  

### Validation and UX

- Clear validation behaviour  
- Helpful error messaging  
- Logical form structure  

### Component structure

- Clean, readable React components  
- Reasonable separation of concerns  

### Step indicator and flow

- Clear indication of the current step  
- A simple, understandable flow structure  

---

## Using AI tools

You are **encouraged** to use AI tools in the same way you would in your normal workflow. In the **technical deep dive** we will ask how you used them.

---

## Submission

We do **not** grant push access to our repository. Please submit your work using a **public fork** on GitHub so we can review your branch without extra permissions or pull requests.

1. **Fork** this repository on GitHub (to your own account).  
2. Keep your fork **public**. We need to be able to open it with a normal URL (no login or collaborator access required). If GitHub ever offers to make the fork private, choose **public** for this exercise.  
3. **Clone your fork** locally (use your fork’s URL, not the TravelLocal repo URL).  
4. **Choose where to implement** (on your fork only):  
   - **Recommended:** create a branch `candidate/your-firstname-lastname` (e.g. `candidate/jane-smith`) using your **real name**.  
   - **Alternatively:** use **`main`** on your fork — your fork’s `main` does not change our repository.  
5. **Implement** the task on that branch.  
6. **Document** your assumptions and trade-offs: add a separate `NOTES.md` file in the repo root covering:  
   - Any assumptions you made  
   - What you would improve or add for production  
7. **Commit** your work and **push** to your fork (`git push` your chosen branch).  
8. **Tell us it is ready** — reply to your recruiting contact with:  
   - The **URL of your fork** on GitHub (e.g. `https://github.com/YOUR_USERNAME/REPO_NAME`), and  
   - The **branch we should review** (`candidate/jane-smith` or `main`).  

   Example link when using a named branch:  
   `https://github.com/YOUR_USERNAME/REPO_NAME/tree/candidate/jane-smith`

We will review your code from your **public fork**. You do **not** need to open a pull request to our repository.

**Branch name:** We recommend a branch named `candidate/your-firstname-lastname` (e.g. `candidate/jane-smith`) using your **real name**, so we can match your submission to your application. That branch lives only on **your fork** — it is not merged into our repo.  

If you prefer, you may implement on **`main`** on your fork instead; nothing you push to your fork’s `main` affects our repository. If you do that, tell us clearly that the work is on **`main`** when you send the fork URL.

If you already cloned our repo before forking, add your fork as a remote (e.g. `git remote add fork https://github.com/YOUR_USERNAME/REPO_NAME.git`) and push your branch there.

---

## Technical deep dive

After we review your submission, the follow-up interview will include discussion of your implementation: decisions, trade-offs, accessibility choices, and how you used AI (if at all). We may also ask broader questions related to React, TypeScript, and frontend quality.

---

## Time and scope

Please aim to **keep the work within roughly 2–3 hours**.

We are interested in how you prioritise and make trade-offs when time is limited. If something is ambiguous, make **reasonable assumptions** and write them down in your `NOTES.md` file.

Good luck - we look forward to discussing your solution.
