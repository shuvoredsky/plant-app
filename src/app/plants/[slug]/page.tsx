import React from "react";
import PlantCard from "./PlantCard";
import { getPlantById } from "@/actions/plant.action";
import { title } from "process";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);
  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details",
  };
}

async function page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-7xl mx-auto px-4 grid grid-cols-2">
      <div className="lg:col-span-full">
        <PlantCard plant={plant}></PlantCard>
      </div>
    </div>
  );
}

export default page;
