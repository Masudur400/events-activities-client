import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from '../../../../../public/images/logo.png'
import LoginForm from "@/components/public/auth/LoginForm";

const LoginPage = () => {
  return (

    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="space-y-2">
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </div>
              <Image
                src={logo}
                alt="logo" 
                width={70}
                height={70} 
                loading="eager"
              />
            </CardHeader>
            <CardContent>
              <LoginForm></LoginForm>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;