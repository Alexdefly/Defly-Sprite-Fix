(() => {
  const realGetMonth = Date.prototype.getMonth;
  Date.prototype.getMonth = function () {
    return 6; // July (no seasonal sprites)
  };
})();
