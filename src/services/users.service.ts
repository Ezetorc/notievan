import { supabase } from "../configuration/supabase.configuration";

export class UsersService {
  static async getNameById(id: string): Promise<string | undefined> {
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data.name;
  }
}
