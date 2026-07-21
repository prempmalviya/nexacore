import {SystemRole} from "@Prisma/client";
import "next-auth";


declare module "next-auth" {
    interface User {
        systemRole: SystemRole;
        organizationId: string | null;
        mustChangePassword: boolean;
    }

    interface session {
        user: {
            id: string;
            email: string;
            systemRole: SystemRole;
            organizationId: string | null;
            mustChangePassword: boolean;
            name?: string | null;
            image?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        systemRole: SystemRole;
        organizationId: string | null;
        mustChangePassword: boolean;
    }
}