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
import { PostActions } from "@/components/post-actions";

type PostDetailPageProps = {
  id: string;
};

export const PostDetailPage: FC<PostDetailPageProps> = async ({ id }) => {
  const session = await getSession();
  const authenticatedUser = session?.user;
  if (!authenticatedUser) {
    throw new Error("User not authenticated");
  }

  const currentUser = await getUserByIdAction(authenticatedUser.id);
  if (!currentUser.success) {
    throw new Error("Failed to fetch user from session");
  }

  const mumbleResponse = await getPostByIdAction(id);
  if (!mumbleResponse.success) {
    throw new Error("Failed to load mumble");
  }

  const mumblePayload = mumbleResponse.payload;
  if (!mumblePayload.id) {
    throw new Error("Mumble id is required");
  }

  if (!mumblePayload.creator?.id) {
    throw new Error("Mumble creator is required");
  }

  const author = await getUserByIdAction(mumblePayload.creator.id);
  if (!author.success) {
    throw new Error("Failed to fetch user from mumble");
  }

  const repliesPayload = await getRepliesByPostIdAction(id);
  if (!repliesPayload.success) {
    throw new Error("Failed to load replies");
  }
  const replies =
    repliesPayload.payload.data?.filter((reply: Post) => !!reply.creator) ?? [];

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
    actions: undefined, // TODO,
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
