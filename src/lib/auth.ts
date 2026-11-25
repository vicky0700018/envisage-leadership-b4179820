// Demo-only frontend authentication. NOT production security.
export const DEMO_USER = "admin";
export const DEMO_PASS = "Admin@123";
const KEY = "envisage-admin-session";

export function checkCredentials(u: string, p: string) {
  return u.trim() === DEMO_USER && p === DEMO_PASS;
}
export function isLoggedIn() {
  return typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1";
}
export function login() { sessionStorage.setItem(KEY, "1"); }
export function logout() { sessionStorage.removeItem(KEY); }
