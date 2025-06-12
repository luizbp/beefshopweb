import axios from "axios";
import type { Meat } from "../../types";

export const getAllMeats = async (): Promise<Array<Meat>> => {
  const { data } = await axios.get("http://localhost:5000/api/v1/meats/");
  return data;
};

export const createMeat = async (meat: Meat): Promise<Meat> => {
  const { data } = await axios.post("http://localhost:5000/api/v1/meats/", meat);
  return data;
};

export const updateMeat = async (meatId: number, meat: Meat): Promise<Meat> => {
  const { data } = await axios.put(`http://localhost:5000/api/v1/meats/${meatId}`, meat);
  return data;
}

export const deleteMeat = async (id: number): Promise<boolean> => {
  await axios.delete(`http://localhost:5000/api/v1/meats/${id}`);

  return true
};