"use client";

// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { UploadCloud } from "lucide-react";
// import CustomButton from "../ui/customButton"; // Ensure the correct path and export type

// export default function FileUpload({ onFileSelect }: { onFileSelect: (file: File | null) => void }) {
//   const [file, setFile] = useState<File | null>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       const uploadedFile = acceptedFiles[0];
//       setFile(uploadedFile);
//       onFileSelect(uploadedFile);
//     }
//   }, [onFileSelect]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     multiple: false,
//     accept: { "image/*": [] },
//   });

//   return (
//     <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-[#A80038] bg-[#FBF9FA] rounded-xl">
//       {/* Drag and Drop Area */}
//       <div
//         {...getRootProps()}
//         className="w-full flex flex-col items-center justify-center p-6 border border-[#A80038] rounded-lg bg-[#FBF9FA] cursor-pointer hover:bg-[#FD0054]/30 transition"
//       >
//         <input {...getInputProps()} />
//         <UploadCloud className="w-10 h-10 text-[#A80038]" />
//         <p className="text-[#2B2024] mt-2">Drag & Drop an image or click to browse</p>
//       </div>

//       {/* File Preview */}
//       {file && (
//         <div className="mt-2">
//           <img src={URL.createObjectURL(file)} alt="Preview" className="w-32 h-32 object-cover rounded-md border border-[#A80038]" />
//           <p className="text-sm text-[#2B2024] mt-1">{file.name}</p>
//         </div>
//       )}

//       {/* Upload Button */}
//       {/* <CustomButton 
//         onClick={() => file && onFileSelect(file)} 
//         disabled={!file} 
//       >
//         Upload File
//       </CustomButton> */}
//     </div>
//   );
// }
"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export default function FileUpload({ onFileSelect, resetTrigger }: { onFileSelect: (file: File | null) => void, resetTrigger: boolean }) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      onFileSelect(uploadedFile);
    }
  }, [onFileSelect]);

  useEffect(() => {
    setFile(null); // Reset file when resetTrigger changes
  }, [resetTrigger]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-[#A80038] bg-[#FBF9FA] rounded-xl">
      <div
        {...getRootProps()}
        className="w-full flex flex-col items-center justify-center p-6 border border-[#A80038] rounded-lg bg-[#FBF9FA] cursor-pointer hover:bg-[#FD0054]/30 transition"
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 text-[#A80038]" />
        <p className="text-[#2B2024] mt-2">Drag & Drop an image or click to browse</p>
      </div>

      {file && (
        <div className="mt-2">
          <img src={URL.createObjectURL(file)} alt="Preview" className="w-32 h-32 object-cover rounded-md border border-[#A80038]" />
          <p className="text-sm text-[#2B2024] mt-1">{file.name}</p>
        </div>
      )}
    </div>
  );
}
