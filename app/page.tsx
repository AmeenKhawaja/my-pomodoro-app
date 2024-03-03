import Image from "next/image";
import Timer from "@/components/Timer";

export default function Home() {
  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <p>Welcome to ak19s Pomodoro tool</p>
      <Timer/>
    </div>
  );
}
