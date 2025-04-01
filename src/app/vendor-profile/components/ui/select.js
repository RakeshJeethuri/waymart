import * as React from "react";

export const Select = ({ children, value, onValueChange }) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full p-2 border border-[#FD0054] bg-[#FBF9FA] text-[#A80038] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A80038]"
      >
        {children}
      </select>
    </div>
  );
};

export const SelectTrigger = ({ children, className }) => {
  return <div className={`p-2 rounded-md border border-[#FD0054] ${className}`}>{children}</div>;
};

export const SelectValue = ({ placeholder }) => {
  return <span className="text-[#A80038]">{placeholder}</span>;
};

export const SelectContent = ({ children }) => {
  return <div className="absolute z-10 w-full bg-[#A80038] text-white rounded-md shadow-md">{children}</div>;
};

export const SelectItem = ({ value, children }) => {
  return (
    <option value={value} className="p-2 text-[#A80038] hover:bg-[#FD0054]">
      {children}
    </option>
  );
};
