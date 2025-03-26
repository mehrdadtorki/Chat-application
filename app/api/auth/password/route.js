import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, newPassword, newPasswordConfirmation } =
    await request.json();

  const users = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (newPassword !== newPasswordConfirmation) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  if (users.rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  console.log(users);

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Save the user to the database
    const result = await pool.query(
      "UPDATE users SET password_hash = $1 WHERE username = $2 RETURNING id",
      [passwordHash, username]
    );

    return NextResponse.json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
