import axios from "axios";
import type { Orders } from "../../types";

export const getAllOrders = async (): Promise<Array<Orders>> => {
  const { data } = await axios.get("http://localhost:5000/api/v1/orders/");
  return data;
};

export const createOrders = async (order: Orders): Promise<Orders> => {
  const { data } = await axios.post("http://localhost:5000/api/v1/orders/", order);
  return data;
};

export const updateOrders = async (orderId: number, order: Orders): Promise<Orders> => {
  const { data } = await axios.put(`http://localhost:5000/api/v1/orders/${orderId}`, order);
  return data;
}

export const deleteOrders = async (id: number): Promise<boolean> => {
  await axios.delete(`http://localhost:5000/api/v1/orders/${id}`);

  return true
};