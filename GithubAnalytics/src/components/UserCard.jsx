import { ACCENT } from "../utils/constants";

export default function UserCard({ user, stats, color = ACCENT }) {
  if (!user) return null;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden w-full"
      style={{
        background: "#030303",
        border: `1px solid ${color}30`,
        boxShadow: `0 0 15px ${color}10`,
      }}
    >
      <div 
        className="flex flex-row items-center gap-5 p-5 border-b"
        style={{
          borderColor: `${color}30`,
          background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)`
        }}
      >
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-md object-cover"
          style={{
            border: `1px solid ${color}80`,
            boxShadow: `0 0 15px ${color}20`,
          }}
        />
        <div className="flex flex-col">
          <span
            className="text-xl tracking-wide"
            style={{ color, fontWeight: 700, textShadow: `0 0 10px ${color}40` }}
          >
            {user.login}
          </span>
          <span className="text-sm mt-1" style={{ color: "#666" }}>
            {user.name || "Unknown"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 grid-rows-2">
        <div className="flex flex-col items-center justify-center py-5 border-r border-b" style={{ borderColor: `${color}30` }}>
          <span className="text-[11px] uppercase tracking-widest text-[#555] mb-2">Repos</span>
          <span className="text-2xl font-bold" style={{ color }}>{user.public_repos || stats?.totalRepos || 0}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-5 border-r border-b" style={{ borderColor: `${color}30` }}>
          <span className="text-[11px] uppercase tracking-widest text-[#555] mb-2">Stars</span>
          <span className="text-2xl font-bold" style={{ color }}>{stats?.totalStars || 0}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-5 border-b" style={{ borderColor: `${color}30` }}>
          <span className="text-[11px] uppercase tracking-widest text-[#555] mb-2">Forks</span>
          <span className="text-2xl font-bold" style={{ color }}>{stats?.totalForks || 0}</span>
        </div>

        <div className="flex flex-col items-center justify-center py-5 border-r" style={{ borderColor: `${color}30` }}>
          <span className="text-[11px] uppercase tracking-widest text-[#555] mb-2">Followers</span>
          <span className="text-2xl font-bold" style={{ color }}>{user.followers || 0}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-5 border-r" style={{ borderColor: `${color}30` }}>
          <span className="text-[11px] uppercase tracking-widest text-[#555] mb-2">Following</span>
          <span className="text-2xl font-bold" style={{ color }}>{user.following || 0}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-5">
          <span className="text-[11px] uppercase tracking-widest text-[#555] mb-2">Langs</span>
          <span className="text-2xl font-bold" style={{ color }}>{stats?.langs?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
