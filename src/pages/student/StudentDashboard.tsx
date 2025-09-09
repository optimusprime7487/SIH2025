import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  AlertCircle,
  TrendingUp,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  // Mock data - in real app this would come from backend
  const mentalHealthLevel = 75; // 0-100 scale
  const nextAppointment = "Tomorrow at 2:00 PM";
  const completedQuestionnaires = 3;
  const totalQuestionnaires = 4;

  const getHealthLevelColor = (level: number) => {
    if (level >= 80) return "text-success";
    if (level >= 60) return "text-warning";
    return "text-destructive";
  };

  const getHealthLevelBadge = (level: number) => {
    if (level >= 80) return { text: "Excellent", variant: "default" as const };
    if (level >= 60) return { text: "Good", variant: "secondary" as const };
    return { text: "Needs Attention", variant: "destructive" as const };
  };

  const healthBadge = getHealthLevelBadge(mentalHealthLevel);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
              <p className="text-muted-foreground">How are you feeling today?</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={healthBadge.variant} className="px-3 py-1">
                <Heart className="w-3 h-3 mr-1" />
                {healthBadge.text}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Wellness Overview */}
        <section className="mb-8">
          <Card className="gradient-card shadow-wellness">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Mental Wellness Overview</CardTitle>
                  <CardDescription>Your current mental health status based on recent assessments</CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getHealthLevelColor(mentalHealthLevel)}`}>
                    {mentalHealthLevel}%
                  </div>
                  <div className="text-sm text-muted-foreground">Wellness Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={mentalHealthLevel} className="mb-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Questionnaires: {completedQuestionnaires}/{totalQuestionnaires}</span>
                <span>Last updated: 2 days ago</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/student/questionnaire">
            <Card className="hover:shadow-wellness transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Monthly Check-in</CardTitle>
                <CardDescription>Complete your wellness assessment</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/student/chat">
            <Card className="hover:shadow-wellness transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-wellness-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-wellness-green" />
                </div>
                <CardTitle className="text-lg">AI Support Chat</CardTitle>
                <CardDescription>Get immediate help and guidance</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/student/booking">
            <Card className="hover:shadow-wellness transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Book Session</CardTitle>
                <CardDescription>Schedule counseling appointment</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/student/resources">
            <Card className="hover:shadow-wellness transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-lg">Resources</CardTitle>
                <CardDescription>Wellness guides and materials</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </section>

        {/* Recent Activity & Upcoming */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextAppointment ? (
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">Dr. Johnson - Counseling Session</div>
                    <div className="text-sm text-muted-foreground">{nextAppointment}</div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming appointments</p>
                  <Button variant="wellness" size="sm" className="mt-2" asChild>
                    <Link to="/student/booking">Book Session</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Peer Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Support Group</div>
                    <div className="text-sm text-muted-foreground">Thursdays at 4:00 PM</div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/student/peer-support">Join Community</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Support */}
        <section className="mt-8">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-destructive" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">Need Immediate Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're experiencing a mental health crisis, reach out immediately
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm">Crisis Hotline</Button>
                  <Button variant="outline" size="sm">Emergency Chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;