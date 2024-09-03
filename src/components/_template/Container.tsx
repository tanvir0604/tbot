export default function Container({ children } : Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="min-h-screen flex flex-col">
            {children}
        </div>
    )
}