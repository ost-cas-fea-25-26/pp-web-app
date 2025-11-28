import { CurrentUserProfile } from "@/components/current-user-profile";
import { Suspense } from "react";

const ProfilePage = () => {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <CurrentUserProfile />
    </Suspense>
  );
};

export default ProfilePage;
