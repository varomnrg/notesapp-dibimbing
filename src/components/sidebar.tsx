"use client";
import { Box, Flex, Text, IconButton, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    return (
        <Box bg="black" maxW="60px" w="60px" p="3">
                <Flex color="white" fontSize="3xl" fontWeight="bold" justify="flex-end" h="full" flexDirection="column" alignContent="center" textAlign="center">
                    <IconButton
                        aria-label="Search database"
                        icon={<Plus />}
                        onClick={() => {
                            router.replace("/notes/new");
                        }}
                    />
                    <Spacer />
                            <Link href="/notes">
                    <Text>N</Text>
                    <Text>O</Text>
                    <Text>T</Text>
                    <Text>E</Text>
                    <Text>T</Text>
                    <Text>I</Text>
                    <Text>F</Text>
                    <Text>Y</Text>
            </Link>
                </Flex>
        </Box>
    );
}
