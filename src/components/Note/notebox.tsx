"use client";

import { Box, Text, Flex, Button, HStack, Tooltip, useToast, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Save, Pencil, Trash } from "lucide-react";
import { EditBox } from "./editbox";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";
import { DeleteAlert } from "../alert/deletealert";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface NoteBoxProps {
    note: Note;
    saveNote: (id: string, body: string) => void;
    deleteNote: (id: string) => void;
}

export function NoteBox({ note, saveNote, deleteNote }: NoteBoxProps) {
    const toast = useToast();
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [editing, setEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(note?.body);

    if (!note) {
        return (
            <Flex flex="1" h="100%" justifyContent="center" alignItems="center">
                Select a Note
            </Flex>
        );
    }

    const handleSave = async () => {
        saveNote(note.id, value);

        toast({
            title: "Note Saved.",
            description: "Your note has been saved.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        setEditing(false);
    };

    const handleValue = (value: string) => {
        setValue(value);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleDelete = () => {
        onOpen();
    };

    const handleDeleteNote = () => {
        deleteNote(note.id);

        toast({
            title: "Note Deleted.",
            description: "Your note has been deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        router.replace(`/notes`);
    };

    return (
        <Box flex="1" h="100%" minHeight="100%">
            <Flex direction="column" h="100%">
                <Flex direction="row" w="100%" h="10%" fontSize="40px" borderBottom="1px" paddingY="5" paddingX="10" justifyContent="center" align="center">
                    <Text fontWeight="bold" flex="1" verticalAlign="center">
                        {note?.title}
                    </Text>
                    <Text fontSize="20px" marginEnd="20px">
                        {note?.createdAt &&
                            new Date(note.createdAt).toLocaleString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                    </Text>
                    <HStack>
                        {editing ? (
                            <Tooltip label="Save Note">
                                <Button bg="black" color="white" onClick={handleSave}>
                                    <Save size={24} />
                                </Button>
                            </Tooltip>
                        ) : (
                            <>
                                <Tooltip label="Delete Note">
                                    <Button bg="black" color="white" onClick={handleDelete}>
                                        <Trash />
                                    </Button>
                                </Tooltip>
                                <Tooltip label="Edit Note">
                                    <Button bg="black" color="white" onClick={handleEdit}>
                                        <Pencil />
                                    </Button>
                                </Tooltip>
                            </>
                        )}
                    </HStack>
                </Flex>
                <Box flex="1" overflow="hidden">
                    {editing ? (
                        <EditBox value={value} handleValue={handleValue} />
                    ) : (
                        <ReactQuill
                            className="py-5 px-7 text-lg"
                            value={value}
                            readOnly={true}
                            theme="bubble"
                            style={{
                                fontSize: "18px",
                            }}
                        />
                    )}
                </Box>
            </Flex>
            <DeleteAlert isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} deleteNote={handleDeleteNote} />
        </Box>
    );
}
