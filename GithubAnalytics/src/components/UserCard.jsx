import { ACCENT } from "../utils/constants";
import { GlowText } from "./UI";

export default function UserCard({ user, stats, color = ACCENT }) {
  if (!user) return null;

  const statItems = [
    { l: "REPOS", v: stats?.totalRepos || user.public_repos || 0 },
    { l: "STARS", v: stats?.totalStars || 0 },
    { l: "FORKS", v: stats?.totalForks || 0 },
    { l: "FOLLOWERS", v: user.followers || 0 },
    { l: "FOLLOWING", v: user.following || 0 },
    { l: "LANGS", v: stats?.langs?.length || 0 },
  ];

  return (
    <div
      className="rounded overflow-hidden w-full flex flex-col h-full"
      style={{
        border: `1px solid ${color}25`,
        background: `${color}04`,
      }}
    >
      <div
        className="flex items-start gap-4 p-5 min-h-25 flex-1"
        style={{ borderBottom: `1px solid ${color}15` }}
      >
        <img
          src={user.avatar_url}
          alt=""
          className="w-14 h-14 rounded shrink-0"
          style={{
            border: `2px solid ${color}60`,
            filter: "grayscale(20%)",
          }}
        />
        <div className="flex flex-col">
          <GlowText color={color} size="1.1rem">
            {user.login}
          </GlowText>
          <span
            className="text-[11px] mt-1"
            style={{
              color: "#555",
              fontFamily: "'Share Tech Mono', monospace",
            }}
          >
            {user.name || "—"}
          </span>
          {user.bio && (
            <span
              className="text-[11px] mt-1 truncate max-w-[280px]"
              style={{ color: "#444" }}
            >
              {user.bio}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3"
        style={{ gap: "1px", background: `${color}10` }}
      >
        {statItems.map(({ l, v }) => (
          <div
            key={l}
            className="flex flex-col items-center justify-center p-3 text-center"
            style={{ background: "#060606" }}
          >
            <span
              className="text-[10px] tracking-[1px] mb-1"
              style={{
                color: "#444",
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              {l}
            </span>
            <GlowText color={color} size="1.2rem">
              {v}
            </GlowText>
          </div>
        ))}
      </div>
    </div>
  );
}
