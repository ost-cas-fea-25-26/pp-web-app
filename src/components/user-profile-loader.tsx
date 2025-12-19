import { getUserByIdAction } from "@/lib/actions/users.actions";
import { getAvatarFallbackLetters } from "@/lib/utils";
import { UserProfileView } from "./user-profile-view";
import { usersStorage } from "@/lib/storage/users.storage";

type UserProfileLoaderProps = {
  userId: string;
  isEditable: boolean;
};

export const UserProfileLoader = async ({
  userId,
  isEditable,
}: UserProfileLoaderProps) => {
  const userResult = await getUserByIdAction(userId);

  if (!userResult.success) {
    return <p>User not found</p>;
  }

  const user = userResult.payload;

  const bannerUrl = usersStorage.getBannerUrl(userId);
  const avatarUrl = user.avatarUrl ?? null;

  const name =
    `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() || "Unknown User";

  const handle = user.username ?? "unknown";

  const bio =
    "Unschnöseliger Golfer, Drummer, Lieblings-Superheld: Tony Stark, Escape Room Fan, der einzige Informatiker ohne Kaffeesucht. Oft mit Kinderwagen am Bodensee anzutreffen.";

  const fallbackLetters = getAvatarFallbackLetters(
    user.firstname,
    user.lastname,
  );

  return (
    <UserProfileView
      bannerUrl={bannerUrl}
      avatarUrl={avatarUrl}
      name={name}
      handle={handle}
      bio={bio}
      fallbackLetters={fallbackLetters}
      userId={userId}
      isEditable={isEditable}
    />
  );
};
