import { asyncHandler } from "../middlewares/asyncHandler.js";
import { statsByCategory } from "../services/stats.service.js";

export const StatsController = {
  byCategory: asyncHandler(async (req, res) => {
    const user = (req as any).user;
    const { from, to, direction } = req.query as any;
    const data = await statsByCategory({
      userId: user._id,
      from,
      to,
      direction: direction === "credit" ? "credit" : "debit",
    });
    res.json(data);
  }),
};
