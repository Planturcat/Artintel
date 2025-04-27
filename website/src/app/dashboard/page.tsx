import SignOut from "@/components/signout";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      data-oid="m5090.-"
    >
      <div
        className="flex flex-col items-center justify-center gap-6"
        data-oid="n_h.pw8"
      >
        <h1 className="text-lg font-medium text-center" data-oid=".4axuqn">
          Welcome to the dashboard, {user?.fullName}
        </h1>
        <div
          className="flex items-center justify-center gap-4"
          data-oid="zygx-3w"
        >
          <Link href="/" data-oid="zd:r:tt">
            <Button variant="outline" data-oid="up0ax06">
              Home
            </Button>
          </Link>
          <SignOut data-oid="wlpwdl1" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
