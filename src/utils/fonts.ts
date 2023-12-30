import { Inter, Playfair_Display, Lora } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export const fonts = {
    inter,
    playfair,
    lora,
};
