import { useSelector } from "react-redux";
import UserProfileCard from "./userProfile";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#0B0D12] px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-violet-300" />
          <p className="text-sm text-[#9298A7]">Loading your profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-76px)] w-full overflow-x-hidden bg-[#0B0D12] px-4 py-8 sm:px-6 sm:py-10">
      <div className="dm-container">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            Your space
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F3F4F6] sm:text-4xl">
            Your profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#9298A7]">
            Make your profile reflect your skills, experience, and the kind
            of developers you want to connect with.
          </p>
        </div>

        <div className="dm-profile-grid"><aside><p className="dm-eyebrow mb-4">YOUR PUBLIC PROFILE</p><UserProfileCard user={user} /></aside><section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11141B] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-6 lg:p-8">
          <EditProfile user={user} />
        </section></div>
      </div>
    </main>
  );
};

export default Profile;
