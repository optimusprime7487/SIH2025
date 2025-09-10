import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Users, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const StudentRegister = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    student_id: "",
    phone: "",
    course: "",
    year_of_study: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("student-register", {
        body: {
          full_name: form.full_name,
          email: form.email,
          student_id: form.student_id,
          phone: form.phone,
          course: form.course,
          year_of_study: form.year_of_study ? Number(form.year_of_study) : null,
        },
      });
      if (error) throw error;
      const created = (data as any)?.data;
      if (created?.id) {
        localStorage.setItem("studentId", created.id);
        toast({ title: "Registration successful", description: "Your profile has been created." });
        navigate("/student/dashboard");
      } else {
        throw new Error("Failed to register");
      }
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message || "Please try again.", variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/student/login" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </Button>
        </div>

        <Card className="gradient-card shadow-wellness">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription>Create your profile to access support</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" value={form.full_name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_id">Student ID</Label>
                <Input id="student_id" value={form.student_id} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input id="course" value={form.course} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year_of_study">Year of Study</Label>
                <Input id="year_of_study" type="number" min={1} max={10} value={form.year_of_study} onChange={handleChange} />
              </div>

              <div className="sm:col-span-2 mt-2">
                <Button type="submit" variant="student" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegister;