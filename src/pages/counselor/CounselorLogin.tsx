import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserCheck, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CounselorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock authentication - in real app this would connect to Supabase
    if (email === "counselor@institute.edu" && password === "counselor123") {
      localStorage.setItem('userRole', 'counselor');
      localStorage.setItem('counselorUser', JSON.stringify({ 
        id: '2', 
        email: email, 
        name: 'MS. AMAN BALI',
        role: 'counselor',
        specialization: 'Clinical Psychology'
      }));
      navigate('/counselor/dashboard');
    } else {
      setError("Invalid counselor credentials. Use counselor@institute.edu / counselor123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <Card className="gradient-card shadow-wellness">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-wellness-green/10 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-8 h-8 text-wellness-green" />
            </div>
            <div>
              <CardTitle className="text-2xl">Institute Counselor</CardTitle>
              <CardDescription>
                Access your counseling dashboard and student management tools
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="counselor-email">Counselor Email</Label>
                <Input
                  id="counselor-email"
                  type="email"
                  placeholder="counselor@institute.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="counselor-password">Password</Label>
                <Input
                  id="counselor-password"
                  type="password"
                  placeholder="Enter counselor password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                variant="wellness"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In as Counselor"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Demo Credentials:</h4>
              <p className="text-sm text-muted-foreground">
                Email: counselor@institute.edu<br />
                Password: counselor123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounselorLogin;