function WrapperTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border-2 border-darkPrimary mt-5 overflow-hidden">
      {children}
    </div>
  );
}

export default WrapperTable;
