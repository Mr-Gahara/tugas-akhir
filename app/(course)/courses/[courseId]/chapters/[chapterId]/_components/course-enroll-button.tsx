"use client";

// Declare the 'snap' property on the Window interface for TypeScript
declare global {
  interface Window {
    snap: any;
  }
}

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      // 1. Call the checkout API endpoint we created earlier.
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      
      // 2. The response will contain the transaction token from Midtrans.
      const token = response.data.token;

      // 3. Use the token to trigger the Midtrans Snap payment window.
      // This 'snap' object is made available by the script we will add in the next step.
      window.snap.pay(token, {
        onSuccess: function(result: unknown){
          toast.success("Pembayaran berhasil!");
          // You can redirect the user or refresh the page upon success.
          window.location.reload();
        },
        onPending: function(result: unknown){
          toast("Menunggu pembayaran Anda.", { icon: "⏳" });
        },
        onError: function(result: unknown){
          toast.error("Pembayaran gagal.");
          setIsLoading(false);
        },
        onClose: function(){
          // This is called if the user closes the popup without finishing the payment.
          setIsLoading(false);
        }
      });

    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading} 
      size="lg" 
      className="w-full md:w-auto"
    >
      {isLoading ? "Memproses..." : `Beli Sekarang (${formatPrice(price)})`}
    </Button>
  );
};

export default CourseEnrollButton;
