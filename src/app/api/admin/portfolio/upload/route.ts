import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
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

    const formData = await request.formData();
    const sectionId = formData.get("sectionId") as string;
    const files = formData.getAll("files") as File[];

    if (!sectionId || !files.length) {
      return NextResponse.json(
        { error: "Section ID and files are required." },
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

    const uploadDir = join(process.cwd(), "public", "portfolio", sectionId);

    await mkdir(uploadDir, { recursive: true });

    const savedFiles: { name: string; path: string }[] = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const filepath = join(uploadDir, filename);

      await writeFile(filepath, Buffer.from(buffer));
      savedFiles.push({
        name: file.name,
        path: `/portfolio/${sectionId}/${filename}`,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        message: `Successfully uploaded ${savedFiles.length} file(s)`,
        files: savedFiles,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files. Please try again." },
      { status: 500 },
    );
  }
}
