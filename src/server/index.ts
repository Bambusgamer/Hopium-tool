import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

declare global {
    namespace Express {
        interface Request {
            db: mongoose.Connection;
        }
    }
}

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) throw new Error('Please provide MONGO_URI and PORT');

const connection = mongoose.createConnection(process.env.MONGO_URI);


const app = express();

app.set('mongo', connection);


/**
 * register routes
 */
import apiRouter from 'server/routes/api';

app.use((req, res, next) => {
    req.db = connection;

    next();
})

app.use('/api', apiRouter);

export default function startServer() {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}
