import {NextAuthConfig} from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
    }
    ,providers: [Google],
};