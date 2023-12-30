import type { Metadata } from "next";
import { fonts } from "@/utils/fonts";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar";
import { NoteList } from "@/components/Note/notelist";

export const metadata: Metadata = {
    title: "Notes App",
    description: "A Notes App for Dibimbing Case Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fonts.lora.className}>
            <body className="h-screen min-h-screen">
                <Providers>
                    <Flex w="100%" h="100%" direction="row">
                        <Sidebar />
                        <NoteList />
                        {children}
                    </Flex>
                </Providers>
            </body>
        </html>
    );
}

