import { UserRound } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="profile-pill" aria-label="User profile">
      <UserRound size={18} />
      <span>Alex</span>
    </div>
  );
}
