import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div>This is header</div>
      <ul>
        <li>
          <Link href="/">top</Link>
        </li>
        <li>
          <Link href="docs">docs</Link>
        </li>
      </ul>
    </header>
  );
}
