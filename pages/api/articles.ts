import articles from "../../__mocks__/article.json";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  res.status(200).json(articles);
  // console.log(articles);
};
