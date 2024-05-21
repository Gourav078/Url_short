// pages/index.js

import { getServerSession } from "next-auth";
import LoginForm from "../components/LoginForm"; // Ensure the correct path to your component
import { authOptions } from "./api/auth/[...nextauth]"; // Correct path to authOptions

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Home</h1>
      {session ? (
        <p>Welcome, {session.user.name}!</p>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
