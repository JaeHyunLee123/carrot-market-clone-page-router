import { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST" | "DELETE"

const withHandler = (method:Method, handler:(req: NextApiRequest, res: NextApiResponse)=>void) => {
  const returnFunction = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== method){
      return res.status(405).end();
    }

    try{
      await handler(req,res);
    }catch(error){
      console.log(error);
      return res.status(500).json({error});
    }
  }
  
  return returnFunction;
}

export default withHandler;