"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Phone number is required").max(15, "Phone number is too long"),
});

const EarlyAccessForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = leadSchema.safeParse(formData);
    if (!validation.success) {
      toast({ title: "Validation Error", description: validation.error.issues[0]?.message || "Please check your inputs", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase.functions.invoke('submit-lead', {
      body: { name: validation.data.name, email: validation.data.email, phone: validation.data.phone },
    });

    if (error || (data && data.error)) {
      toast({ title: "Submission Failed", description: data?.error || "Unable to submit. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({ title: "Welcome to SIF Prime!", description: "You'll be among the first to access our platform." });
  };

  if (isSubmitted) {
    return (
      <section id="early-access" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center rounded-2xl border border-border bg-card p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Thanks for Connecting!</h2>
            <p className="text-base text-muted-foreground">We will reach out to you as soon as possible.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="early-access" className="py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto rounded-2xl border border-border bg-card p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
            Schedule a Consultation
          </h2>
          <p className="text-base text-muted-foreground mb-8 text-center">
            Connect with our SIF experts for personalized investment guidance.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Name *</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
                className="h-12 border-border text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="h-12 border-border text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                required
                className="h-12 border-border text-base"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-3 bg-primary hover:bg-primary/90 text-white h-13 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : (<>Submit <ArrowRight className="w-4 h-4 ml-1" /></>)}
            </Button>

            <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mt-4">
              <Shield className="w-3.5 h-3.5" />
              <span>Your information is secure and never shared</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessForm;
