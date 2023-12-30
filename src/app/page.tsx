"use client";

import { Spinner, Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

export default function Home() {
    const { data, isLoading } = useSWR("/api/notes", (url) => fetch(url).then((res) => res.json()));

    if (isLoading) {
        return (
            <Flex flex="1" h="100%" justifyContent="center" alignItems="center">
                <Spinner />
            </Flex>
        );
    }

    if (data) {
        redirect("/notes");
    }
}

