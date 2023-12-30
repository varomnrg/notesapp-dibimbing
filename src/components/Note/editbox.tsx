"use client";

import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type EditBoxProps = {
    value: string;
    handleValue: (value: string) => void;
};

export function EditBox({ value, handleValue }: EditBoxProps) {
    return (
        <>
            <ReactQuill className="h-full max-h-full" theme="snow" value={value} onChange={handleValue} />
        </>
    );
}
