import { median } from "simple-statistics";

Array.prototype.median = function () {
  return median(this);
};

const a = [1, 2, 3, 4];
console.log(a.median());
