import Image from "next/image";
import { LatestBlog } from "./components/LatestBlog";

export default function Home() {
  return (
    <div>
      <LatestBlog />
    </div>
  );
}
