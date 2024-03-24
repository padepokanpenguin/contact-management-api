import { app } from "./config/app";
import { logger } from "./config/logging";

app.listen(3000, () => {
    logger.info(`Server is running on http://localhost:3000`)
})