"use client";

export default function CustomButton({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md text-white ${disabled ? "bg-gray-400" : "bg-[#A80038] hover:bg-[#FD0054]"}`}
        >
            {children}
        </button>
    );
}
