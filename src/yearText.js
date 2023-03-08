const ALL = {
  2023: ["The very essence of your word is truth.", "Psalm 119:160"],
};

const year = String(new Date().getFullYear());
const [excerpt, ref] = year in ALL ? ALL[year] : ALL["2023"];
export default { excerpt, ref };
