export type MeatType = 'Bovina' | 'Suína' | 'Aves' | 'Peixes';

export interface Meat {
  id?: number;
  description: string;
  meatType: MeatType;
  numberAssociatedOrders?: number;
}