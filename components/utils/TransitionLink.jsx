"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();

  const handleTransition = async (e) => {
    e.preventDefault();

    const page = document.getElementById("page-container"); // Fixed method name
    if (page) {
      page.classList.add("page-transition");
      await sleep(500);
      router.push(href);

      page.classList.remove("page-transition");
      await sleep(500);
    }
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
