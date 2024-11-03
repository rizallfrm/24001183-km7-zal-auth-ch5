const router = require("express").Router();
const swaggerUI = require('swagger-ui-express')
const swaggerDocumentation = require('../docs/swagger.json')

router.use("/", swaggerUI.serve);
router.use("/", swaggerUI.setup(swaggerDocumentation));
router.get("/json", (req, res) => {
    console.log("Swagger Documentation:", swaggerDocumentation);
    res.set('Cache-Control', 'no-store');
    res.json(swaggerDocumentation);
  });

module.exports = router;