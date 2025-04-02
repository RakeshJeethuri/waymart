import Navbar from "./navbar/navbar";
export default function RootLayout({ children,}: Readonly<{
  children: React.ReactNode;
}>) {
  
    return (
      <html lang="en">
        <body
          className={`antialiased h-screen` }
        >
          <Navbar/>
          {children }
        </body>
      </html>
    );
  }
  