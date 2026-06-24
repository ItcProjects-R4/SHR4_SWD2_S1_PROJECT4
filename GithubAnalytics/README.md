# GitHub Analytics Dashboard

> A fast, visual dashboard for analyzing and comparing GitHub profiles — no coding knowledge or manual API calls required.

![Status](https://img.shields.io/badge/status-completed-1A7A4A) ![React](https://img.shields.io/badge/React-19-00ff88) ![Vite](https://img.shields.io/badge/Vite-Build-ff6b35)

**Live Demo:** [shr-4-swd-2-s1-project-4-auvoyrbf4-norhanelyan-7812s-projects.vercel.app](https://shr-4-swd-2-s1-project-4-auvoyrbf4-norhanelyan-7812s-projects.vercel.app/)

---

## Project Idea

GitHub Analytics Dashboard is a web application that lets anyone analyze a GitHub profile in seconds — just by typing a username. It pulls live data from the GitHub REST API and turns it into clear, visual statistics: repositories, stars, forks, followers, programming languages, and more. It also supports a Compare Mode to put two profiles side by side and see who comes out on top.

The goal is simple: remove the need to write any code or call the GitHub API manually just to understand a developer's profile.

---

## Project Goals

- Provide a fast, visual analysis tool for GitHub profiles without requiring manual API calls or code
- Make it easy to compare two developers side by side across multiple metrics
- Give recruiters, students, and hackathon organizers a quick way to evaluate GitHub activity
- Keep the experience simple: type a username, click ANALYZE, done

---

## Tech Stack

| Category         | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Frontend Library | React (Hooks: `useState`, `useEffect`, `useRef`) |
| Build Tool       | Vite                                             |
| Styling          | Tailwind CSS                                     |
| Charts           | Recharts (Bar, Pie, Radar charts)                |
| HTTP Client      | Axios                                            |
| Data Source      | GitHub REST API                                  |
| Fonts            | Share Tech Mono, Bebas Neue                      |

---

## Key Features

- **Search & Fetch** — Analyze any public GitHub profile by username
- **Profile Overview** — Avatar, bio, repos, stars, forks, followers, following, and language count
- **Account Age & Veteran Badge** — Shows how long the account has existed
- **Repository Browser** — Full table of repos with stars, forks, language, and a live filter to search by name
- **Language Distribution** — Donut chart breakdown of each user's most-used languages
- **Compare Mode** — Analyze two users side by side
- **Radar Chart** — Visual comparison across 6 dimensions (Repos, Stars, Forks, Followers, Following, Languages)
- **Head-to-Head Bars** — Numeric breakdown of every metric between both users
- **Overall Winner** — Automatically calculated score declares a winner
- **Recently Active Repos & Repo Size Distribution** — Deeper comparison charts in Compare Mode
- **Recent Searches** — Quick-access chips for the last analyzed usernames
- **Live Terminal Log** — Real-time feedback on every API request (fetching, success, error)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ItcProjects-R4/SHR4_SWD2_S1_PROJECT4.git
cd SHR4_SWD2_S1_PROJECT4/GithubAnalytics

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

**Important:** This project must be run through a local dev server (Vite). Opening the HTML file directly (`file://`) will cause CORS errors when fetching data from the GitHub API.

---

## Screenshots

> Screenshots are available in the `/screenshots` folder. See below for what each one shows.

| Screen                     | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| Overview (Single user)     | Profile card with avatar, stats, and account age for one user |
| Overview (Compare mode)    | Two profile cards rendered side by side                       |
| Repos tab                  | Full repository table with a live name filter                 |
| Languages tab              | Donut chart + legend of language distribution                 |
| Compare tab                | Radar chart + head-to-head bars + overall winner              |
| Compare tab (extra charts) | Recently active repos & repo size distribution comparison     |

---

## Project Structure

```
GithubAnalytics/
└── src/
    ├── components/
    │   ├── tabs/
    │   │   ├── CompareTab.jsx       # Radar chart, head-to-head bars, winner logic
    │   │   ├── LanguagesTab.jsx     # Pie/donut chart of language distribution
    │   │   ├── OverviewTab.jsx      # Profile card + top repos chart
    │   │   ├── ReposTab.jsx         # Repository table with filter
    │   │   └── index.js             # Barrel export for tab components
    │   ├── AccountAgeScore.jsx      # Account age calculation + "Veteran" badge
    │   ├── EmptyState.jsx           # Placeholder shown before any search
    │   ├── Header.jsx               # Logo + Compare Mode toggle
    │   ├── HeadToHead.jsx           # Per-metric comparison bars
    │   ├── RecentActivityChart.jsx  # "Recently active repos" bar chart
    │   ├── RepoSizeChart.jsx        # "Repo size distribution" bar chart
    │   ├── SearchBar.jsx            # Username input(s) + ANALYZE button(s)
    │   ├── SearchHistory.jsx        # Recent search chips
    │   ├── TabNav.jsx                # Tab navigation bar
    │   ├── Terminal.jsx             # Live request log
    │   ├── UI.jsx                   # Shared primitives (GlowText, SectionTitle, Tooltip)
    │   └── UserCard.jsx              # Profile summary card
    ├── hooks/
    │   └── useGithub.js              # Fetching logic, loading state, terminal logs
    ├── pages/                        # Page-level composition (if applicable)
    ├── utils/
    │   ├── constants.js              # Color tokens (ACCENT, ACCENT2, COLORS)
    │   └── github.js                 # API calls, data analysis, radar computation
    ├── App.jsx                       # Root component — tab state, layout
    ├── App.css
    ├── index.css
    └── main.jsx                      # App entry point
```

---

## Challenges Faced

- **CORS restrictions** — Opening the project as a static HTML file blocked all requests to the GitHub API. Solved by running the project through a local Vite dev server instead.
- **GitHub API rate limits** — Without authentication, GitHub limits requests to 60/hour, which can be hit quickly during testing. Mitigated by minimizing redundant calls and batching user + repo requests together.
- **Keeping two-user state in sync** — Supporting Compare Mode meant managing loading, error, and data state independently for two users at once without mixing them up.
- **Consistent component styling across the team** — With 5 developers working in parallel, keeping colors and spacing consistent required centralizing all values in `constants.js` and reviewing PRs carefully.
- **Chart readability with large repo counts** — Some users have 100+ repositories; the dashboard needed to summarize (top 8 by stars) rather than rendering everything at once.

---

## Future Improvements

- **Contribution Graph** — Daily contribution heatmap similar to GitHub's own activity graph
- **Pinned Repos** — Display repositories pinned to the user's profile
- **Language by Bytes** — Analyze language usage by actual byte count instead of repo count
- **Export Profile** — Export analysis results as a PDF or image
- **GitHub Token Support** — Let users add a Personal Access Token to raise the API rate limit

---

## Team Members

| Team Member        | Role                    | Responsibilities                                                              |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------- |
| Norhan Elyan       | Project Lead / Frontend | Project management, GitHub API integration, Compare feature, Header component |
| Alya Abuelmaati    | Frontend Developer      | App shell, tab navigation, layout, SearchBar component                        |
| Aya Gamal          | Frontend Developer      | Shared UI components, Terminal log component                                  |
| Shehab Abdelrahman | Frontend Developer      | UserCard component, Overview tab (profile + stars chart)                      |
| Hassan Elshair     | Frontend Developer      | Repos tab (repository table), Languages tab (pie chart & legend)              |

---

## Demo Video

[Watch the project walkthrough](https://drive.google.com/file/d/1tcdJW8KDg8HtWtNBrodaiGTeNyh7iwn0/view?usp=sharing)

---

## License

**This project was developed for educational purposes as part of the ITC training program and DEPI.**

**This software is intended for learning, evaluation, and demonstration purposes.**

---

<p align="center">GitHub Analytics Dashboard — 2026</p>
