import "./index.css"
import App from "./App.svelte"

const root = document.getElementById("app")

if (!root) throw new Error("Root element not found")

const app = new App({ target: root })
export default app
