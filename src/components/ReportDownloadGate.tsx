"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Check, Loader2 } from "lucide-react";
import { z } from "zod";

const REPORT_URL =
  "https://qawkanomagvilmiplyjr.supabase.co/storage/v1/object/public/reports/SIF_March_2026_Performance.pdf";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

interface ReportDownloadGateProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ReportDownloadGate = ({ onSuccess, compact = false }: ReportDownloadGateProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  // Check if already downloaded
  const alreadyDownloaded = localStorage.getItem("sifprime_report_mar26") === "true";

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = REPORT_URL;
    a.download = "SIF_March_2026_Performance.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (alreadyDownloaded) {
    return (
      <Button
        size={compact ? "sm" : "default"}
        variant="gold"
        onClick={triggerDownload}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        Download Report
      </Button>
    );
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 text-primary">
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">Downloading...</span>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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

      // Save lead via edge function (also sends email notification)
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: {
          name: "Report Download - Mar 2026",
          email: validation.data,
          phone: "N/A",
        },
      });

      if (error) {
        throw error;
      }

      // Mark as downloaded
      localStorage.setItem("sifprime_report_mar26", "true");
      setDone(true);
      triggerDownload();
      onSuccess?.();

      toast({
        title: "Report downloading!",
        description: "Check your downloads folder.",
      });
    } catch (err) {
      console.error("Report download error:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`bg-secondary border-border ${compact ? "h-9 text-sm" : "h-10"}`}
      />
      <Button
        type="submit"
        variant="gold"
        size={compact ? "sm" : "default"}
        disabled={isSubmitting}
        className="gap-2 whitespace-nowrap"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isSubmitting ? "Submitting..." : "Get Report"}
      </Button>
    </form>
  );
};

export default ReportDownloadGate;
