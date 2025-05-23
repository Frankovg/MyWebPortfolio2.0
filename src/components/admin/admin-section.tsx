function AdminSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-screen px-5 xl:px-20 py-10 space-y-6 overflow-hidden">
      {children}
    </section>
  );
}

export default AdminSection;
