import { getUserByIdAction } from "@/lib/actions/users.actions";
import { getAvatarFallbackLetters } from "@/lib/utils";
import { UserProfileView } from "./user-profile-view";
import { usersRepository } from "@/lib/db/repositories/users.repository";
import { ErrorOverlay } from "./error-overlay";

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
    return <ErrorOverlay message="User not found" />;
  }

  const [bioResult, bannerResult] = await Promise.all([
    usersRepository.getBioByUserId(userId),
    usersRepository.getBannerImageByUserId(userId),
  ]);

  if (!bioResult.success || !bannerResult.success) {
    return <ErrorOverlay message="User not found" />;
  }

  const user = userResult.payload;

  const bannerUrl = bannerResult.payload ?? null;
  const avatarUrl = user.avatarUrl ?? null;
  const handle = user.username ?? "unknown";
  const bio = bioResult.payload ?? "";

  const fallbackLetters = getAvatarFallbackLetters(
    user.firstname,
    user.lastname,
  );

  return (
    <UserProfileView
      bannerUrl={bannerUrl}
      avatarUrl={avatarUrl}
      firstname={user.firstname ?? ""}
      lastname={user.lastname ?? ""}
      handle={handle}
      bio={bio}
      fallbackLetters={fallbackLetters}
      userId={userId}
      isEditable={isEditable}
    />
  );
};
