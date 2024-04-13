function times(length, callback) {
  return Array.from({ length }, callback);
}

class Clock extends EventTarget {
  offset = 0;

  constructor(options = {}) {
    super();

    this.fetchTime = options.fetchTime || (() => Date.now());
    this.sampleCount = options.sampleCount || 10;
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

    this.offset = await this.fetchOffset();

    this.dispatchEvent(
      new CustomEvent("offset", {
        detail: this.offset,
      }),
    );

    if (Number.isFinite(this.interval)) {
      this.timeoutId = setTimeout(() => this.sync(), this.interval);
    }
  }

  async fetchSample() {
    return [Date.now(), await this.fetchTime(), Date.now()];
  }

  async fetchOffset() {
    let result = {
      roundtrip: Number.POSITIVE_INFINITY,
      offset: 0,
    };

    const results = await Promise.allSettled(
      times(this.sampleCount, () => this.fetchSample()),
    );

    results.forEach(({ status, value }) => {
      if (status === "rejected") {
        return;
      }

      const [requestTime, serverTime, responseTime] = value;

      const roundtrip = responseTime - requestTime;
      const offset = responseTime - serverTime;

      if (roundtrip > result.roundtrip) {
        return;
      }

      result = { roundtrip, offset };
    });

    return result.offset;
  }
}

module.exports = {
  Clock,
};
