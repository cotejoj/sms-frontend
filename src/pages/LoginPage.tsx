// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });

//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Login failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           Login
//         </h2>

//         {error && (
//           <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
//         )}

//         <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="you@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <label
//           className="block mb-2 font-medium text-gray-700"
//           htmlFor="password"
//         >
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
