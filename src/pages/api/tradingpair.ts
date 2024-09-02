import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponseDataType } from "@/lib/types";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseDataType>
) {
    res.status(200).json({ status: true, msg: 'Successfull'});
}