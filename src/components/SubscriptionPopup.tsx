"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell, TrendingUp, Calendar, Check, X } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);

const SubscriptionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen/dismissed the popup
    const hasSeenPopup = localStorage.getItem("sifprime_subscription_popup");
    if (hasSeenPopup) return;

    // Show popup after 15 seconds to avoid impacting Core Web Vitals
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("sifprime_subscription_popup", "dismissed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate email
      const validation = emailSchema.safeParse(email);
      if (!validation.success) {
        toast({
          title: "Invalid Email",
          description: validation.error.issues[0]?.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Store in leads table with placeholder name/phone
      const { error } = await supabase.from("leads").insert({
        name: "Newsletter Subscriber",
        email: validation.data,
        phone: "N/A",
      });

      if (error) {
        // Check for duplicate email
        if (error.code === "23505") {
          toast({
            title: "Already Subscribed",
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        localStorage.setItem("sifprime_subscription_popup", "subscribed");
        toast({
          title: "Subscribed!",
          description: "You'll receive the latest SIF updates.",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Calendar, text: "New NFO Announcements" },
    { icon: TrendingUp, text: "Daily NAV Updates" },
    { icon: Bell, text: "Performance Reports" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm p-5 bg-background border-border">
        {isSubmitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-lg mb-1">You're Subscribed!</DialogTitle>
            <DialogDescription className="text-sm">
              We'll keep you updated with the latest SIF news.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-3" size="sm" variant="gold">
              Continue
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center pb-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="text-lg">Stay Updated on SIFs</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Get NFO alerts, NAV updates & performance insights.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-2 justify-center my-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs bg-secondary px-2.5 py-1.5 rounded-full">
                  <benefit.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-border h-10 text-sm"
              />
              <Button
                type="submit"
                variant="gold"
                size="sm"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe for Free"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                No spam, unsubscribe anytime
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPopup;
