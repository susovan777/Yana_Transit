import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type LogoProps = {
  src: string | StaticImageData;
  width?: number;
  height?: number;
};

export default function Logo({ src }: LogoProps) {
  return (
    // <Link href="/" className="flex items-center gap-2.5 shrink-0">
    //   <Image
    //     src={src}
    //     quality={50}
    //     width={width}
    //     height={height}
    //     alt="Yana Transit Logo"
    //   />
    // </Link>
    <Link href="/" className="relative w-[180px] h-[100px] flex shrink-0">
      <Image
        fill
        src={src}
        quality={50}
        loading="eager"
        alt="Yana Transit Logo"
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw, 33vw"
      />
    </Link>
  );
}
