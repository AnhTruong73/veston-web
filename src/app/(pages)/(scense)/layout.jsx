import HeaderHome from '@/app/layouts/home/headerMain';
import NavHome from '@/app/layouts/home/navMain';

export default function HomeLayout({ children }) {
  const origin = console.error;
  console.error = (error) => {
    if (/Loading chunk [\d]+ failed/.test(error.message)) {
      alert(
        'A new version released. Need to relaod the page to apply changes.'
      );
      window.location.reload();
    } else {
      origin(error);
    }
  };
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <NavHome />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <HeaderHome />
          <main className="flex flex-1 items-start gap-4 p-6 min-w-[1293px]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
