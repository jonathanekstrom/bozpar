interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto p-6">{children}</div>
    </div>
  );
};

export default AppLayout;
