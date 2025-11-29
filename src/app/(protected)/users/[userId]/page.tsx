import { UserProfile } from "@/components/user-profile";
import { Suspense } from "react";

type ProfilePageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = await params;

  return (
    <Suspense>
      <UserProfile userId={userId} />
    </Suspense>
  );
};

export default ProfilePage;
