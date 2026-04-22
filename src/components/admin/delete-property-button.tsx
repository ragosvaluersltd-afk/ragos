"use client";

import { useRouter } from "next/navigation";

export function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm("Delete this property?");
    if (!confirmed) return;

    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return <button onClick={handleDelete} className="text-red-600">Delete</button>;
}
