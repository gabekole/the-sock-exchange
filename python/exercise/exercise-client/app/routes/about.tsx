import type { Route } from "./+types/home";
import About from "../components/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AboutPage() {
  return <About />;
}
