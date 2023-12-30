import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request, res: Response) {
    const notes = await prisma.note.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
    const { title, body } = await req.json();

    const note = await prisma.note.create({
        data: {
            title,
            body,
        },
    });

    const noteID = note.id.toString();

    return NextResponse.json({ id: noteID });
}
