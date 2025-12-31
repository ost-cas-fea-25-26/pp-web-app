"use client";

import { Modal, MumbleIcon } from "@ost-cas-fea-25-26/pp-design-system";
import { FC, useState } from "react";

type ErrorOverlayProps = {
  message: string;
};

export const ErrorOverlay: FC<ErrorOverlayProps> = ({ message }) => {
  const [open, setOpen] = useState(true);

  return (
    <Modal open={open} onOpenChange={setOpen} title="Oops!" footer={undefined}>
      <div className="inline-flex items-center justify-center gap-4">
        <MumbleIcon size="l" color="error" />
        <p className="body-m text-error paragraph-lg">{message}</p>
      </div>
    </Modal>
  );
};
