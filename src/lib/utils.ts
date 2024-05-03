import { type ClassValue, clsx } from "clsx";
import { EntityError } from "@/lib/http";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { toast } from "@/components/ui/use-toast";
// import jwr from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatWalletAddress = (walletAddress: string) => {
  let first = walletAddress.slice(0, 14);
  let last = walletAddress.slice(-4);
  return first + "..." + last;
};

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast({
      title: "Error",
      description: error?.payload?.message ?? "Unknown error",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

// export const decodeJWT = <Payload = any>(token: string) => {
//   return jwt.decode(token) as Payload;
// };
