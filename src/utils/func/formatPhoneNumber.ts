export const formatPhoneNumber = (
  number: string | null | undefined,
): string => {
  if (!number) return "N/A";
  const cleaned = number.replace(/[^\d+]/g, "");
  if (!cleaned) return "N/A";

  let indicatif = "";
  let rest = cleaned;

  if (cleaned.startsWith("+")) {
    const match = cleaned.substring(1).match(/^(\d{1,3})(\d*)$/);
    if (match) {
      indicatif = `+${match[1]}`;
      rest = match[2] || "";
    }
  } else if (cleaned.startsWith("237")) {
    indicatif = "+237";
    rest = cleaned.substring(3);
  } else if (cleaned.startsWith("225")) {
    indicatif = "+225";
    rest = cleaned.substring(3);
  } else if (cleaned.startsWith("33")) {
    indicatif = "+33";
    rest = cleaned.substring(2);
  } else {
    const match = cleaned.match(/^(\d{1,3})(\d*)$/);
    if (match) {
      indicatif = `+${match[1]}`;
      rest = match[2] || "";
    }
  }

  if (!indicatif) return cleaned || "N/A";
  const restCollé = rest.replace(/\D/g, "");
  return restCollé ? `${indicatif} ${restCollé}` : indicatif;
};
