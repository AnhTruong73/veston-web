import LoginForm from '@/app/(pages)/auth/login/LoginForm';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <>
      <section className="relative w-full h-full min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            backgroundImage: "url('/img/register_bg_2.png')",
          }}
        ></div>
        <div className="w-full">
          <div className="flex items-center justify-center">
            <div className="mx-auto grid gap-6 py-36 w-1/3">
              <div className="grid gap-2  text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
