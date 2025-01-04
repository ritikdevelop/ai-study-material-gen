import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 shadow-sm flex justify-end">
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
