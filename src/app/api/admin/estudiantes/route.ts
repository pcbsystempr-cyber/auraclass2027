import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true, name: true, email: true, role: true,
        seccion: true, carnet: true, telefono: true,
        instagram: true, bio: true, createdAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password ?? "aura2026",
        role: body.role ?? "estudiante",
        seccion: body.seccion ?? null,
        carnet: body.carnet ?? null,
        telefono: body.telefono ?? null,
        instagram: body.instagram ?? null,
        bio: body.bio ?? null,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
