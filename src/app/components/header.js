import Link from "next/link";

export default function Header() {
  return (
    <div className="w-screen flex flex-row items-center p-4 bg-[#36b387]">
      <Link href="/">
        <h1 className="text-2xl font-bold text-white mr-4">DOCNOTE</h1>
      </Link>
    </div>
  );
}
