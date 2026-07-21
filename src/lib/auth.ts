import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SystemRole } from  "@prisma/client";

const prisma = new PrismaClient();

export const {handlers, auth, signIn, signOut} = nextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email},
                });

                if(!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

                if(!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    systemRole: user.systemRole,
                    organizationId: user.organizationId,
                    mustChangePassword: user.mustChangePassword
                };
            },
        }),
    ],
    session: {strategy: 'jwt'},
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.systemRole = user.systemRole as SystemRole;
                token.organizationId = user.organizationId;
                token.mustChangePassword = user.mustChangePassword;
            }
            return token;
        },
        async session({session, user}) {
            if (user) {
                session.user.id = user.id;
                session.user.systemRole = user.systemRole as SystemRole;
                session.user.organizationId = user.organizationId;
                session.user.mustChangePassword = user.mustChangePassword;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});