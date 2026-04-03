"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schema
const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Phone number is required").max(15, "Phone number is too long"),
});

const EarlyAccessForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    const validation = leadSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.issues[0]?.message || "Please check your inputs",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Submit via edge function
    const { data, error } = await supabase.functions.invoke('submit-lead', {
      body: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone,
      },
    });

    if (error || (data && data.error)) {
      toast({
        title: "Submission Failed",
        description: data?.error || "Unable to submit. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Welcome to SIF Prime!",
      description: "You'll be among the first to access our platform.",
    });
  };



  if (isSubmitted) {
    return (
      <section id="early-access" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center glass-card p-12">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Thanks for Connecting!
            </h2>
            <p className="text-muted-foreground text-lg">
              We will reach out to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="early-access" className="py-10 sm:py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="glass-card p-4 sm:p-8 lg:p-12 border-primary/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
              Schedule a Consultation
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center">
              Connect with our SIF experts for personalized investment guidance.
            </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                      className="bg-secondary border-border h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                      className="bg-secondary border-border h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="bg-secondary border-border h-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mt-4">
                    <Shield className="w-4 h-4" />
                    <span>Your information is secure and never shared</span>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessForm;
