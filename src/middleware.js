export { default } from "next-auth/middleware"; // Un seul tiret ici !

export const config = { matcher: ["/admin/:path*"] };