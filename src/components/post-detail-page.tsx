import { getSession } from "@/lib/auth/server";
import { getUserByIdAction } from "@/lib/actions/users.actions";
import {
  getPostByIdAction,
  getRepliesByPostIdAction,
} from "@/lib/actions/posts.actions";
import { MumbleDetail } from "@/components/mumble-detail";
import { FC } from "react";
import {
  mapCreatorUserToUser,
  mapUserPayloadToUser,
} from "@/lib/mappers/user.mappers";
import { Post } from "@/lib/api/posts/posts.types";
import {
  getDeepLinkUrlByMumbleId,
  getTimestampLabelFromUlid,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ErrorOverlay } from "@/components/error-overlay";

type PostDetailPageProps = {
  id: string;
};

export const PostDetailPage: FC<PostDetailPageProps> = async ({ id }) => {
  const session = await getSession();
  const authenticatedUser = session?.user;
  if (!authenticatedUser) {
    return (
      <ErrorOverlay message="You must be logged in to comment on a mumble." />
    );
  }

  const currentUser = await getUserByIdAction(authenticatedUser.id);
  if (!currentUser.success) {
    return <ErrorOverlay message="Failed to fetch user, try again." />;
  }

  const mumbleResponse = await getPostByIdAction(id);
  if (!mumbleResponse.success) {
    return <ErrorOverlay message="Failed to load mumble, try again." />;
  }

  const mumblePayload = mumbleResponse.payload;
  if (!mumblePayload.id || !mumblePayload.creator?.id) {
    return <ErrorOverlay message="Invalid response from server, try again." />;
  }

  const author = await getUserByIdAction(mumblePayload.creator.id);
  if (!author.success) {
    return (
      <ErrorOverlay message="Failed to fetch user from mumble, try again." />
    );
  }

  const repliesPayload = await getRepliesByPostIdAction(id);
  const replies = repliesPayload.success
    ? (repliesPayload.payload.data?.filter((reply: Post) => !!reply.creator) ??
      [])
    : [];

  const replyAuthors = await Promise.all(
    replies.map((reply: Post) => mapCreatorUserToUser(reply.creator ?? {})),
  );

  const mappedReplies = replies.map((reply: Post, idx: number) => ({
    id: reply.id,
    content: reply.text,
    userName: replyAuthors[idx]?.fullName,
    userHandle: replyAuthors[idx]?.handle,
    avatar: replyAuthors[idx]?.avatarUrl ? (
      <Link href={`/users/${replyAuthors[idx]?.id}`}>
        <Image
          src={replyAuthors[idx]?.avatarUrl ?? ""}
          alt={replyAuthors[idx]?.fullName}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </Link>
    ) : undefined,
    timestamp: getTimestampLabelFromUlid(reply.id!), // or use your timestamp util
    mediaElement: reply.mediaUrl ? (
      <img src={reply.mediaUrl} alt="Reply Media" />
    ) : null,
  }));

  return (
    <div className="gap-10 flex flex-col">
      <MumbleDetail
        mumble={mumblePayload}
        currentUser={mapUserPayloadToUser(currentUser.payload)}
        author={mapUserPayloadToUser(author.payload)}
        replies={mappedReplies}
        deepLink={getDeepLinkUrlByMumbleId(mumblePayload.id)}
      />
    </div>
  );
};
