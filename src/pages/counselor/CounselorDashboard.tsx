import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserCheck, 
  Calendar, 
  Users, 
  Clock,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CounselorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'counselor') {
      navigate('/counselor/login');
    }
  }, [navigate]);

  const counselorUser = JSON.parse(localStorage.getItem('counselorUser') || '{}');

  // Mock data - in real app this would come from Supabase
  const stats = {
    assignedStudents: 24,
    todayAppointments: 6,
    pendingAssignments: 3,
    completedSessions: 142,
    avgResponseTime: "2.3 hours"
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('counselorUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-wellness-green/10 rounded-full flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-wellness-green" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Counselor Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {counselorUser.name} • {counselorUser.specialization}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assignedStudents}</div>
              <p className="text-xs text-muted-foreground">Active cases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">Scheduled appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pendingAssignments}</div>
              <p className="text-xs text-muted-foreground">New student assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedSessions}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "09:00 AM", student: "STU202401", type: "Initial Consultation", status: "confirmed" },
                  { time: "10:30 AM", student: "STU202402", type: "Follow-up Session", status: "confirmed" },
                  { time: "02:00 PM", student: "STU202403", type: "Crisis Intervention", status: "urgent" },
                  { time: "03:30 PM", student: "STU202404", type: "Regular Session", status: "confirmed" },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{appointment.time}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.student} • {appointment.type}
                      </div>
                    </div>
                    <Badge variant={appointment.status === "urgent" ? "destructive" : "default"}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Student Assignment Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                New Student Assignments
              </CardTitle>
              <CardDescription>Students assigned to your care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "STU202405", score: 45, level: "Medium", assigned: "2 hours ago" },
                  { id: "STU202406", score: 25, level: "Severe", assigned: "5 hours ago" },
                  { id: "STU202407", score: 55, level: "Medium", assigned: "1 day ago" },
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{student.id}</div>
                      <div className="text-sm text-muted-foreground">
                        Assessment Score: {student.score}% • {student.assigned}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={student.level === "Severe" ? "destructive" : "secondary"}>
                        {student.level}
                      </Badge>
                      <Button variant="wellness" size="sm">Accept</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common counselor tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Create Session Notes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View Student Progress
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Student Message
              </Button>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Overview
              </CardTitle>
              <CardDescription>Your counseling metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Response Time</span>
                <span className="font-medium">{stats.avgResponseTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Student Satisfaction</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Session Completion Rate</span>
                <span className="font-medium">87%</span>
              </div>
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CounselorDashboard;