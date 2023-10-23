const express = require("express");
const cors = require("cors");
const {connect} = require("mongoose");
const routes = require("./routes" );
const config = require("../config");
const geturl = require("./routes/geturl.routes");
const { swaggerUi, swaggerSpec } = require("./swagger/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use("/api", routes);
app.use(geturl);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const bootstrap = async () => {
  await connect(config.db_url);

  app.listen(config.port, () => {
    console.log(config.port);
  });
};

bootstrap();