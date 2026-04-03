import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FundNav {
  id: string;
  scheme_code: string;
  scheme_name: string;
  amc_name: string | null;
  nav: number;
  nav_date: string;
  scheme_category: string | null;
  scheme_type: string | null;
}

// Featured SIF scheme codes - add actual scheme codes here
const FEATURED_SCHEME_CODES = [
  "150963", // SBI Magnum SIF
  "151217", // Quant QSIF
  "151262", // Edelweiss Altiva
  "151218", // Quant QSIF Hybrid
];

export const useFundNavs = () => {
  return useQuery({
    queryKey: ["fund-navs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fund_navs")
        .select("*")
        .in("scheme_code", FEATURED_SCHEME_CODES);

      if (error) throw error;
      return data as FundNav[];
    },
  });
};

export const useAllFundNavs = (search?: string, limit = 20) => {
  return useQuery({
    queryKey: ["all-fund-navs", search, limit],
    queryFn: async () => {
      let query = supabase
        .from("fund_navs")
        .select("*")
        .order("scheme_name", { ascending: true })
        .limit(limit);

      if (search) {
        query = query.or(`scheme_name.ilike.%${search}%,amc_name.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as FundNav[];
    },
  });
};

export const useSyncNavData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-nav-data");
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fund-navs"] });
      queryClient.invalidateQueries({ queryKey: ["all-fund-navs"] });
      toast.success(`NAV data synced: ${data.message}`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to sync NAV data: ${error.message}`);
    },
  });
};
