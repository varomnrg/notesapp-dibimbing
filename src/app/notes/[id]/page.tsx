"use client";
import { Spinner, Flex } from "@chakra-ui/react";
import { NoteBox } from "@/components/Note/notebox";
import { NoteList } from "@/components/Note/notelist";
import { Sidebar } from "@/components/sidebar";
import { useNotes } from "@/hooks/useNote";

type NotePageParams = {
    id: string;
};

export default function NotePage({ params }: { params: NotePageParams }) {
    const { note, isLoading, saveNote, deleteNote } = useNotes(params.id);

    if (isLoading || !note) {
        return (
            <Flex flex="1" h="100%" justifyContent="center" alignItems="center">
                <Spinner />
            </Flex>
        );
    }

    return <NoteBox note={note} saveNote={saveNote} deleteNote={deleteNote} />;
}
