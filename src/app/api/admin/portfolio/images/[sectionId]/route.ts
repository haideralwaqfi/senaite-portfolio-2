import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sectionId: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 },
      );
    }

    const { sectionId } = await params;
    const validSections = ["medical", "industrial", "training", "shopify"];

    if (!validSections.includes(sectionId)) {
      return NextResponse.json(
        { error: "Invalid portfolio section." },
        { status: 400 },
      );
    }

    const uploadDir = join(process.cwd(), "public", "portfolio", sectionId);

    let files: string[] = [];
    try {
      files = await readdir(uploadDir);
    } catch {
      // Directory doesn't exist yet, return empty list
      files = [];
    }

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => ({
        filename: file,
        url: `/portfolio/${sectionId}/${file}`,
      }));

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 },
    );
  }
}
