"use client";

import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

interface InterviewFiltersProps {
    typeFilter: string;
    statusFilter: string;
    searchValue: string;
    onTypeChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSearchChange: (value: string) => void;
}

const typeOptions = ["ALL", "TECHNICAL", "HR", "MANAGERIAL", "PRE_PLACEMENT", "ONLINE_TEST"];
const statusOptions = ["ALL", "SCHEDULED", "COMPLETED", "CANCELLED"];

const InterviewFilters = ({
    typeFilter,
    statusFilter,
    searchValue,
    onTypeChange,
    onStatusChange,
    onSearchChange,
}: InterviewFiltersProps) => {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
                <label className="flex items-center gap-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3">
                    <Search className="w-4 h-4 text-neutral-500" />
                    <input
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search by title, applicant or meeting link"
                        className="w-full bg-transparent outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
                    />
                </label>

                <Button
                    variant="secondary"
                    onClick={() => {
                        onSearchChange("");
                        onTypeChange("ALL");
                        onStatusChange("ALL");
                    }}
                    className="justify-center whitespace-nowrap"
                >
                    Clear Filters
                </Button>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Type:</span>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {typeOptions.map((value) => (
                        <button
                            key={value}
                            onClick={() => onTypeChange(value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                typeFilter === value
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            }`}
                        >
                            {value.replace("_", " ")}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status:</span>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {statusOptions.map((value) => (
                        <button
                            key={value}
                            onClick={() => onStatusChange(value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                statusFilter === value
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            }`}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewFilters;