"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma";

export async function getPlant(searchTerm?: String) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.log("Error in getPlants", error);
    throw new Error("Failed to fetch Plants");
  }
}

export async function getPlantById(id: string) {
  return await prisma.plants.findUnique({
    where: { id },
  });
}

export async function createPlant(data: Prisma.plantsCreateInput) {
  console.log("create plant");
  console.log(data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.error("Error Creating Plant", error);
    throw error;
  }
}

export async function editPlant(id: string, data: Prisma.plantsUpdateInput) {
  try {
    const currentUserId = await getUserId();
    const updatePlant = await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
  } catch (error) {
    console.error("Error updating Plant", error);
    throw error;
  }
}

export async function deletePlant(id: string) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const deletePlant = await prisma.plants.delete({
      where: { id },
    });
    revalidatePath("/plants");
    return deletePlant;
  } catch (error) {
    console.error("Error deleting plant", error);
    throw error;
  }
}
