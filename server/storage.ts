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
        name: "Luxury Accommodation",
        description: "Experience unparalleled luxury in our premium accommodation. Featuring elegant interiors, high-end amenities, and exceptional comfort, our rooms provide a serene retreat in the heart of the city.",
        price: 50000, // ₹50,000
        stayType: "general",
        priceUnit: "month",
        imageUrl: "/images/IMG_5120-HDR.jpg",
        amenities: ["Premium Bedding", "High-Speed WiFi", "Room Service", "24/7 Concierge", "Air Conditioning", "Smart TV"],
        featured: true
      },
      {
        name: "Premium Suite",
        description: "Our premium suites offer an exceptional stay experience with luxurious furnishings and generous space. Perfect for those seeking a refined and comfortable environment.",
        price: 50000,
        stayType: "general",
        priceUnit: "month",
        imageUrl: "/images/IMG_5123-HDR.jpg",
        amenities: ["Premium Bedding", "High-Speed WiFi", "Room Service", "24/7 Concierge", "Air Conditioning", "Smart TV"],
        featured: false
      },
      {
        name: "Deluxe Accommodation",
        description: "Unwind in our deluxe accommodation featuring tasteful décor and all the essential amenities for a comfortable stay. A perfect balance of luxury and comfort.",
        price: 50000,
        stayType: "general",
        priceUnit: "month",
        imageUrl: "/images/IMG_5135-HDR.jpg",
        amenities: ["Premium Bedding", "High-Speed WiFi", "Room Service", "Air Conditioning", "Smart TV", "Mini Fridge"],
        featured: false
      },
      {
        name: "Executive Living Space",
        description: "Our executive living spaces offer a sophisticated environment with elegant interiors and premium amenities. Perfect for discerning guests who appreciate attention to detail.",
        price: 50000,
        stayType: "general",
        priceUnit: "month",
        imageUrl: "/images/IMG_5153-HDR.jpg",
        amenities: ["Premium Bedding", "High-Speed WiFi", "Room Service", "24/7 Concierge", "Air Conditioning", "Smart TV"],
        featured: false
      },
      {
        name: "Signature Room",
        description: "Experience our signature rooms featuring tasteful décor and premium amenities. Designed with your comfort in mind, providing a peaceful retreat after a long day.",
        price: 50000,
        stayType: "general",
        priceUnit: "month",
        imageUrl: "/images/IMG_5162-HDR.jpg",
        amenities: ["Premium Bedding", "High-Speed WiFi", "Room Service", "Air Conditioning", "Smart TV", "Rainfall Shower"],
        featured: false
      },
      {
        name: "Elegant Living Space",
        description: "Immerse yourself in elegance with our beautifully appointed living spaces. Featuring high-quality furnishings and amenities, these rooms offer both comfort and style.",
        price: 50000,
        stayType: "general",
        priceUnit: "month",
        imageUrl: "/images/IMG_5165-HDR.jpg",
        amenities: ["Premium Bedding", "High-Speed WiFi", "Room Service", "Air Conditioning", "Smart TV", "Mini Bar"],
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
