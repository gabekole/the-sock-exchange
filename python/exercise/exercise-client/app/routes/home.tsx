import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to React Router Weather App!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
