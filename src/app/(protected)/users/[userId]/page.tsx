import { FollowToggleSection } from "@/components/follow-toggle-section";
import { PostList } from "@/components/post-list";
import { PostListSkeleton } from "@/components/post-list-skeleton";
import { RecommendedUsersLoader } from "@/components/recommended-users-loader";
import { UserProfileLoader } from "@/components/user-profile-loader";
import { getSession } from "@/lib/auth/server";
import {
  ProfileHeaderSkeleton,
  Tabs,
} from "@ost-cas-fea-25-26/pp-design-system";
import { Suspense } from "react";
import { getMumbleBaseUrl } from "@/lib/utils";

type ProfilePageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = await params;
  const session = await getSession();
  const isOwnProfile = session?.user?.id === userId;

  return (
    <Suspense
      fallback={
        <div className="gap-10 flex flex-col">
          <ProfileHeaderSkeleton />
          <PostListSkeleton count={5} />
        </div>
      }
    >
      <div className="gap-10 flex flex-col">
        <UserProfileLoader userId={userId} isEditable={isOwnProfile} />

        {isOwnProfile ? (
          <>
            <RecommendedUsersLoader />
            <Tabs
              tabs={[
                {
                  text: "Your Mumbles",
                  content: (
                    <PostList
                      filterByCreatorsIds={[userId]}
                      mumbleBaseUrl={getMumbleBaseUrl()}
                    />
                  ),
                },
                {
                  text: "Your Likes",
                  content: (
                    <PostList
                      filterLikedBy={[userId]}
                      mumbleBaseUrl={getMumbleBaseUrl()}
                    />
                  ),
                },
              ]}
            />
          </>
        ) : (
          <>
            <FollowToggleSection userId={userId} />
            <PostList
              filterByCreatorsIds={[userId]}
              mumbleBaseUrl={getMumbleBaseUrl()}
            />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default ProfilePage;
