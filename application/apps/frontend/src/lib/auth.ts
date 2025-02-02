import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function getUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const decodedToken = verify(token.value, process.env.JWT_SECRET as string);
    return decodedToken;
  } catch (error) {
    return null;
  }
}
