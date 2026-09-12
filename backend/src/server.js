const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server: SocketIO } = require('socket.io');
const logger = require('./utils/logger');

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (we'll add these next)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/messages', require('./routes/messages'));
// app.use('/api/users', require('./routes/users'));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Socket.IO connection
io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.id}`);
    });
});

module.exports = { app, httpServer, io };