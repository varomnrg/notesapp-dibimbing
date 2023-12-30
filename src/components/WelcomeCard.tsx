"use client";

import { AbsoluteCenter, Box, Center, Text } from "@chakra-ui/react";

export function WelcomeCard() {
    return (
        <Box position="relative" h="100vh">
            <AbsoluteCenter w="750px" h="300px" border="4px" borderColor="black">
                <Center>
                    <Box borderBottom="4px" w="100%" p="1">
                        <Text fontSize="4xl" align="center">
                            To-Do List
                        </Text>
                    </Box>
                </Center>
            </AbsoluteCenter>
        </Box>
    );
}
