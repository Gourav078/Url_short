import UserInfo from "@/components/UserInfo";
import { fetchUserByEmail } from "@/services/userServices";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("User is not authenticated");
  }

  const data = await fetchUserByEmail(session.user.email);
  if (!data?.user?._id) {
    throw new Error("User data not found");
  }

  const userId = data.user._id;

  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo id={userId} />
    </div>
  );
}
