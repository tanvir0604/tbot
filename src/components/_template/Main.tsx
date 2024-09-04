export default async function Main({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="pt-6 pb-6 mx-auto w-full px-4">
            { children }
        </main>
    )
}