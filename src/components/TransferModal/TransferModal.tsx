import React from "react";
import Modal from "react-modal";

export interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionLink: string;
  error?: string | null; 
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  transactionLink,
  error,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Status"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-[#6d6a75] p-6 rounded-lg shadow-lg max-w-sm w-full text-[#bfbdc1] border border-[#deb841]">
        <h2 className="text-xl font-bold mb-4 text-[#deb841]">
          {error ? "Transaction Failed" : "Transaction Completed"}
        </h2>
        <p className="mb-4">
          {error ? error : "Your transaction has been processed successfully."}
        </p>
        {transactionLink && (
          <div className="mb-4">
            <a
              href={transactionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#deb841] underline"
            >
              View Transaction
            </a>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#deb841] text-[#6d6a75] rounded hover:bg-[#d0a431] transition-colors duration-150 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
  
};

export default TransferModal;