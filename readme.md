# Mood Journal

A lightweight web application for tracking your daily moods and emotional well-being over time. 

![Mood Journal Screenshot](/readme/screenshot.png)

## About Mood Journal

Mood Journal is a simple yet powerful tool designed to help you monitor your emotional health. By recording your daily mood along with optional notes, you can identify patterns, triggers, and trends in your emotional well-being over time.

### Key Features

- 😊 Select a mood from a set of emojis (😊 😐 😞)
- 📝 Add optional notes about your day
- 📊 View past entries in timeline or calendar format
- 💾 Data saved locally in your browser (no account needed)
- 🌓 Light and dark mode for comfortable viewing

### Built With

- Next.js  /  Vue.js
- TypeScript
- Tailwind CSS
- Local Storage for data persistence

## Practical Use Cases

### Personal Mental Health Tracking

**Example:** Sarah has been feeling more stressed lately but isn't sure what's triggering it. By using Mood Journal daily for a month, she notices her mood consistently dips on Sundays and Mondays. She realizes this pattern is related to anxiety about the upcoming work week and can now implement specific self-care strategies for those days.

### Therapy Support Tool

**Example:** Michael is working with a therapist to manage his depression. His therapist suggests using Mood Journal between sessions to track daily moods. During their appointments, Michael shares his mood patterns, which helps his therapist identify that his mood improves after social activities and outdoor time, leading to more targeted treatment recommendations.

### Lifestyle Change Assessment

**Example:** Jamie started a new exercise routine and wants to see if it affects their overall well-being. By tracking their mood before and after implementing this change, they can objectively assess whether the new habit is having a positive impact on their emotional health.

### Medication Effectiveness Monitoring

**Example:** Alex recently started a new medication for anxiety. By using Mood Journal daily, they can provide their doctor with concrete data about mood fluctuations since beginning the medication, helping determine if adjustments are needed.

### Identifying Environmental Triggers

**Example:** Taylor notices they've been feeling down more often but isn't sure why. After a month of consistent mood tracking with detailed notes, they discover that their mood tends to worsen after spending time with a particular friend who often makes negative comments. This insight helps them set healthier boundaries.


## CI/CD
This project uses GitHub Actions for continuous integration and deployment, running two separate pipelines: one for the Vue.js project and another for the Next.js project. Our automated workflow ensures code quality, thorough testing, and reliable deployments.

## Nextjs Pipeline 

### 🔄 When does the pipeline run?  
The workflow runs on:  
- Every **push** to the `master` branch  
- Every **pull request** to `master`  

### 1️⃣ Setup & Installation  
- Sets up **Node.js 20** and uses **pnpm** as the package manager.  
- Installs dependencies by running `pnpm run init` in the root directory.  
- Installs **Playwright** browsers for E2E testing.  

### 2️⃣ Code Quality Checks  
- **Formatting:** Ensures code follows Prettier rules (`pnpm run format:hook .` inside `react`).  
- **Linting:** Runs ESLint to catch potential issues (`pnpm run lint` in `react`).  
- **Type Checking:** Uses TypeScript to detect type errors (`pnpm run typecheck` in `react`).  

### 3️⃣ Automated Testing  
- **Unit Tests:** Runs **Vitest** tests (`pnpm run test` in `react`).  
- **End-to-End (E2E) Tests:**  
  - Installs Playwright browsers.  
  - Runs Playwright tests (`pnpm run test` in the root directory).  

### 4️⃣ Build  
- Creates the production build (`pnpm run build` in `react`).  
- Stores test reports as artifacts in GitHub Actions.  

### 5️⃣ Deployment to Netlify (Only on `master`)  
- Installs **Netlify CLI**.  
- Deploys the app using `netlify deploy --build --dir=.next --prod`.  
- Uses **GitHub Secrets** (`NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID_REACT`) for authentication and deployment.  




## Vuejs Pipeline 

### 🔄 When does the pipeline run?  
The workflow runs on:  
- Every **push** to the `master` branch  
- Every **pull request** to `master`  

### 1️⃣ Setup & Installation  
- Sets up **Node.js 20** and uses **pnpm** as the package manager.  
- Installs dependencies by running `pnpm run init` in the root directory.  
- Installs **Playwright** browsers for E2E testing.  

### 2️⃣ Code Quality Checks  
- **Formatting:** Ensures code follows Prettier rules (`pnpm run format` inside `vue`).  
- **Linting:** Runs ESLint to catch potential issues (`pnpm run lint` in `vue`).  
- **Type Checking:** Uses TypeScript to detect type errors (`pnpm run typecheck` in `vue`).  

### 3️⃣ Automated Testing  
- **Unit Tests:** Runs **Vitest** tests (`pnpm run test:unit` in `vue`).  
- **End-to-End (E2E) Tests:**  
  - Installs Playwright browsers.  
  - Runs Playwright tests (`pnpm run test` in the root directory).  

### 4️⃣ Build  
- Creates the production build (`pnpm run build` in `vue`).  
- Stores test reports as artifacts in GitHub Actions.  

### 5️⃣ Deployment to Netlify (Only on `master`)  
- Installs **Netlify CLI**.  
- Deploys the app using `netlify deploy --dir=dist --prod`.  
- Uses **GitHub Secrets** (`NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID_VUE`) for authentication and deployment.  


## Getting Started

### Prerequisites

- Node.js 20 or later installed
- pnpm


# Installing

To set up both projects (Next.js and Vue):

```bash
pnpm run init
```

---

# Development

To run both projects simultaneously:

```bash
pnpm run dev
```

This will start the development servers for both **Next.js** and **Vue** projects.

---

# Linting, Typechecking, Formatting, and Testing

Each project has its own set of commands for linting, formatting, typechecking, and unit testing.

**Lefthook** is configured to automatically run the necessary hooks on every commit to check for:

- Linting
- Formatting
- Typechecking
- Unit testing
- E2E testing

Additionally, you can manually run all tests with:

```bash
pnpm run test
```

This will run all the tests for both projects.



# Deployment links
https://moodjournal.netlify.app/
https://moodjournalv.netlify.app/
