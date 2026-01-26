import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export default function PagesLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
