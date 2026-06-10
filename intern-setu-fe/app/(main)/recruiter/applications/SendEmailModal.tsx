"use client";

import { X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface SendEmailModalProps {
    isOpen: boolean;
    message: string;
    isLoading: boolean;
    onClose: () => void;
    onSend: () => void;
    onMessageChange: (message: string) => void;
}

const SendEmailModal = ({
    isOpen,
    message,
    isLoading,
    onClose,
    onSend,
    onMessageChange
}: SendEmailModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Send Email to Candidate</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            placeholder="Enter your message for the candidate..."
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm resize-none"
                            rows={4}
                        />
                    </div>

                    <Button
                        onClick={onSend}
                        disabled={!message || isLoading}
                        className="w-full text-sm bg-blue-600 hover:bg-blue-700"
                        size="md"
                    >
                        {isLoading ? "Sending..." : "Send Email"}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default SendEmailModal;
