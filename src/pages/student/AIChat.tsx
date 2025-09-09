import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Heart, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  type: "user" | "ai";
  timestamp: Date;
  category?: "coping" | "referral" | "support";
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI mental health support assistant. I'm here to provide immediate support, coping strategies, and connect you with professional help when needed. How are you feeling today?",
      type: "ai",
      timestamp: new Date(),
      category: "support"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      type: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response (in real app, this would call an AI service)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection keywords
    const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "can't go on"];
    const isCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));
    
    if (isCrisis) {
      return {
        id: Date.now().toString(),
        content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out for immediate help:\n\n• National Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 988\n• Campus Emergency: [Campus Number]\n\nWould you like me to help you connect with a counselor right now?",
        type: "ai",
        timestamp: new Date(),
        category: "referral"
      };
    }

    // Stress and anxiety responses
    if (lowerMessage.includes("stressed") || lowerMessage.includes("anxious") || lowerMessage.includes("overwhelmed")) {
      return {
        id: Date.now().toString(),
        content: "I understand you're feeling stressed. Here are some immediate coping strategies:\n\n🌬️ **Deep Breathing**: Try the 4-7-8 technique - breathe in for 4, hold for 7, exhale for 8\n\n🧘 **Grounding**: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste\n\n📝 **Brain Dump**: Write down everything on your mind for 5 minutes\n\nWould you like me to guide you through any of these techniques, or would you prefer to talk to a counselor?",
        type: "ai",
        timestamp: new Date(),
        category: "coping"
      };
    }

    // Sleep issues
    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
      return {
        id: Date.now().toString(),
        content: "Sleep issues can really impact mental health. Here are some strategies that might help:\n\n🌙 **Sleep Hygiene**:\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Create a relaxing bedtime routine\n• Keep your room cool and dark\n\n🧠 **If your mind is racing**:\n• Try progressive muscle relaxation\n• Practice gratitude - list 3 good things from today\n• Use the 'worry time' technique\n\nIf sleep problems persist, I'd recommend speaking with a counselor or healthcare provider.",
        type: "ai",
        timestamp: new Date(),
        category: "coping"
      };
    }

    // Academic stress
    if (lowerMessage.includes("exam") || lowerMessage.includes("study") || lowerMessage.includes("academic") || lowerMessage.includes("grades")) {
      return {
        id: Date.now().toString(),
        content: "Academic pressure is really common among students. Here are some strategies:\n\n📚 **Study Strategies**:\n• Break large tasks into smaller, manageable chunks\n• Use the Pomodoro Technique (25 min work, 5 min break)\n• Find a study buddy or group\n• Ask professors for clarification when needed\n\n🎯 **Managing Pressure**:\n• Remember that grades don't define your worth\n• Focus on learning, not just performance\n• Celebrate small wins along the way\n\nWould you like to explore any specific academic challenges you're facing?",
        type: "ai",
        timestamp: new Date(),
        category: "coping"
      };
    }

    // General supportive response
    return {
      id: Date.now().toString(),
      content: "Thank you for sharing that with me. It takes courage to reach out. I'm here to listen and support you.\n\nSome general wellness reminders:\n• Your feelings are valid\n• It's okay to not be okay sometimes\n• Small steps forward are still progress\n• You don't have to face this alone\n\nIs there something specific you'd like to talk about or work through together? I can provide coping strategies, or help you connect with a counselor if you'd prefer professional support.",
      type: "ai",
      timestamp: new Date(),
      category: "support"
    };
  };

  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case "coping":
        return <Badge variant="secondary" className="text-xs">Coping Strategy</Badge>;
      case "referral":
        return <Badge variant="destructive" className="text-xs">Professional Referral</Badge>;
      case "support":
        return <Badge variant="default" className="text-xs">Emotional Support</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">AI Assistant Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Header */}
      <div className="border-b bg-gradient-wellness/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-wellness-green/10 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-wellness-green" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Mental Health Support</h1>
              <p className="text-sm text-muted-foreground">
                Immediate support • Coping strategies • Professional referrals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user" 
                    ? "bg-primary/10" 
                    : "bg-wellness-green/10"
                }`}>
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-wellness-green" />
                  )}
                </div>
                <div className={`flex-1 max-w-2xl ${message.type === "user" ? "text-right" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === "ai" && getCategoryBadge(message.category)}
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-muted mr-12"
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-wellness-green/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-wellness-green" />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t bg-card/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <Input
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isTyping}
              variant="wellness"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <strong>Important:</strong> This AI assistant provides general support and coping strategies. 
                In case of emergency or crisis, please contact emergency services immediately or reach out to a mental health professional.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;