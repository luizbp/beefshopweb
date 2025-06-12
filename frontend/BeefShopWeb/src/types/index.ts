export type MeatType = 'Bovina' | 'Suína' | 'Aves' | 'Peixes';

export interface Meat {
  id?: number;
  description: string;
  meatType: MeatType;
  numberAssociatedOrders?: number;
}

export interface Buyers {
  id?: number;
  name: string;
  document: string;
  city: string;
  state: string;
  numberAssociatedOrders?: number;
}

export interface OrderItems {
  meatId: number;
  price: number;
  coin: string;
  meat?: Meat
}

export interface Orders {
  id?: number;
  orderDate: Date;
  totalValue?: number;
  buyerId: number;
  buyer?: Buyers | null,
  orderItems: OrderItems[]
}