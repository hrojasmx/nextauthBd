// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";

type Data = {
  name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    // res.status(200).json({ name: "John Doe" });

    // npm cache clean --force
    // [POST request] localhost:3000/api/hello
    console.log( connectDb() );
}
