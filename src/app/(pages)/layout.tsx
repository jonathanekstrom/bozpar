import Footer from "../components/navbar/footer";
import Navbar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 min-h-screen overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-auto">{children}</main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
