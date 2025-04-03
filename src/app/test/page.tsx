"use client";
import FileUpload from "../vendor-profile/components/ui/FileUpload";

const test = () => {
    return (
        <FileUpload onFileSelect={(file) => console.log(file)} />
    );
};

export default test;