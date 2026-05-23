import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sectionId: string }> },
) {
  try {
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
    console.error("Error fetching portfolio images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 },
    );
  }
}
