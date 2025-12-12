import { FollowToggleSection } from "@/components/follow-toggle-section";
import { PostList } from "@/components/post-list";
import { RecommendedUsersLoader } from "@/components/recommended-users-loader";
import { UserProfileLoader } from "@/components/user-profile-loader";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { Tabs } from "@ost-cas-fea-25-26/pp-design-system";
import { Suspense } from "react";

type ProfilePageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = await params;
  const authenticatedUser = await getAuthenticatedUser();
  const isOwnProfile = authenticatedUser?.id === userId;

  return (
    <Suspense>
      <div className="gap-10 flex flex-col">
        <UserProfileLoader userId={userId} isEditable={isOwnProfile} />
        {isOwnProfile ? (
          <>
            <RecommendedUsersLoader />
            <Tabs
              tabs={[
                {
                  text: "Your Mumbles",
                  content: <PostList filterByCreatorsIds={[userId]} />,
                },
                {
                  text: "Your Likes",
                  content: <PostList filterLikedBy={[userId]} />,
                },
              ]}
            />
          </>
        ) : (
          <>
            <FollowToggleSection userId={userId} />
            <PostList filterByCreatorsIds={[userId]} />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default ProfilePage;
