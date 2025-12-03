import { PostList } from "@/components/post-list";
import { UserProfile } from "@/components/user-profile";
import { Tabs } from "@ost-cas-fea-25-26/pp-design-system";
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
      <div className="gap-10 flex flex-col">
        <UserProfile userId={userId} />
        <Tabs
          tabs={[
            {
              text: "Your Mumbles",
              content: (
                <>
                  Add your Posts here
                  <PostList />
                </>
              ),
            },
            {
              text: "Your Likes",
              content: (
                <>
                  Add your Liked Posts here
                  <PostList />
                </>
              ),
            },
          ]}
        />
      </div>
    </Suspense>
  );
};

export default ProfilePage;
