import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply global styles for the luxury experience
const style = document.createElement("style");
style.innerHTML = `
  body {
    background-color: #0A0A0A;
    color: #F5F5F5;
    font-family: 'Montserrat', sans-serif;
  }
  
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 96%;
    --card: 0 0% 12%;
    --card-foreground: 0 0% 96%;
    --popover: 0 0% 12%;
    --popover-foreground: 0 0% 96%;
    --primary: 47 64% 52%;
    --primary-foreground: 0 0% 4%;
    --secondary: 0 0% 16%;
    --secondary-foreground: 0 0% 96%;
    --muted: 0 0% 20%;
    --muted-foreground: 0 0% 80%;
    --accent: 0 0% 20%;
    --accent-foreground: 0 0% 96%;
    --destructive: 0 70% 40%;
    --destructive-foreground: 0 0% 96%;
    --border: 0 0% 16%;
    --input: 0 0% 16%;
    --ring: 47 64% 52%;
    --radius: 0.35rem;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #0A0A0A;
  }

  ::-webkit-scrollbar-thumb {
    background: #D4AF37;
    border-radius: 3px;
  }

  .gold-gradient {
    background: linear-gradient(to right, #D4AF37, #E5C158, #D4AF37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  .gold-underline {
    position: relative;
  }

  .gold-underline::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #D4AF37;
    transition: width 0.3s ease-in-out;
  }
  
  .gold-underline:hover::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
