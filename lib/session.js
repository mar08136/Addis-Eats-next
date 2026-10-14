import { cookies } from "next/headers";
import crypto from "node:crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "";

const users = {
  mariam: {
    id: "user-1",
    name: "Mariamawit",
    email: "mariam@example.com",
    password: "123456",
    role: "customer",
  },
  staff: {
    id: "staff-1",
    name: "Kitchen Staff",
    email: "staff@example.com",
    password: "123456",
    role: "staff",
  },
};

function sign(value) {
  if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not configured");
  }

  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(value)
    .digest("hex");
}

function createToken(userId) {
  const signature = sign(userId);
  return `${userId}.${signature}`;
}

function verifyToken(token) {
  if (!token || !SESSION_SECRET) return null;

  const separator = token.indexOf(".");
  if (separator === -1) return null;

  const userId = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!userId || !/^[a-f0-9]{64}$/i.test(signature)) {
    return null;
  }

  const expectedSignature = sign(userId);

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  return userId;
}

export async function createSession(userId) {
  const userExists = Object.values(users).some(
    (user) => user.id === userId
  );

  if (!userExists) {
    throw new Error("Cannot create a session for an unknown user");
  }

  const cookieStore = await cookies();
  const token = createToken(userId);

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const userId = verifyToken(token);

  if (!userId) return null;

  const user = Object.values(users).find(
    (currentUser) => currentUser.id === userId
  );

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export function authenticateUser(email, password) {
  const user = Object.values(users).find(
    (currentUser) =>
      currentUser.email === email &&
      currentUser.password === password
  );

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}