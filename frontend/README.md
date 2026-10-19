# FixTrack Website

React + Vite + Ant Design + Tailwind + RTK Query.

```bash
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm install
npm run dev            # http://localhost:3000
```

## Pages

| Route | Access | Page |
| --- | --- | --- |
| `/` | public | Home page: track-your-repair box, customer and shop owner sections, how it works, features |
| `/track?code=FX-1042` | public | Customer enters a job code and sees only the repair status |
| `/login` | public | Shop owner login, redirects to `/jobs` |
| `/sign-up` | public | Create a shop owner account, redirects to `/jobs` |
| `/jobs` | owner | Job list with search and status filter, add/edit job form with AI category suggestion, next-status button |

## Structure

```
src/
  Components/Home     Hero, Audience, HowItWorks, StatusJourney, Features, CallToAction
  Components/Track    TrackForm, TrackResult
  Components/Jobs     JobTable, JobForm, AiSuggestion
  Components/Shared   Navbar, UserMenu, Footer, Brand, Loading, PageHeading, Search, StatusTag, StatusSteps, FormFieldList
  Layout              Main (navbar + footer), AuthLayout
  Pages               Home/Home, Track/TrackJob, Jobs/Jobs, Auth/{Login, SignUp}
  PrivetRoutes        OwnerRoutes
  Redux               BaseUrl, store, Apis/{authApi, jobApi, suggestionApi}
  Routes              Routes
  Utils               BaseUrl, token, jobOptions, theme, useCurrentOwner, useLogout, FormFields/*, Navbar/NavLinks
```
