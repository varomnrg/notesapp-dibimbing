"use client";
import { Box, Text, Input, Flex, InputGroup, InputLeftElement, Stack, Spinner, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { NoteRow } from "@/components/Note/noterow";
import { useState } from "react";
import { Note } from "@/types/note";
import { useNotes } from "@/hooks/useNote";
import { usePathname } from "next/navigation";
import { stripHtmlTags } from "@/utils/html";
export function NoteList() {
    const { notes, isError, isLoading } = useNotes();
    const [search, setSearch] = useState<string>("");
    const pathname = usePathname();
    const selectedId = pathname.split("/")[2];

    if (isError) {
        return <Text>Error loading notes...</Text>;
    }

    const filteredNotes = notes?.filter((note: Note) => note.title.includes(search) || note.body.includes(search));

    return (
        <Flex w="25%" direction="column" borderRight="1px" maxH="100%">
            <Box paddingY="5" paddingX="10" h="10%">
                <InputGroup borderBottom="1px">
                    <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                        <SearchIcon boxSize={6} color="black" />
                    </InputLeftElement>
                    <Input
                        variant=""
                        placeholder="Search Notes"
                        fontSize="18px"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </InputGroup>
            </Box>
            {isLoading ? (
                <Center marginTop="10px">
                    <Flex textAlign="center" justifyContent="center" alignItems="center" direction="column">
                        <Spinner size="lg" />
                        <Text marginTop="10px">Loading Notes...</Text>
                    </Flex>
                </Center>
            ) : (
                <>
                    {!filteredNotes?.length && (
                        <Center marginTop="10px">
                            <Stack textAlign="center">
                                <Text>No notes found</Text>
                                <Text>
                                    Add a new note by clicking the{" "}
                                    <Text as="span" fontWeight="bold">
                                        +
                                    </Text>{" "}
                                    button
                                </Text>
                            </Stack>
                        </Center>
                    )}
                    <Stack overflowY="scroll" h="90%" w="100%" spacing={0}>
                        {filteredNotes?.map((note: any) => {
                            const text = stripHtmlTags(note.body);
                            note.body = text;
                            return <NoteRow key={note.id} selected={note.id == selectedId} note={note} />;
                        })}
                    </Stack>
                </>
            )}
        </Flex>
    );
}
