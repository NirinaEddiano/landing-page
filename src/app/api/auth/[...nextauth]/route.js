// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from '../../../../lib/auth';

export default NextAuth(authOptions);
