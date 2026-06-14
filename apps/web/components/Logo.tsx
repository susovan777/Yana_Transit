import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ src }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image src={src} width={200} height={200} alt="Yana Transit Logo" />
    </Link>
  );
}
