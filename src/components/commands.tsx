import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { EditorContext } from "@uiw/react-md-editor";

export function Preview() {
    const { preview, dispatch } = useContext(EditorContext);
    const click = () => {
        dispatch &&
            dispatch({
                preview: preview === "preview" ? "live" : "preview",
            });
    };

    return <Button onClick={click}>{preview === "preview" ? "Live" : "Preview"}</Button>;
}
