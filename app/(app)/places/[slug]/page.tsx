import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlace, places } from "@/lib/data";
import { PlaceDetail } from "@/components/place-detail";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const place = getPlace(params.slug);
  if (!place) return { title: "Not found" };
  return {
    title: `${place.name.en} — ${place.location.en}`,
    description: place.why.en,
    openGraph: {
      title: `${place.name.en} · Ruchi Explore Limitless`,
      description: place.why.en,
      images: [place.image],
    },
  };
}

export default function PlacePage({ params }: { params: { slug: string } }) {
  const place = getPlace(params.slug);
  if (!place) notFound();
  return <PlaceDetail place={place} />;
}
