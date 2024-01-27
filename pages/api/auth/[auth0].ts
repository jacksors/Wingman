import {handleAuth, handleCallback, Session} from '@auth0/nextjs-auth0';
import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default handleAuth();