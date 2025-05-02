function AdminSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-screen px-5 md:px-20 py-10 space-y-6">
      {children}
    </section>
  );
}

export default AdminSection;
