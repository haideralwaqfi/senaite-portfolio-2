import type { Role } from "@prisma/client";

export function isAdminEmail(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail) return false;
  return email.toLowerCase().trim() === adminEmail;
}

export function resolveRoleForEmail(email: string, existingRole?: Role): Role {
  if (existingRole === "ADMIN") return "ADMIN";
  if (isAdminEmail(email)) return "ADMIN";
  return "USER";
}
