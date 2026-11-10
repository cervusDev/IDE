export const calculateAge = (birthDateStr: string): string => {
    if (!birthDateStr || birthDateStr.length < 10) return "";

    const [day, month, year] = birthDateStr.split("/").map(Number);
    if (!day || !month || !year) return "";

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (isNaN(birthDate.getTime())) return "";

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 0 ? age.toString() : "";
  };
