import authRoutes  from './routes/auth';
import friendInvitationsRoutes from './routes/friendInvitations';
import createSocketServer from './socket-server';
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/friend-invitation', friendInvitationsRoutes);

const server = http.createServer(app);
createSocketServer(server);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((e: any) => {
    console.error(e);
  });
