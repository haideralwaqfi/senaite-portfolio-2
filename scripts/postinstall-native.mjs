/**
 * Links platform-specific native binaries for Tailwind CSS v4 (lightningcss + oxide).
 * Run automatically after npm install. Required when node_modules is shared between Windows and WSL.
 */
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function isMusl() {
  if (process.platform !== "linux") return false;
  try {
    const { MUSL, familySync } = require("detect-libc");
    return familySync() === MUSL;
  } catch {
    return false;
  }
}

function getPlatformTriple() {
  const parts = [process.platform, process.arch];
  if (process.platform === "linux") {
    parts.push(isMusl() ? "musl" : "gnu");
  } else if (process.platform === "win32") {
    parts.push("msvc");
  }
  return parts.join("-");
}

function copyNativeNode({ platformDir, nodeFile, destDir }) {
  if (!existsSync(platformDir)) return false;

  const src = join(platformDir, nodeFile);
  if (!existsSync(src)) {
    const found = readdirSync(platformDir).find((f) => f.endsWith(".node"));
    if (!found) return false;
    copyFileSync(join(platformDir, found), join(destDir, found));
    console.log(`[postinstall-native] Linked ${found}`);
    return true;
  }

  copyFileSync(src, join(destDir, nodeFile));
  console.log(`[postinstall-native] Linked ${nodeFile}`);
  return true;
}

function linkLightningcss() {
  const triple = getPlatformTriple();
  const pkgId = `lightningcss-${triple}`;
  const platformDir = join(root, "node_modules", pkgId);
  const destDir = join(root, "node_modules", "lightningcss");

  if (!existsSync(destDir)) return;

  const nodeFile = `lightningcss.${triple}.node`;
  if (!copyNativeNode({ platformDir, nodeFile, destDir })) {
    console.warn(`[postinstall-native] Missing ${pkgId} — run: npm run setup:wsl (in WSL) or npm install`);
  }
}

function linkTailwindOxide() {
  const triple = getPlatformTriple();
  const pkgId = `oxide-${triple}`;
  const platformDir = join(root, "node_modules", "@tailwindcss", pkgId);
  const destDir = join(root, "node_modules", "@tailwindcss", "oxide");

  if (!existsSync(destDir)) return;

  const nodeFile = `tailwindcss-oxide.${triple}.node`;
  if (!copyNativeNode({ platformDir, nodeFile, destDir })) {
    console.warn(
      `[postinstall-native] Missing @tailwindcss/${pkgId} — run: npm run setup:wsl (in WSL) or npm install`,
    );
  }
}

try {
  linkLightningcss();
  linkTailwindOxide();
} catch (err) {
  console.warn("[postinstall-native]", err instanceof Error ? err.message : err);
}
