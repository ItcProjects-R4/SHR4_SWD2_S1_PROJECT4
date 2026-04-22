import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
});

export async function fetchGithubUser(username) {
  try {
    const [userRes, reposRes] = await Promise.all([
      github.get(`/users/${username}`),
      github.get(`/users/${username}/repos?per_page=100&sort=updated`),
    ]);
    return {
      user: userRes.data,
      repos: reposRes.data,
    };
  } catch (error) {
    if (error.response?.status === 404) throw new Error("User not found");
    if (error.response?.status === 403) throw new Error("API Rate limit exceeded. Try again later.");
    throw new Error(error.response?.data?.message || "Failed to fetch data from GitHub");
  }
}

export function analyzeRepos(repos) {
  const langs = {};
  let totalStars = 0,
    totalForks = 0;
  const topByStars = [];

  repos.forEach((r) => {
    if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
    totalStars += r.stargazers_count;
    totalForks += r.forks_count;
    topByStars.push({
      name: r.name.length > 14 ? r.name.slice(0, 12) + "…" : r.name,
      full: r.name,
      stars: r.stargazers_count,
    });
  });

  const langArr = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  topByStars.sort((a, b) => b.stars - a.stars);

  return {
    langs: langArr,
    totalStars,
    totalForks,
    topByStars: topByStars.slice(0, 8),
    totalRepos: repos.length,
  };
}

export function computeRadar(d0, d1) {
  const norm = (v, max) => (max ? Math.round((v / max) * 100) : 0);
  const mx = (a, b) => Math.max(a, b, 1);
  return [
    {
      subject: "Repos",
      A: norm(d0.totalRepos, mx(d0.totalRepos, d1.totalRepos)),
      B: norm(d1.totalRepos, mx(d0.totalRepos, d1.totalRepos)),
    },
    {
      subject: "Stars",
      A: norm(d0.totalStars, mx(d0.totalStars, d1.totalStars)),
      B: norm(d1.totalStars, mx(d0.totalStars, d1.totalStars)),
    },
    {
      subject: "Forks",
      A: norm(d0.totalForks, mx(d0.totalForks, d1.totalForks)),
      B: norm(d1.totalForks, mx(d0.totalForks, d1.totalForks)),
    },
    {
      subject: "Followers",
      A: norm(d0.user.followers, mx(d0.user.followers, d1.user.followers)),
      B: norm(d1.user.followers, mx(d0.user.followers, d1.user.followers)),
    },
    {
      subject: "Following",
      A: norm(d0.user.following, mx(d0.user.following, d1.user.following)),
      B: norm(d1.user.following, mx(d0.user.following, d1.user.following)),
    },
    {
      subject: "Langs",
      A: norm(d0.langs.length, mx(d0.langs.length, d1.langs.length)),
      B: norm(d1.langs.length, mx(d0.langs.length, d1.langs.length)),
    },
  ];
}
