import useSWR, { Key, mutate } from "swr";
import { Note } from "@/types/note";

const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    return res.json();
};

export const useNotes = (id?: string) => {
    const key: Key = id ? `/api/notes/${id}` : "/api/notes";

    const { data, error } = useSWR<Note | Note[]>(
        key,
        fetcher,
        {
            refreshInterval: 1000,
        }
    );

    const updateNoteBody = async (noteId: string, newBody: string) => {
        const updateEndpoint = `/api/notes/${noteId}`;

        await fetch(updateEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body: newBody }),
        });

        mutate(key);
    };

    const addNote = async (title: string, body: string) => {
        const addEndpoint = "/api/notes";

        const res = await fetch(addEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
        });

        const { id } = await res.json();

        mutate(key);

        return id;
    };

    const deleteNote = async (noteId: string) => {
        const deleteEndpoint = `/api/notes/${noteId}`;

        await fetch(deleteEndpoint, {
            method: "DELETE",
        });

        mutate(key);
    };

    return {
        note: Array.isArray(data) ? undefined : data,
        notes: Array.isArray(data) ? data : undefined,
        isLoading: !data && !error,
        isError: error,
        saveNote: updateNoteBody,
        addNote,
        deleteNote,
    };
};
