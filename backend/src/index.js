require('dotenv').config();
const { httpServer } = require('./server');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});