import { getPlant } from "@/actions/plant.action";
import InventoryTable from "@/components/ui/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

async function page() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  const plant = getPlant;

  return (
    <>
      {user ? (
        <InventoryTable plants={plants}></InventoryTable>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}

export default page;
