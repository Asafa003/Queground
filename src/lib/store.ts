import { createClient } from "@supabase/supabase-js";
import { Order } from "@/types";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are not set");
  return createClient(url, key);
}

// Map database row to Order type
function rowToOrder(row: Record<string, unknown>): Order {
  return {
    reference: row.reference as string,
    name: row.name as string,
    email: row.email as string,
    phone: row.phone as string,
    tier: row.tier as string,
    tierName: row.tier_name as string,
    quantity: row.quantity as number,
    amount: row.amount as number,
    status: row.status as Order["status"],
    createdAt: row.created_at as string,
    confirmedAt: (row.confirmed_at as string) || undefined,
    qrCode: (row.qr_code as string) || undefined,
  };
}

export async function getOrder(reference: string): Promise<Order | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("reference", reference)
    .single();

  if (error || !data) return null;
  return rowToOrder(data);
}

export async function saveOrder(order: Order): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("orders").upsert(
    {
      reference: order.reference,
      name: order.name,
      email: order.email,
      phone: order.phone,
      tier: order.tier,
      tier_name: order.tierName,
      quantity: order.quantity,
      amount: order.amount,
      status: order.status,
      created_at: order.createdAt,
    },
    { onConflict: "reference" }
  );

  if (error) throw new Error(`Failed to save order: ${error.message}`);
}

export async function updateOrderStatus(
  reference: string,
  status: Order["status"],
  extras?: Partial<Order>
): Promise<Order | null> {
  const supabase = getSupabase();

  const updateData: Record<string, unknown> = { status };
  if (extras?.confirmedAt) updateData.confirmed_at = extras.confirmedAt;
  if (extras?.qrCode) updateData.qr_code = extras.qrCode;

  const { data, error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("reference", reference)
    .select()
    .single();

  if (error || !data) return null;
  return rowToOrder(data);
}
