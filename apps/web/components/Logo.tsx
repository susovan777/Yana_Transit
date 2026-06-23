import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type LogoProps = {
  src: string | StaticImageData;
  width?: string;
  height?: string;
};

export default function Logo({ src, width, height }: LogoProps) {
  return (
    // <Link href="/" className="flex items-center gap-2.5 shrink-0">
    //   <Image
    //     src={src}
    //     quality={50}
    //     width={width}
    //     height={height}
    //     alt="YAANA Transit Logo"
    //   />
    // </Link>
    <Link href="/" className={`relative flex shrink-0 ${width} ${height}`}>
      <Image
        fill
        src={src}
        quality={50}
        loading="eager"
        alt="YAANA Transit Logo"
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw, 33vw"
      />
    </Link>
  );
}
