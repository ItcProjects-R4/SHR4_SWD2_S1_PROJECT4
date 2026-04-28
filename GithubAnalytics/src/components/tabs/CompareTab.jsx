import { ACCENT, ACCENT2 } from "../../utils/constants";
import { computeRadar } from "../../utils/github";
import { SectionTitle } from "../UI";
import HeadToHead from "../HeadToHead";
import StarsCompareChart from "../StarsCompareChart";

export default function CompareTab({ data }) {
  const [d0, d1] = data;
  const radarData = computeRadar(d0, d1);

  const stats = [
    { label: "PUBLIC REPOS", a: d0.totalRepos, b: d1.totalRepos },
    { label: "TOTAL STARS", a: d0.totalStars, b: d1.totalStars },
    { label: "TOTAL FORKS", a: d0.totalForks, b: d1.totalForks },
    { label: "FOLLOWERS", a: d0.user.followers, b: d1.user.followers },
    { label: "FOLLOWING", a: d0.user.following, b: d1.user.following },
    { label: "LANGUAGES", a: d0.langs.length, b: d1.langs.length },
  ];

  const score = (d) =>
    d.totalStars * 3 + d.user.followers * 2 + d.totalRepos + d.langs.length * 5;
  const s0 = score(d0),
    s1 = score(d1);
  const winner = s0 > s1 ? d0.user.login : s1 > s0 ? d1.user.login : null;
  const winColor = s0 >= s1 ? ACCENT : ACCENT2;

  const allNames = [
    ...new Set([
      ...d0.topByStars.slice(0, 5).map((r) => r.full_name),
      ...d1.topByStars.slice(0, 5).map((r) => r.full_name),
    ]),
  ];

  const compareBarData = allNames.map((name) => ({
    name: name.split("/")[1] || name,
    [d0.user.login]:
      d0.repos.find((r) => r.full_name === name)?.stargazers_count || 0,
    [d1.user.login]:
      d1.repos.find((r) => r.full_name === name)?.stargazers_count || 0,
  }));

  return (
    <div className="space-y-8">
      <SectionTitle>Head-to-Head Comparison</SectionTitle>
      <HeadToHead
        radarData={radarData}
        stats={stats}
        d0={d0}
        d1={d1}
        winner={winner}
        winColor={winColor}
      />
      <StarsCompareChart
        compareBarData={compareBarData}
        login0={d0.user.login}
        login1={d1.user.login}
      />
    </div>
  );
}
