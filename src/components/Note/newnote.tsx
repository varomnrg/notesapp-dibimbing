"use client";

import { Box, Flex, Button, Tooltip, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Save } from "lucide-react";
import { EditBox } from "./editbox";
import { useNotes } from "@/hooks/useNote";
import { useRouter } from "next/navigation";

export function NewNote() {
    const router = useRouter();
    const toast = useToast();
    const [value, setValue] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const { addNote } = useNotes();

    const handleSave = async () => {
        const id = await addNote(title, value);

        toast({
            title: "Note Added.",
            description: "A new note has been added.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        router.replace(`/notes/${id}`);
    };

    const handleValue = (value: string) => {
        setValue(value);
    };
    return (
        <Box flex="1" h="100%" minHeight="100%">
            <Flex direction="column" h="100%">
                <Flex direction="row" w="100%" h="10%" fontSize="40px" paddingY="5" paddingX="10" justifyContent="space-between" align="center">
                    <Input marginRight="20px" fontWeight="bold" flex="1" verticalAlign="center" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Tooltip label="Save Note">
                        <Button bg="black" color="white" onClick={handleSave}>
                            <Save size={24} />
                        </Button>
                    </Tooltip>
                </Flex>
                <Box flex="1" overflow="hidden">
                    <EditBox value={value} handleValue={handleValue} />
                </Box>
            </Flex>
        </Box>
    );
}
