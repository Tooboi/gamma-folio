// components/Wrappers/DeleteRenderButton.tsx
"use client";

import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

interface DeleteRenderButtonProps {
  id: string;
}

async function deleteRender(id: string) {
  try {
    await prisma.render.delete({ where: { id } });
    redirect("/edit");
  } catch (error) {
    console.error('Error deleting render:', error);
  }
}

export default function DeleteRenderButton({ id }: DeleteRenderButtonProps) {
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    await deleteRender(id);
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="btn mx-auto w-28 rounded-lg border-0 border-brand-600 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-rose-600 hover:bg-rose-950/80 hover:text-rose-500 xs:mx-0"
      >
        Delete
      </button>
    </form>
  );
}
