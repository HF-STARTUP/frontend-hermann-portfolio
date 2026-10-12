import type { Metadata } from "next";
import BlogContent from "./_components/BlogContent";

export const metadata: Metadata = {
    title: "Blog | Hermann FOMO",
    description:
        "Articles et retours d'expérience sur le développement frontend : React, Next.js, Flutter, DevOps.",
};

export default function BlogPage() {
    return <BlogContent />;
}
