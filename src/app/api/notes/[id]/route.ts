import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = params?.id;

    if (!id) {
        return NextResponse.json(
            {
                error: "Missing id",
            },
            { status: 400 }
        );
    }

    const note = await prisma.note.findFirst({
        where: {
            id: parseInt(id),
        },
    });

    return NextResponse.json(note);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = params?.id;

    if (!id) {
        return NextResponse.json(
            {
                error: "Missing id",
            },
            { status: 400 }
        );
    }

    const { body } = await req.json();

    const note = await prisma.note.update({
        where: {
            id: parseInt(id),
        },
        data: {
            body,
        },
    });

    return NextResponse.json(note);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = params?.id;

    if (!id) {
        return NextResponse.json(
            {
                error: "Missing id",
            },
            { status: 400 }
        );
    }

    await prisma.note.delete({
        where: {
            id: parseInt(id),
        },
    });

    return NextResponse.json({});
}
