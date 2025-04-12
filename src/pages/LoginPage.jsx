import AnimatedBackground from "../layout/AnimatedBackground";
import LoginForm from "../layout/Login";

const LoginPage = () => {
  return (
    <div className="min-h-screen text-gray-800 overflow-x-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto max-w-md px-4 pt-32 pb-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
