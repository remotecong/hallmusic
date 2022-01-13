const ALL = {
  2022: ["Those seeking Jehovah will lack nothing good.", "Psalm 34:10"],
};

const year = String(new Date().getFullYear());
const [excerpt, ref] = year in ALL ? ALL[year] : ALL["2022"];
export default { excerpt, ref };
