import {handleAuth, handleCallback, Session} from '@auth0/nextjs-auth0';
import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma"

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session, state: {
    [key: string]: any;
} | undefined) => {

    console.log(session.user)

    // Check if user is in the database. If not, add them.
    const customer = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    return session;
};


export default handleAuth({
    callback: handleCallback({ afterCallback: afterCallback })
});