# Hodiny

> Yet another synchronizable clock

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Author](#author)
- [License](#license)

# Install

```bash
$ npm install hodiny
```

# Usage

```javascript
const { Clock } = require("hodiny");

const clock = new Clock({
  fetchTime() {
    // Fetch the current time from your source of truth...
  },
});

clock.ready.then(() => {
  console.log(clock.now());
});
```

## Author

Alexandre Breteau - [@0xSeldszar](https://twitter.com/0xSeldszar)

## License

MIT © [Alexandre Breteau](https://seldszar.fr)
