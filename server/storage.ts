import {
  users,
  inquiries,
  rooms,
  type User,
  type InsertUser,
  type Room,
  type InsertRoom,
  type Inquiry,
  type InsertInquiry
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Room operations
  getAllRooms(): Promise<Room[]>;
  getRoomsByStayType(stayType: string): Promise<Room[]>;
  getRoomById(id: number): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  getFeaturedRoom(): Promise<Room | undefined>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rooms: Map<number, Room>;
  private inquiries: Map<number, Inquiry>;
  private userCurrentId: number;
  private roomCurrentId: number;
  private inquiryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.rooms = new Map();
    this.inquiries = new Map();
    this.userCurrentId = 1;
    this.roomCurrentId = 1;
    this.inquiryCurrentId = 1;
    
    // Initialize with sample rooms
    this.initializeRooms();
  }

  private initializeRooms() {
    const roomData: InsertRoom[] = [
      {
        name: "Luxury Room with Kitchen",
        description: "Elegant living space with a fully equipped kitchen, perfect for extended stays. Features premium amenities and stunning views of Gurugram's Golf Course Road.",
        price: 55000, // ₹55,000
        stayType: "long",
        priceUnit: "month",
        imageUrl: "/images/room1.jpg",
        amenities: ["King Size Bed", "Full Kitchen", "Living Area", "High-Speed WiFi", "24/7 Concierge", "Room Service"],
        featured: true
      },
      {
        name: "Premium Room",
        description: "Luxurious accommodation without kitchen, perfect for short stays. Experience unparalleled comfort with premium amenities and elegant decor.",
        price: 4000, // ₹4,000
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room2.jpg",
        amenities: ["King Size Bed", "Rainfall Shower", "City View", "Mini Bar", "Room Service", "Smart TV"],
        featured: false
      },
      {
        name: "Premium Room",
        description: "Luxurious accommodation without kitchen, perfect for short stays. Experience unparalleled comfort with premium amenities and elegant decor.",
        price: 4000, // ₹4,000
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room3.jpg",
        amenities: ["King Size Bed", "Rainfall Shower", "City View", "Mini Bar", "Room Service", "Smart TV"],
        featured: false
      },
      {
        name: "Premium Room",
        description: "Luxurious accommodation without kitchen, perfect for short stays. Experience unparalleled comfort with premium amenities and elegant decor.",
        price: 4000, // ₹4,000
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room4.jpg",
        amenities: ["King Size Bed", "Rainfall Shower", "City View", "Mini Bar", "Room Service", "Smart TV"],
        featured: false
      },
      {
        name: "Premium Room",
        description: "Luxurious accommodation without kitchen, perfect for short stays. Experience unparalleled comfort with premium amenities and elegant decor.",
        price: 4000, // ₹4,000
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room5.jpg",
        amenities: ["King Size Bed", "Rainfall Shower", "City View", "Mini Bar", "Room Service", "Smart TV"],
        featured: false
      },
      {
        name: "Premium Room",
        description: "Luxurious accommodation without kitchen, perfect for short stays. Experience unparalleled comfort with premium amenities and elegant decor.",
        price: 4000, // ₹4,000
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room6.jpg",
        amenities: ["King Size Bed", "Rainfall Shower", "City View", "Mini Bar", "Room Service", "Smart TV"],
        featured: false
      }
    ];

    // Add rooms to storage
    roomData.forEach(room => {
      this.createRoom(room);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Room operations
  async getAllRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoomsByStayType(stayType: string): Promise<Room[]> {
    return Array.from(this.rooms.values()).filter(
      (room) => room.stayType === stayType
    );
  }

  async getRoomById(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const id = this.roomCurrentId++;
    const featured = insertRoom.featured !== undefined ? insertRoom.featured : false;
    const room: Room = { ...insertRoom, id, featured };
    this.rooms.set(id, room);
    return room;
  }

  async getFeaturedRoom(): Promise<Room | undefined> {
    return Array.from(this.rooms.values()).find(
      (room) => room.featured === true
    );
  }

  // Inquiry operations
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryCurrentId++;
    const inquiry: Inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
