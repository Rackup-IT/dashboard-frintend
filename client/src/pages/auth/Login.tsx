import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { auth, provider } from "@/lib/firebase";
import { apiRequest } from "@/lib/queryClient";
import { signInWithPopup } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation } from "wouter";
// import logoPath from "@assets/WhatsApp Image 2025-10-14 at 09.32.15_1761927208177.jpeg";

export default function Login() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"agent" | "dealership">("agent");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const response = await apiRequest("POST", "login", {
      email,
      password,
      type: activeTab,
      rememberMe,
    });
    if (response.success) {
      setLocation("/dashboard");
    } else {
      setError(response.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const response = await apiRequest("POST", "google-login", {
      email: result.user.email,
      name: result.user.displayName,
      idToken: idToken,
      type: "agent",
      rememberMe,
    });
    if (response.success) {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8 space-x-2">
          <span className="text-3xl font-bold">
            <span className="text-blue-600">BDC</span>
            <span className="text-blue-600"> Professionals</span>
          </span>
          {/* <img src={logoPath} alt="Logo" className="h-10 w-10 rounded-full" /> */}
        </div>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {/* Tabs */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab("agent")}
                className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === "agent"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                data-testid="tab-agent-login"
              >
                Agent Login
              </button>
              <button
                onClick={() => setActiveTab("dealership")}
                className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === "dealership"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                data-testid="tab-dealership-login"
              >
                Dealership Login
              </button>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                data-testid="input-email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10"
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                data-testid="button-toggle-password"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  data-testid="checkbox-remember-me"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              {activeTab === "agent" && (
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                  data-testid="link-forgot-password"
                >
                  Forgot Password ?
                </button>
              )}
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
              data-testid="button-login"
            >
              Login
            </Button>

            {/* Google Login - Only for Agent Login */}
            {activeTab === "agent" && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-gray-600">Login with</span>
                  <button
                    onClick={handleGoogleLogin}
                    className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    data-testid="button-google-login"
                  >
                    <FcGoogle className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
