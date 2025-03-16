import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Get all rooms
  apiRouter.get("/rooms", async (req, res) => {
    try {
      // No longer filtering by stay type
      const rooms = await storage.getAllRooms();
      res.json(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ message: "Failed to fetch rooms" });
    }
  });

  // Get room by ID
  apiRouter.get("/rooms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid room ID" });
      }
      
      const room = await storage.getRoomById(id);
      
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      
      res.json(room);
    } catch (error) {
      console.error("Error fetching room:", error);
      res.status(500).json({ message: "Failed to fetch room" });
    }
  });

  // Get featured room
  apiRouter.get("/featured-room", async (req, res) => {
    try {
      const featuredRoom = await storage.getFeaturedRoom();
      
      if (!featuredRoom) {
        return res.status(404).json({ message: "No featured room found" });
      }
      
      res.json(featuredRoom);
    } catch (error) {
      console.error("Error fetching featured room:", error);
      res.status(500).json({ message: "Failed to fetch featured room" });
    }
  });

  // Submit inquiry
  apiRouter.post("/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid inquiry data", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
