import { Note } from "@/types/note";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function NoteRow({ selected, note }: { selected: boolean; note: Note }) {
    const router = useRouter();

    let text = note.body;
    if (text.length > 35) text = text.substring(0, 42) + "...";

    return (
        <>
            <Box
                bg={selected ? "black" : "white"}
                paddingX="10"
                paddingY="3"
                w="100%"
                color={selected ? "white" : "black"}
                _hover={{
                    bg: selected ? "black" : "gray.800",
                    color: "white",
                }}
                onClick={() => {
                    router.push("/notes/" + note.id);
                }}
            >
                <Text fontSize="xl" fontWeight="bold">
                    {note.title}
                </Text>
                <Text textAlign="justify">{text}</Text>
            </Box>
        </>
    );
}
