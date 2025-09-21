import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, Sparkles, Database, Brain, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 lg:p-8 page-background-shapes overflow-hidden">
      <div className="animate-fadeInUp w-full relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse-subtle">
            <Sparkles className="h-4 w-4" />
            Now Recruiting
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            DataZen is Recruiting
            <span className="block text-primary mt-2">FY Representative!</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the official Data Science Council of Somaiya Vidyavihar University and pioneer the future of data innovation.
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-3xl mx-auto shadow-2xl text-center overflow-hidden border-border/50 bg-card/80 backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 sm:p-8 border-b border-border/50">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                  <Database className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Data Science</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                  <Brain className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">AI & ML</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Community</span>
              </div>
            </div>
            <CardDescription className="text-base sm:text-lg text-muted-foreground px-2 sm:px-4 leading-relaxed">
              We are seeking ambitious and creative minds passionate about data science, machine learning, and artificial intelligence. 
              Become an integral part of a dynamic community dedicated to learning, collaboration, and making a real-world impact.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 sm:p-8">
            <Link href="/apply" passHref>
              <Button size="lg" className="w-full max-w-md text-base sm:text-lg py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground group">
                Start Your Application
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </CardContent>
          
          <CardFooter className="bg-gradient-to-r from-muted/30 to-muted/50 p-4 sm:p-6 justify-center border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs sm:text-sm text-muted-foreground">Applications for 2025-26 are now open</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
