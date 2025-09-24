"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { YEAR_OPTIONS, PREFERENCE_OPTIONS } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").regex(/^[0-9+\s-()]+$/, "Please enter a valid phone number."),
  college: z.string().min(3, "College name must be at least 3 characters long."),
  year: z.enum(["FY"], { required_error: "Please select your year." }),
  preference1: z.string({ required_error: "Please select preference 1." }),
  preference2: z.string({ required_error: "Please select preference 2." }),
  aboutYourself: z.string().min(10, "Please tell us a bit more about yourself.").max(500, "Please keep it under 500 characters."),
  whyJoin: z.string().min(10, "Please explain why you want to join.").max(500, "Please keep it under 500 characters."),
  resumeLink: z.string().url({ message: "Please enter a valid URL for your resume." }),
}).refine(data => {
  const preferences = [data.preference1, data.preference2];
  return new Set(preferences).size === preferences.length;
}, {
  message: "Preferences must be unique.",
  path: ["preference1"], 
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function ApplicationForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      college: "",
      year: undefined,
      preference1: undefined,
      preference2: undefined,
      aboutYourself: "",
      whyJoin: "",
      resumeLink: "",
    },
  });

  const processForm: SubmitHandler<ApplicationFormData> = async (data) => {
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: "Thank you for applying. We will review your application shortly.",
          variant: "default",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description: errorData.error || "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isSubmitted) {
    return (
      <Card className="w-full max-w-xl mx-auto shadow-2xl border-border/50">
        <CardHeader className="text-center p-6 sm:p-8">
          <CheckCircle2 className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary" />
          <CardTitle className="text-2xl sm:text-3xl font-bold mt-4 text-card-foreground">Application Submitted!</CardTitle>
          <CardDescription className="text-base sm:text-lg mt-2 text-muted-foreground px-2">
            Thank you for your interest. We have received your application and will be in touch soon.
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 sm:p-6">
            <Button onClick={() => setIsSubmitted(false)} className="w-full" variant="outline">
                Submit Another Application
            </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Apply Now</h2>
          <p className="text-white/60 text-sm">All fields are required</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Full name" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Phone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Phone number" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">College</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="College name" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/30">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/90 border-white/10">
                        {YEAR_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preference1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Preference 1</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/30">
                          <SelectValue placeholder="First choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/90 border-white/10">
                        {PREFERENCE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preference2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Preference 2</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/30">
                          <SelectValue placeholder="Second choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/90 border-white/10">
                        {PREFERENCE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="resumeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-sm">Resume Link</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="Google Drive link" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="aboutYourself"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-sm">About Yourself</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whyJoin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-sm">Why Join DataZen?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What motivates you?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-12 bg-white text-black hover:bg-white/90 font-semibold transition-all duration-200" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
