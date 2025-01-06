import React from "react";
import Link from "next/link";

export default function Rve() {
  return (
    <p className="text-center text-blue-500">
      <Link href="/rve">Resend Verification Email</Link>
    </p>
  );
}
