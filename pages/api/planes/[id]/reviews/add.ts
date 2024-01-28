import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {ReviewType} from "@prisma/client";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "Airport ID is required" });
        if (typeof id !== "string") return res.status(400).json({ message: "Airport ID must be a string" });
        const { title, content, rating, userId } = JSON.parse(req.body);
        if (!title) return res.status(400).json({ message: "Title is required" });
        if (!content) return res.status(400).json({ message: "Content is required" });
        if (!rating) return res.status(400).json({ message: "Rating is required" });
        if (!userId) return res.status(400).json({ message: "User ID is required" });
        if (typeof title !== "string") return res.status(400).json({ message: "Title must be a string" });
        if (typeof content !== "string") return res.status(400).json({ message: "Content must be a string" });
        if (typeof rating !== "number") return res.status(400).json({ message: "Rating must be a number" });
        if (typeof userId !== "string") return res.status(400).json({ message: "User ID must be a string" });
        const review = await prisma.review.create({
            data: {
                title: title,
                content: content,
                rating: rating,
                reviewType: ReviewType.TAIL_NUMBER,
                tailNumberId: parseInt(id),
                userId: userId,
            },
        });

        return res.status(200).json(review);
    }
    else return res.status(405).json({ message: "Method not allowed" });
}

export default handle;
