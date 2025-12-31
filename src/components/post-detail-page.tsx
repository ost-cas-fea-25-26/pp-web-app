import { getUserByIdAction } from "@/lib/actions/users.actions";
import {
  getPostByIdAction,
  getRepliesByPostIdAction,
} from "@/lib/actions/posts.actions";
import { MumbleDetail } from "@/components/mumble-detail";
import { FC } from "react";
import { mapCreatorUserToUser, mapUser } from "@/lib/mappers/user.mappers";
import { Post, MumbleWithId } from "@/lib/api/posts/posts.types";
import {
  getDeepLinkUrlByMumbleId,
  getTimestampLabelFromUlid,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ErrorOverlay } from "@/components/error-overlay";
import { api } from "@/lib/api";

type PostDetailPageProps = {
  id: string;
};

export const PostDetailPage: FC<PostDetailPageProps> = async ({ id }) => {
  const currentUser = await api.users.getMe();
  if (!currentUser?.success) {
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
  const mumbleWithId = mumblePayload as MumbleWithId;

  const author = await getUserByIdAction(mumblePayload.creator.id);
  if (!author.success) {
    return (
      <ErrorOverlay message="Failed to fetch user from mumble, try again." />
    );
  }

  const repliesPayload = await getRepliesByPostIdAction(id);

  const replies = repliesPayload.success
    ? (repliesPayload.payload.data ?? [])
    : [];

  const filteredReplies: MumbleWithId[] = replies.filter(
    (reply: Post): reply is MumbleWithId => reply.id !== undefined,
  );

  const replyAuthors = await Promise.all(
    filteredReplies.map((reply) => mapCreatorUserToUser(reply.creator ?? {})),
  );

  const mappedReplies = filteredReplies.map((reply, idx) => ({
    id: reply.id,
    content: reply.text,
    userName: replyAuthors[idx]?.fullName,
    userHandle: replyAuthors[idx]?.handle,
    profileUrl: `/users/${replyAuthors[idx]?.id}`,
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
    timestamp: getTimestampLabelFromUlid(reply.id),
    mediaElement: reply.mediaUrl && (
      <Image
        alt="Mumble media"
        className="object-cover w-full h-full"
        src={reply.mediaUrl}
        width={800}
        height={600}
      />
    ),
  }));

  return (
    <div className="gap-10 flex flex-col">
      <MumbleDetail
        mumble={mumbleWithId}
        currentUser={mapUser(currentUser.payload)}
        author={mapUser(author.payload)}
        replies={mappedReplies}
        deepLink={getDeepLinkUrlByMumbleId(mumbleWithId.id)}
      />
    </div>
  );
};
