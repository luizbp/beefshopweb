import axios from "axios";
import type { Buyers } from "../../types";

export const getAllBuyers = async (): Promise<Array<Buyers>> => {
  const { data } = await axios.get("http://localhost:5000/api/v1/buyers/");
  return data;
};

export const createBuyers = async (buyer: Buyers): Promise<Buyers> => {
  const { data } = await axios.post("http://localhost:5000/api/v1/buyers/", buyer);
  return data;
};

export const updateBuyers = async (buyerId: number, buyer: Buyers): Promise<Buyers> => {
  const { data } = await axios.put(`http://localhost:5000/api/v1/buyers/${buyerId}`, buyer);
  return data;
}

export const deleteBuyers = async (id: number): Promise<boolean> => {
  await axios.delete(`http://localhost:5000/api/v1/buyers/${id}`);

  return true
};