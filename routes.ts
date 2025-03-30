import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema } from "../shared/schema";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Telegraf } from "telegraf";

// Get current file path for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup file storage for uploads
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage2,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept pdf, doc, docx files
    const filetypes = /pdf|doc|docx|jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: File upload only supports PDF, Word documents, and images!"));
    }
  }
});

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  interests: z.object({
    memeSpace: z.boolean(),
    meetQ: z.boolean()
  }).refine(data => data.memeSpace || data.meetQ, {
    message: "Select at least one app",
    path: ["interests"]
  })
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Would likely store this in a database in a real application
      // For now, just return success
      
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your interest! We'll be in touch soon." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred" 
      });
    }
  });

  // Login API endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Look up the user by username
      const user = await storage.getUserByUsername(validatedData.username);
      
      // If user not found or password doesn't match
      if (!user || user.password !== validatedData.password) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      
      // In a real application, you would set up a session or JWT token here
      // For now, just return success with user data (excluding password)
      const { password, ...userData } = user;
      
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userData
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred"
      });
    }
  });

  // Registration API endpoint
  app.post('/api/register', async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists"
        });
      }
      
      // Create new user (omit confirmPassword as it's not in our schema)
      const { confirmPassword, ...userData } = validatedData;
      const newUser = await storage.createUser(userData);
      
      // Return success with user data (excluding password)
      const { password, ...newUserData } = newUser;
      
      res.status(201).json({
        success: true,
        message: "Registration successful",
        user: newUserData
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred"
      });
    }
  });

  // File upload endpoint for mood board
  app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      
      // File was successfully uploaded
      const fileInfo = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        path: `/uploads/${req.file.filename}`
      };
      
      res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        file: fileInfo
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    }
  });

  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadDir, { fallthrough: false }));
  
  // Telegram bot integration
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');
  const chatId = process.env.TELEGRAM_CHAT_ID || '';
  
  // Telegram message API endpoint
  app.post('/api/send-telegram-message', async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Message is required"
        });
      }
      
      if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) {
        return res.status(500).json({
          success: false,
          message: "Telegram configuration is missing"
        });
      }
      
      // Send message via Telegram bot
      await bot.telegram.sendMessage(chatId, message);
      
      res.status(200).json({
        success: true,
        message: "Message sent to Telegram"
      });
    } catch (error) {
      console.error("Telegram error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send Telegram message"
      });
    }
  });
  
  // Start the Telegram bot
  if (process.env.TELEGRAM_BOT_TOKEN) {
    bot.launch().then(() => {
      console.log("Telegram bot started");
    }).catch(err => {
      console.error("Failed to start Telegram bot:", err);
    });
  } else {
    console.warn("Telegram bot token not provided");
  }

  const httpServer = createServer(app);

  return httpServer;
}
