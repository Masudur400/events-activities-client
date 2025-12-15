import ForgotPassword from '@/components/public/auth/ForgotPassword';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import logo from '../../../../../public/images/logo.png'

const ForgetPasswordPage = () => {
    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-xl">
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <div className="space-y-2">
                                <CardTitle>Reset Your Password</CardTitle>
                                <CardDescription>
                                    Enter your email and new password to reset your account password.
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
                            <ForgotPassword></ForgotPassword>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ForgetPasswordPage;