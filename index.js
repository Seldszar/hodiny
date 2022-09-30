class Clock {
  offset = 0;

  constructor(options = {}) {
    this.fetchTime = options.fetchTime || (() => Date.now());
    this.interval = options.interval || 60000;

    this.ready = this.sync();
  }

  now() {
    return Date.now() + this.offset;
  }

  async sync() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    try {
      this.offset = await this.fetchOffset();
    } catch {}

    if (Number.isFinite(this.interval)) {
      this.timeoutId = setTimeout(() => this.sync(), this.interval);
    }
  }

  async fetchOffset() {
    return (await this.fetchTime()) - Date.now();
  }
}

module.exports = {
  Clock,
};
