import { promises as fs } from "fs";
import path from "path";
import { Order } from "@/types";

const STORE_PATH = path.join(process.cwd(), "data", "orders.json");

async function ensureStore(): Promise<void> {
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify([], null, 2));
  }
}

export async function getOrders(): Promise<Order[]> {
  await ensureStore();
  const data = await fs.readFile(STORE_PATH, "utf-8");
  return JSON.parse(data);
}

export async function getOrder(reference: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find((o) => o.reference === reference) || null;
}

export async function saveOrder(order: Order): Promise<void> {
  const orders = await getOrders();
  const existingIndex = orders.findIndex((o) => o.reference === order.reference);

  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }

  await fs.writeFile(STORE_PATH, JSON.stringify(orders, null, 2));
}

export async function updateOrderStatus(
  reference: string,
  status: Order["status"],
  extras?: Partial<Order>
): Promise<Order | null> {
  const orders = await getOrders();
  const order = orders.find((o) => o.reference === reference);

  if (!order) return null;

  order.status = status;
  if (extras) Object.assign(order, extras);

  await fs.writeFile(STORE_PATH, JSON.stringify(orders, null, 2));
  return order;
}
