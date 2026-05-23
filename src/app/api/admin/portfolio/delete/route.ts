import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { sectionId, filename } = body;

    if (!sectionId || !filename) {
      return NextResponse.json(
        { error: "Section ID and filename are required." },
        { status: 400 },
      );
    }

    const validSections = ["medical", "industrial", "training", "shopify"];
    if (!validSections.includes(sectionId)) {
      return NextResponse.json(
        { error: "Invalid portfolio section." },
        { status: 400 },
      );
    }

    // Validate filename to prevent directory traversal
    if (filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
    }

    const filepath = join(
      process.cwd(),
      "public",
      "portfolio",
      sectionId,
      filename,
    );

    await unlink(filepath);

    return NextResponse.json(
      { ok: true, message: "Image deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image." },
      { status: 500 },
    );
  }
}
