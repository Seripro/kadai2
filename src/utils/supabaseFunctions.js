import { supabase } from "./supabase";

export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records;
};

export const insertRecord = async (record) => {
  await supabase.from("study-record").insert(record);
};
