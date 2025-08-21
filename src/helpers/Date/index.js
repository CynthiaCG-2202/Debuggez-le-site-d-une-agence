export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "Mois inconnu";
  return MONTHS[date.getMonth()] ?? "Mois inconnu";
};

