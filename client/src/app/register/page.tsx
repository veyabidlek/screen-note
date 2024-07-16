/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZmEL1CoYFe9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#244855] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-[#D34836]">Register</h1>
          <p className="text-muted-foreground">
            <p className="inline">Already have an account? </p>
            <Link href="/login" className="inline underline" prefetch={false}>
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div>
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" placeholder="Enter your surname" required />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-1 right-1 h-7 w-7"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#D34836] text-white hover:bg-[#c03730] focus:ring-[#D34836]"
          >
            Register
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-[#D34836] text-[#D34836] hover:bg-[#D34836] hover:text-white focus:ring-[#D34836]"
          >
            <ChromeIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}