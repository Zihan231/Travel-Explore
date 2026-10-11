import { notFound } from "next/navigation";
import { getPlace } from "@/lib/data";
import { CheckinFlow } from "@/components/checkin-flow";

export default function CheckinPage({ params }: { params: { slug: string } }) {
  const place = getPlace(params.slug);
  if (!place) notFound();
  return <CheckinFlow place={place} />;
}
