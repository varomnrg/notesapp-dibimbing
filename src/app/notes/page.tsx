import { Flex, Text } from "@chakra-ui/react";

export default function EmptyNotePage() {
    return (
        <>
            <Flex flex="1" h="100%" justifyContent="center" alignItems="center">
                <Text fontSize="30px" fontWeight="">
                    Select a Note
                </Text>
            </Flex>
        </>
    );
}
