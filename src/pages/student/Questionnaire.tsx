import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "sleep",
    question: "How would you rate your sleep quality over the past month?",
    options: [
      { value: "excellent", label: "Excellent - I sleep well and feel rested", score: 4 },
      { value: "good", label: "Good - Generally sleep well with minor issues", score: 3 },
      { value: "fair", label: "Fair - Some difficulty sleeping", score: 2 },
      { value: "poor", label: "Poor - Significant sleep problems", score: 1 },
    ]
  },
  {
    id: "stress",
    question: "How often have you felt overwhelmed by stress in the past month?",
    options: [
      { value: "never", label: "Never or rarely", score: 4 },
      { value: "sometimes", label: "Sometimes", score: 3 },
      { value: "often", label: "Often", score: 2 },
      { value: "always", label: "Almost always", score: 1 },
    ]
  },
  {
    id: "social",
    question: "How connected do you feel to your friends and family?",
    options: [
      { value: "very", label: "Very connected", score: 4 },
      { value: "somewhat", label: "Somewhat connected", score: 3 },
      { value: "little", label: "A little connected", score: 2 },
      { value: "not", label: "Not connected at all", score: 1 },
    ]
  },
  {
    id: "mood",
    question: "How would you describe your overall mood in the past month?",
    options: [
      { value: "positive", label: "Generally positive and optimistic", score: 4 },
      { value: "neutral", label: "Neutral, with ups and downs", score: 3 },
      { value: "low", label: "Often low or sad", score: 2 },
      { value: "very-low", label: "Consistently low, hopeless", score: 1 },
    ]
  },
  {
    id: "academic",
    question: "How is your academic performance affecting your mental health?",
    options: [
      { value: "positive", label: "Positively - I feel accomplished", score: 4 },
      { value: "neutral", label: "Neutral - No significant impact", score: 3 },
      { value: "stressful", label: "Stressful but manageable", score: 2 },
      { value: "overwhelming", label: "Very overwhelming and concerning", score: 1 },
    ]
  }
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score and determine mental health level
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
        }
      }
      maxScore += 4; // Max score per question
    });

    const percentage = (totalScore / maxScore) * 100;
    
    // Determine mental health level and action
    let level: "perfect" | "medium" | "severe";
    let action: string;
    
    if (percentage >= 80) {
      level = "perfect";
      action = "Your mental health appears to be excellent! Keep up the good practices.";
    } else if (percentage >= 60) {
      level = "medium";
      action = "We recommend connecting with a counselor for additional support.";
    } else {
      level = "severe";
      action = "We're assigning you a mental health expert and a student volunteer for additional support.";
    }

    // In a real app, this would save to backend
    localStorage.setItem('mentalHealthAssessment', JSON.stringify({
      score: percentage,
      level,
      action,
      date: new Date().toISOString()
    }));

    setIsCompleted(true);
  };

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  const getResults = () => {
    const stored = localStorage.getItem('mentalHealthAssessment');
    return stored ? JSON.parse(stored) : null;
  };

  if (isCompleted) {
    const results = getResults();
    
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="gradient-card shadow-wellness">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl">Assessment Complete</CardTitle>
              <CardDescription>
                Thank you for completing your monthly mental health check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {results?.score.toFixed(0)}%
                </div>
                <div className="text-muted-foreground">Wellness Score</div>
              </div>

              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Recommended Action:</h3>
                <p className=" text-muted-foreground">{results?.action}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="wellness" asChild>
                  <Link to="/student/dashboard">Return to Dashboard</Link>
                </Button>
                {results?.level !== "perfect" && (
                  <Button variant="outline" asChild>
                    <Link to="/student/booking">Book Counseling Session</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card className="gradient-card shadow-wellness">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            <CardDescription>
              Please select the option that best describes your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswer || ""}
              onValueChange={(value) => handleAnswer(currentQ.id, value)}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label
                    htmlFor={option.value}
                    className="text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                variant="wellness"
                onClick={handleNext}
                disabled={!currentAnswer}
              >
                {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Questionnaire;