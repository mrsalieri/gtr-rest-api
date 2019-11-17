const express = require("express");
const { queryTest } = require("../middlewares/inputHandlers");
const { queryController } = require("../utils/instances");

const router = express.Router();

/**
 * @swagger
 * /api/query/querytest:
 *   post:
 *     tags:
 *       - Query
 *     description: Test query
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startDate
 *         description: start date of the range(included) YYYY-MM-DD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: end date of the range(included) YYYY-MM-DD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: minCount
 *         description: lower bound of the count range(included)
 *         in: formData
 *         required: true
 *         type: number
 *       - name: maxCount
 *         description: upper bound of the count range(included)
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: success, returns data
 *       400:
 *         description: invalid input
 *       404:
 *         description: data not found on db
 */

router.post("/querytest", [queryTest], async (req, res) => {
  const result = await queryController.queryTest(req.body.queryTest);

  const { status, code, msg, records } = result;
  return res.status(status).send({
    code,
    msg,
    records
  });
});

module.exports = router;
