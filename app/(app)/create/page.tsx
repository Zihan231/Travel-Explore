import { CreateForm } from "@/components/create-form";

export default function CreatePage({ searchParams }: { searchParams: { type?: string } }) {
  return <CreateForm initial={searchParams.type === "spot" ? "spot" : "post"} />;
}
