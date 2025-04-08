import { supabase } from "@/lib/supabaseClient";

export const getOrCreateRoom = async (userA, userB) => {
  // Check if a room already exists with both users
  const { data: participantData } = await supabase
    .from("room_participants")
    .select("room_id")
    .in("user_id", [userA, userB]);

  const roomCounts = {};
  for (const row of participantData) {
    roomCounts[row.room_id] = (roomCounts[row.room_id] || 0) + 1;
  }

  const existingRoom = Object.entries(roomCounts).find(
    ([roomId, count]) => count === 2
  );
  if (existingRoom) return Number(existingRoom[0]);

  // Create a new room
  const { data: newRoom } = await supabase
    .from("rooms")
    .insert([{ name: `Room-${userA}-${userB}` }])
    .select()
    .single();

  // Add both users as participants
  await supabase.from("room_participants").insert([
    { user_id: userA, room_id: newRoom.id },
    { user_id: userB, room_id: newRoom.id },
  ]);

  return newRoom.id;
};
