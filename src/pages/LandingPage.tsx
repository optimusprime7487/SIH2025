import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Heart, Brain, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wellness.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-wellness-green/10 text-wellness-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Mental Health Support System
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-wellness-green bg-clip-text text-transparent">
            Your Mental Wellness
            <br />
            <span className="text-foreground">Matters</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A comprehensive digital platform providing 24/7 mental health support, 
            professional counseling, and peer connections for higher education students.
          </p>
          
          {/* Login Options */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="gradient-card border-0 shadow-wellness hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Institute Admin</CardTitle>
                <CardDescription>
                  Monitor trends, manage resources, and oversee mental health initiatives
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="admin" 
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <Link to="/admin/login">Admin Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-wellness hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-wellness-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-wellness-green" />
                </div>
                <CardTitle className="text-xl">Counselor</CardTitle>
                <CardDescription>
                  Provide professional support, manage appointments, and track student progress
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="counselor" 
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <Link to="/counselor/login">Counselor Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-wellness hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Student</CardTitle>
                <CardDescription>
                  Access mental health resources, book sessions, and connect with support
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="student" 
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <Link to="/student/login">Student Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Mental Health Support</h2>
            <p className="text-xl text-muted-foreground">
              Everything students need for their mental wellness journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Guided Support</h3>
              <p className="text-muted-foreground">
                24/7 intelligent chat support with immediate coping strategies and professional referrals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-wellness-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-wellness-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Confidential appointment scheduling with on-campus counselors and mental health experts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Peer Support</h3>
              <p className="text-muted-foreground">
                Connect with trained student volunteers and peer support communities
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;