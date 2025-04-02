import Navbar from "./navbar/navbar";
export default function RootLayout({ children,}: Readonly<{
  children: React.ReactNode;
}>) {
  
    return (
     
        <div
         className={`antialiased h-screen` }
        >
          <Navbar/>
          {children }
        </div>
         
       
    );
  }
  