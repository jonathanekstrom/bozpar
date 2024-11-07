import Footer from "../components/navbar/footer";
import Navbar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main content wrapper */}
      <div className="flex-1 min-h-screen overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
