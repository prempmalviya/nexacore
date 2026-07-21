import Header from "../header";
import Footer from "../footer";

export default function FrontendLayout({children}: {children:React.ReactNode}) {
  return (
    <>
    <Header/> 
    <div className="flex flex-col min-h-screen"> 
    {children}
    </div>
    <Footer/>
    </>
  )
}
