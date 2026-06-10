"use client";

import { X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface StatusChangeModalProps {
    isOpen: boolean;
    newStatus: string;
    isLoading: boolean;
    onClose: () => void;
    onStatusChange: (status: string) => void;
    onStatusSelect: (status: string) => void;
}

const StatusChangeModal = ({
    isOpen,
    newStatus,
    isLoading,
    onClose,
    onStatusChange,
    onStatusSelect
}: StatusChangeModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Change Application Status</h2>
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
                            Select New Status
                        </label>
                        <select
                            value={newStatus}
                            onChange={(e) => {
                                onStatusSelect(e.target.value);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                        >
                            <option value="">Select Status</option>
                            <option value="APPLIED">Applied</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="INTERVIEWING">Interviewing</option>
                            <option value="SELECTED">Selected</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    <Button
                        onClick={() => onStatusChange(newStatus)}
                        disabled={!newStatus || isLoading}
                        className="w-full text-sm"
                        size="md"
                    >
                        {isLoading ? "Updating..." : "Update Status"}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default StatusChangeModal;
