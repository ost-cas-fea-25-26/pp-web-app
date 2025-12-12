import { FollowToggleSection } from "@/components/follow-toggle-section";
import { PostList } from "@/components/post-list";
import { RecommendedUsers } from "@/components/recommended-users";
import { UserProfile } from "@/components/user-profile";
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

  if (!authenticatedUser?.id) {
    return <p>Please log in to view profiles.</p>;
  }

  return (
    <Suspense>
      <div className="gap-10 flex flex-col">
        <UserProfile userId={userId} isEditable={isOwnProfile} />
        {isOwnProfile ? (
          <>
            <RecommendedUsers selfId={authenticatedUser.id} />
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
            <FollowToggleSection
              selfId={authenticatedUser.id}
              targetUserId={userId}
            />
            <PostList filterByCreatorsIds={[userId]} />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default ProfilePage;
