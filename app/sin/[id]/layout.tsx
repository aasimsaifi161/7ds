import { Metadata } from "next";
import { sins } from "@/lib/sins-data";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sin = sins.find((s) => s.id === params.id);
  
  if (!sin) {
    return {
      title: "Sin Not Found | 7DS",
    };
  }

  return {
    title: `${sin.name} (${sin.latin}) - Conquer your ${sin.id} | 7DS`,
    description: sin.description,
    openGraph: {
      title: `Conquer the Sin of ${sin.name} | 7DS`,
      description: sin.description,
      images: [`/favicon.png`],
    },
  };
}

export default function SinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
