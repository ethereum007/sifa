"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TrendingUp, BarChart3, FileText } from "lucide-react";
import ReportDownloadGate from "@/components/ReportDownloadGate";

const ReportPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("sifprime_report_popup_mar26");
    const alreadyDownloaded = localStorage.getItem("sifprime_report_mar26") === "true";
    if (hasSeen || alreadyDownloaded) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("sifprime_report_popup_mar26", "seen");
  };

  const highlights = [
    { icon: TrendingUp, text: "Fund-wise returns comparison" },
    { icon: BarChart3, text: "Category performance breakdown" },
    { icon: FileText, text: "Expert insights & analysis" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); else setIsOpen(true); }}>
      <DialogContent className="sm:max-w-md p-5 bg-background border-border">
        <DialogHeader className="text-center pb-0">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-lg">
            March 2026 SIF Performance Report
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Free download — compare returns across all SIF strategies
          </DialogDescription>
        </DialogHeader>


        <ReportDownloadGate onSuccess={handleClose} />

        <p className="text-[11px] text-muted-foreground text-center mt-1">
          No spam — just this report
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPopup;
