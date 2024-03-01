import { IdleIndicator } from "./components/IdleIndicator"
import { WindowTitlebar } from "./components/WindowTitlebar"
import { Pages } from "./pages/Pages"
import { cn } from "./utils/utils"

export const App = () => {
  return (
    <div className="max-h-screen h-full overflow-hidden flex flex-col">
      <WindowTitlebar>
        <img
          src="/logo.svg"
          alt="Gaming Roulette"
          className={cn(
            "transition-all ml-3 w-6 h-6 select-none pointer-events-none"
          )}
        />
        <span className="pl-3 text-muted-foreground text-sm font-bold select-none pointer-events-none">
          Gaming Roulette
        </span>
      </WindowTitlebar>
      <Pages />
      <IdleIndicator />
    </div>
  )
}
