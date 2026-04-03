"use client";

import { useState } from "react";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {


  Users,
  TrendingUp,
  Award,
  Handshake,
  CheckCircle,
  Building2,
  GraduationCap,
  IndianRupee,
  Phone,
  Mail,
  MapPin,
  Send,
  Briefcase,
  Target,
  Shield
} from "lucide-react";

// Form validation schema
const distributorFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number is too long").regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
});

type DistributorFormData = z.infer<typeof distributorFormSchema>;

const benefits = [
  {
    icon: IndianRupee,
    title: "Attractive Commissions",
    description: "Earn competitive commissions on every SIF investment you facilitate",
  },
  {
    icon: GraduationCap,
    title: "Training & Support",
    description: "Comprehensive training on SIF products, regulations, and sales strategies",
  },
  {
    icon: Target,
    title: "Marketing Materials",
    description: "Access to ready-to-use marketing collaterals and presentations",
  },
  {
    icon: Shield,
    title: "Compliance Support",
    description: "Full regulatory guidance and documentation assistance",
  },
  {
    icon: Users,
    title: "Dedicated Relationship Manager",
    description: "Personal support for queries, onboarding, and client servicing",
  },
  {
    icon: TrendingUp,
    title: "Growing Market",
    description: "Tap into the emerging ₹10L+ investor segment with SEBI-regulated products",
  },
];

const requirements = [
  "AMFI/NISM certified (or willing to get certified)",
  "Existing client base of HNI/UHNI investors",
  "Understanding of equity markets and derivatives",
  "Commitment to ethical distribution practices",
  "Basic infrastructure for client servicing",
];

const BecomeDistributor = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<DistributorFormData>>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DistributorFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof DistributorFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = distributorFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof DistributorFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof DistributorFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-lead', {
        body: {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Our team will contact you within 24-48 hours.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Handshake className="w-3 h-3 mr-1" /> Partner With Us
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Become a
                <span className="text-primary block mt-2">SIF Distributor</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join India's growing network of SEBI-regulated Specialized Investment Fund distributors. 
                Partner with SIF Prime to offer your HNI clients access to sophisticated investment strategies.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">AMFI Registered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Pan-India Network</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">₹10L+ Segment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              Why Partner With SIF Prime?
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Access exclusive benefits designed to help you grow your SIF distribution business
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary/30 hover:border-t-primary">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Form Section */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Requirements */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                  Ideal Distributor Profile
                </h2>
                <p className="text-muted-foreground mb-8">
                  We're looking for passionate financial professionals who want to offer 
                  differentiated products to their discerning clientele.
                </p>

                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{req}</span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-10 p-6 bg-card rounded-xl border">
                  <h3 className="font-semibold mb-4">Have Questions? Reach Out</h3>
                  <div className="space-y-3">
                    <a href="mailto:info@sifprime.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" />
                      <span>info@sifprime.com</span>
                    </a>
                    <a href="tel:+919032999466" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>+91 90329 99466</span>
                    </a>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Pan-India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Apply to Become a Distributor
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and our partnerships team will get in touch within 24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Application Received!</h3>
                      <p className="text-muted-foreground">
                        Thank you for your interest. Our team will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                      </div>

                      <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Application
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to be contacted by our partnerships team.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeDistributor;
