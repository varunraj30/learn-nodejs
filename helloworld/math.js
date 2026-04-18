function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = {
  addFn: add,
  subFn: sub,
};

exports.addA = (a, b) => a + b; // Anonymous function
