import { describe, expect, it } from "vitest";
import { checkCredentials } from "@/lib/auth";

describe("demo admin login", () => {
  it("accepts admin / Admin@123", () => expect(checkCredentials("admin", "Admin@123")).toBe(true));
  it("rejects a wrong password", () => expect(checkCredentials("admin", "admin123")).toBe(false));
});
