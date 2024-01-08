import { useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import "./greet.css";

export const Greet = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  
  return (
    <div className="container">
        <h1>Welcome to Tauri!</h1>

        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <form
          className="row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <Button type="submit" variant="outline">Greet</Button>
        </form>

        <p>{greetMsg}</p>
      </div>
  )
}
