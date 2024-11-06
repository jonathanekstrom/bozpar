import Navbar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="flex items-center justify-center p-4">{children}</main>
    </div>
  );
}
