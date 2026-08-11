import React from "react";
import { ModalOverlay, Modal, Dialog, Heading } from "react-aria-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
};

function Popup({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false,
}: Props) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181C14]/80 backdrop-blur-sm"
    >
      <Modal className="bg-dark-accent w-full max-w-md rounded-[20px] p-6 flex flex-col gap-4 border border-[rgba(255,255,255,0.05)] shadow-2xl relative outline-none animate-in fade-in zoom-in-95 duration-200">
        <Dialog className="outline-none">
          <Heading
            slot="title"
            className={`text-2xl font-bold ${
              isDestructive ? "text-[#FF6347]" : "text-light"
            }`}
          >
            {title}
          </Heading>
          <p className="text-accent-bg leading-relaxed mt-4">{description}</p>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-light bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                isDestructive
                  ? "bg-[rgba(255,99,71,0.1)] text-[#FF6347] border border-[rgba(255,99,71,0.5)] hover:bg-[rgba(255,99,71,0.2)]"
                  : "bg-accent text-dark hover:brightness-110"
              }`}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export default Popup;
