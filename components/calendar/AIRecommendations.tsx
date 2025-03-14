"use client";

import { useState } from "react";
import { AIRecommendation, Task } from "@/types/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { mockAIRecommendations } from "@/lib/calendar-data";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  onApplyRecommendation: (recommendation: AIRecommendation) => void;
  onDismissRecommendation: (recommendationId: string) => void;
}

export function AIRecommendations({ 
  recommendations, 
  onApplyRecommendation, 
  onDismissRecommendation 
}: AIRecommendationsProps) {
  const [expanded, setExpanded] = useState(true);
  
  const getRecommendationTypeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "schedule":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "subject":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getRecommendationTypeLabel = (type: string) => {
    switch (type) {
      case "task":
        return "Task Suggestion";
      case "schedule":
        return "Schedule Optimization";
      case "subject":
        return "Subject Focus";
      default:
        return type;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">AI Recommendations</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription>
          Personalized suggestions based on your study patterns
        </CardDescription>
      </CardHeader>
      
      {expanded && (
        <CardContent>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((recommendation) => (
                <div 
                  key={recommendation.id} 
                  className={cn(
                    "p-3 border rounded-lg",
                    recommendation.applied ? "bg-muted/50" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={getRecommendationTypeColor(recommendation.recommendationType)}
                        >
                          {getRecommendationTypeLabel(recommendation.recommendationType)}
                        </Badge>
                        {recommendation.applied && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Applied
                          </Badge>
                        )}
                      </div>
                      
                      <p className="font-medium">{recommendation.recommendation}</p>
                      <p className="text-sm text-muted-foreground mt-1">{recommendation.reason}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDate(new Date(recommendation.createdAt))}
                      </p>
                    </div>
                    
                    {!recommendation.applied && (
                      <div className="flex items-center gap-1 shrink-0">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-green-600"
                          onClick={() => onApplyRecommendation(recommendation)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => onDismissRecommendation(recommendation.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No recommendations available at this time.</p>
                <p className="text-sm">Check back later for personalized suggestions.</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}