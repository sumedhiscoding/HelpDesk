import { Inter } from "next/font/google";
import "./globals.css";
import { MessageProvider } from "./contexts/MessageContext";
const inter = Inter({ subsets: ["latin"] });
import { UserProvider } from "./contexts/userContext";
export default function RootLayout({ children }) {
  return (
    <MessageProvider>
      <UserProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </UserProvider>
    </MessageProvider>
  );
}
