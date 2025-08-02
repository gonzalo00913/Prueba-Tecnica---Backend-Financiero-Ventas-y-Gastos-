const app = require("./src/app");
const http = require("http");
const config = require("./src/utils/config");
const logger = require("./src/utils/logger");
const sequelize = require("./src/db/db");

const server = http.createServer(app);

server.listen(config.PORT, async () => {
  try {
    await sequelize.authenticate();
    logger.info("✅ Connection to PostgreSQL successful");

    await sequelize.sync();
    logger.info("✅ Database synced successfully");

    logger.info(`✅ Server running on port ${config.PORT}`);
  } catch (error) {
    logger.error("❌ Database connection error or sync failed:", error);
  }
});