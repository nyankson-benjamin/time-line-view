import moment from "moment";

export const currentDate = () => {
    return moment.unix(Number(new Date()) / 1000).format("YYYY-MM-DD");
  };

  export function nameToInit(name?: string): string {
    const n = name?.split(" ");
    let s = "";
    if (n) {
      for (const word of n) {
        if (word[0]) s += word[0].toUpperCase();
      }
    }
    return s.slice(0, 2);
  }

  export const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };
  
  export const intToLightRGB = (i: number) => {
    let c = (i & 0x00ffffff).toString(16).toUpperCase();
    // Ensure the color is always 6 digits
    c = "00000".substring(0, 6 - c.length) + c;
  
    // Convert to RGB and lighten the color
    let r = parseInt(c.substring(0, 2), 16);
    let g = parseInt(c.substring(2, 4), 16);
    let b = parseInt(c.substring(4, 6), 16);
  
    // Increase the brightness by blending with white
    r = Math.floor((r + 255) / 2);
    g = Math.floor((g + 255) / 2);
    b = Math.floor((b + 255) / 2);
  
    return ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase();
  };

  export const stringToColor = (name: string) => {
    const hash = hashCode(name);
    const color = intToLightRGB(hash);
    return `#${color}`;
  };

  export const getDayInfo = (dateStr: string) => {
    return [(new Date(dateStr)).getDate(), (new Date(dateStr)).toLocaleString("en-US", { weekday: "long" })];
  };

  export const isColorLight = (color:string) => {
    const r = parseInt(color?.substring(1, 2), 16);
    const g = parseInt(color?.substring(3, 2), 16);
    const b = parseInt(color?.substring(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  export const formatDate = (date: string, order = "year") => {
    if (order === "day") {
      return moment.unix(Number(date) / 1000).format("DD-MM-YYYY");
    } else {
      return moment.unix(Number(date) / 1000).format("YYYY-MM-DD");
    }
  };