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
        name: "Deluxe King Suite",
        description: "A spacious suite with a king-sized bed, luxurious bathroom, and stunning city views.",
        price: 45000, // $450
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room1.jpg",
        amenities: ["King Bed", "Rainfall Shower", "City View", "Mini Bar", "Room Service"],
        featured: false
      },
      {
        name: "Executive Apartment",
        description: "Sophisticated apartment with a separate bedroom, full kitchen, and workspace.",
        price: 350000, // $3,500
        stayType: "long",
        priceUnit: "month",
        imageUrl: "/images/room2.jpg",
        amenities: ["King Bed", "Full Kitchen", "Workspace", "Laundry", "Concierge Service"],
        featured: false
      },
      {
        name: "Premium Double Room",
        description: "Elegant room with two queen beds, perfect for families or groups.",
        price: 38000, // $380
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room3.jpg",
        amenities: ["Two Queen Beds", "Ensuite Bathroom", "Smart TV", "Coffee Machine"],
        featured: false
      },
      {
        name: "Luxury Penthouse",
        description: "Our most exclusive offering with panoramic views, multiple bedrooms, and private terrace.",
        price: 580000, // $5,800
        stayType: "long",
        priceUnit: "month",
        imageUrl: "/images/room4.jpg",
        amenities: ["Multiple Bedrooms", "Private Terrace", "Jacuzzi", "Private Chef", "Panoramic Views"],
        featured: false
      },
      {
        name: "Signature Suite",
        description: "Spacious suite with separate living area and designer furnishings.",
        price: 52000, // $520
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/room5.jpg",
        amenities: ["King Bed", "Living Area", "Designer Furnishings", "Premium Toiletries"],
        featured: false
      },
      {
        name: "Luxury Studio",
        description: "Contemporary studio apartment with high-end finishes and efficient layout.",
        price: 280000, // $2,800
        stayType: "long",
        priceUnit: "month",
        imageUrl: "/images/room6.jpg",
        amenities: ["Queen Bed", "Kitchenette", "Designer Bathroom", "Workspace"],
        featured: false
      },
      {
        name: "Royal Penthouse Suite",
        description: "Our crown jewel, the Royal Penthouse Suite, offers an unparalleled luxury experience with panoramic views, exclusive amenities, and exceptional design. Perfect for both short stays and extended residences.",
        price: 95000, // $950
        stayType: "short",
        priceUnit: "night",
        imageUrl: "/images/featured-room.jpg",
        amenities: ["King Size Beds", "Marble Bathroom", "Living Area", "Kitchenette", "Panoramic Views", "Private Butler"],
        featured: true
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
    const room: Room = { ...insertRoom, id };
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
