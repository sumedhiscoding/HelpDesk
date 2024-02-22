import { Inter } from "next/font/google";
import "./globals.css";
import { MessageProvider } from "./contexts/MessageContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <MessageProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </MessageProvider>
  );
}
