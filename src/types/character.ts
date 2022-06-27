export const allCharacterKeys = [
  "Albedo",
  "Amber",
  "Barbara",
  "Beidou",
  "Bennett",
  "Chongyun",
  "Diluc",
  "Diona",
  "Fischl",
  "Ganyu",
  "HuTao",
  "Jean",
  "Kaeya",
  "Keqing",
  "Klee",
  "KujouSara",
  "KukiShinobu",
  "Lisa",
  "Mona",
  "Ningguang",
  "Noelle",
  "Qiqi",
  "Razor",
  "Sucrose",
  "Tartaglia",
  "Traveler",
  "RaidenShogun",
  "Venti",
  "Xiangling",
  "Xiao",
  "Xingqiu",
  "Xinyan",
  "Rosaria",
  "Yanfei",
  "Eula",
  "KaedeharaKazuha",
  "KamisatoAyaka",
  "Sayu",
  "Shenhe",
  "Yoimiya",
  "Aloy",
  "SangonomiyaKokomi",
  "Thoma",
  "Gorou",
  "AratakiItto",
  "YaeMiko",
  "YunJin",
  "Zhongli",
  "KamisatoAyato",
  "Yelan",
]

export type CharacterKey = typeof allCharacterKeys[number]

export interface ICharacter {
  key: CharacterKey //e.g. "Rosaria"
  level: number //1-90 inclusive
  constellation: number //0-6 inclusive
  ascension: number //0-6 inclusive. need to disambiguate 80/90 or 80/80
  talent: { //does not include boost from constellations. 1-15 inclusive
    auto: number
    skill: number
    burst: number
  }
}