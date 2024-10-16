'use client';


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='min-h-screen m-auto pb-20 container'>
      {children}
    </section>
  );
}
