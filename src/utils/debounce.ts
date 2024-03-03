class Debounce {
  private lastTimer: number | null = null
  private timeout: number | null = null

  constructor(private callback: () => void) {}

  public setTimer(ms: number) {
    this.lastTimer = Date.now() + ms
    if (!this.timeout) {
      this.emitDebounce()
    }
  }

  private emitDebounce() {
    const ms = this.getTimeDiff()
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
    this.timeout = window.setTimeout(() => {
      if (this.getTimeDiff() <= 0) {
        this.finish()
        return
      }

      this.emitDebounce()
    }, ms)
  }

  private finish() {
    this.lastTimer = null
    this.timeout = null
    this.callback()
  }

  private getTimeDiff() {
    if (!this.lastTimer) return 0
    return this.lastTimer - Date.now()
  }
}

export const debounce = (callback: () => void) => new Debounce(callback)
