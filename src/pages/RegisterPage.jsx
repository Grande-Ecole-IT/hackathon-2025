import AnimatedBackground from "../layout/AnimatedBackground";
import RegisterForm from "../layout/Register";

const RegisterPage = () => {
  return (
    <div className="min-h-screen text-gray-800 overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto max-w-md px-4 pt-32 pb-12">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
