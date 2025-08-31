import { stackServerApp } from "@/stack";
import NavbarClient from "./NavbarClient";
import { getUserDetails } from "@/actions/user.action";

export default async function NavbarServer() {
  const userInstance = await stackServerApp.getUser();

  const user = userInstance
    ? {
        id: userInstance.id,
        displayName: userInstance.displayName,
        primaryEmail: userInstance.primaryEmail,
        profileImageUrl: userInstance.profileImageUrl,
      }
    : null;
  const userProfile = user ? await getUserDetails(user.id) : null;

  const app = stackServerApp.urls || { signIn: "/signin" };

  return <NavbarClient user={user} userProfile={userProfile} app={app} />;
}
