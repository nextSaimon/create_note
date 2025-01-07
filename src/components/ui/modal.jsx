import React from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

export const ModalContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const ModalFooter = ({ children }) => (
  <div className="p-4 border-t">{children}</div>
);
