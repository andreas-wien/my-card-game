import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around list-none m-0 p-0">
        <li className="mx-2">
          <Link href="/" className="text-white font-bold hover:text-orange-500">
            Home
          </Link>
        </li>
        <li className="mx-2">
          <Link
            href="/cards"
            className="text-white font-bold hover:text-orange-500"
          >
            Cards
          </Link>
        </li>
        <li className="mx-2">
          <Link
            href="/deck-builder"
            className="text-white font-bold hover:text-orange-500"
          >
            Deck Builder
          </Link>
        </li>
      </ul>
    </nav>
  );
}
