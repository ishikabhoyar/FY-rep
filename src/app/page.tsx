import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react'; 
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8 page-background-shapes">
      <div className="animate-fadeInUp w-full">
        <Card className="w-full max-w-2xl mx-auto shadow-2xl text-center overflow-hidden border-border/50 bg-card">
          <CardHeader className="bg-card p-6 sm:p-8">
            <div className="mx-auto mb-4 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Image 
                src="https://picsum.photos/seed/1/100/100" 
                alt="DataZen Logo" 
                data-ai-hint="logo abstract" 
                className="rounded-full"
                width={100}
                height={100}
              />
            </div>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-card-foreground">
              DataZen is Recruiting FY Representative!
            </CardTitle>
            <CardDescription className="text-base sm:text-lg mt-3 text-muted-foreground px-2 sm:px-4">
              Join the official Data Science Council of Somaiya Vidyavihar University and pioneer the future of data innovation.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <p className="mb-6 sm:mb-8 text-sm sm:text-md text-card-foreground/90 leading-relaxed px-2 sm:px-0">
              We are seeking ambitious and creative minds passionate about data science, machine learning, and artificial intelligence. 
              Become an integral part of a dynamic community dedicated to learning, collaboration, and making a real-world impact.
            </p>
            <Link href="/apply" passHref>
              <Button size="lg" className="w-full max-w-md text-base sm:text-lg py-6 sm:py-7 shadow-md hover:shadow-lg transition-shadow duration-300 bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Your Application
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 sm:p-6 justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">Applications for 2025-26 are now open.</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
