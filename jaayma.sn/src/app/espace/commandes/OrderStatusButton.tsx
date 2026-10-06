"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { updateOrderStatus, updatePaymentStatus } from "../../actions/order";
import type { OrderStatus, PaymentStatus } from "@/lib/orders";

const NEXT_LABEL: Record<string, string> = {
  preparing:        "Passer en préparation",
  out_for_delivery: "Expédier / En cours",
  delivered:        "Marquer comme livrée",
};

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  new:              "preparing",
  preparing:        "out_for_delivery",
  out_for_delivery: "delivered",
  delivered:        null,
  cancelled:        null,
};

export default function OrderStatusButton({
  orderId,
  currentStatus,
  currentPaymentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  currentPaymentStatus?: PaymentStatus;
}) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    currentPaymentStatus || "pending"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const nextStatus = NEXT_STATUS[status];

  async function handleAdvance() {
    if (!nextStatus) return;
    setIsLoading(true);
    const res = await updateOrderStatus(orderId, nextStatus);
    if (!res.error) {
      setStatus(nextStatus);
    }
    setIsLoading(false);
  }

  async function handleTogglePayment() {
    const nextPayment: PaymentStatus = paymentStatus === "paid" ? "pending" : "paid";
    setIsPaymentLoading(true);
    const res = await updatePaymentStatus(orderId, nextPayment);
    if (!res.error) {
      setPaymentStatus(nextPayment);
    }
    setIsPaymentLoading(false);
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Bouton Paiement */}
      {paymentStatus !== "paid" ? (
        <button
          type="button"
          onClick={handleTogglePayment}
          disabled={isPaymentLoading}
          className="w-full py-4 rounded-full font-bold text-[15px] border-[2.5px] border-ink flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 bg-sun text-ink"
          style={{ boxShadow: "4px 4px 0 #0F1E3D" }}
        >
          {isPaymentLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirmer le paiement"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleTogglePayment}
          disabled={isPaymentLoading}
          className="w-full py-4 rounded-full font-bold text-[15px] border-[2.5px] flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 bg-baobab border-baobab text-white"
        >
          {isPaymentLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Paiement validé (Annuler)"}
        </button>
      )}

      {/* Bouton Statut Suivant */}
      {nextStatus && (
        <button
          type="button"
          onClick={handleAdvance}
          disabled={isLoading}
          className="w-full py-4 rounded-full font-bold text-[15px] border-[2px] flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 bg-transparent border-white/20 text-white"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            NEXT_LABEL[nextStatus]
          )}
        </button>
      )}

      {/* Option Annuler */}
      {status !== "delivered" && status !== "cancelled" && (
        <button
          type="button"
          onClick={async () => {
            if (!confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) return;
            setIsLoading(true);
            const res = await updateOrderStatus(orderId, "cancelled");
            if (!res.error) setStatus("cancelled");
            setIsLoading(false);
          }}
          disabled={isLoading}
          className="w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 mt-2 text-hibiscus"
          style={{ backgroundColor: "rgba(200,38,90,0.08)" }}
        >
          Annuler la commande
        </button>
      )}
    </div>
  );
}
