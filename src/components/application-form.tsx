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
    <Card className="w-full max-w-xl mx-auto shadow-2xl border-border/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-card-foreground">DataZen Admissions 2025-26</CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground">Please fill out the form carefully. All fields are required.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4 animate-fadeIn">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your college name" {...field} />
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
                    <FormLabel>Current Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YEAR_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                name="preference1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preference 1</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your first preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PREFERENCE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                    <FormLabel>Preference 2</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your second preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PREFERENCE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                name="aboutYourself"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about yourself</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
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
                    <FormLabel>Why do you want to join this council?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What motivates you to join DataZen?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume (Google Drive Link)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://drive.google.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-end p-0 pt-4 sm:pt-6">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
