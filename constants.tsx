
import { Law, Level } from './types';

export const LEVELS: Level[] = [
  { id: 1, title: "Aasaaska Gudaha", lawIds: [1, 2, 3, 4, 5, 6, 7] },
  { id: 2, title: "Dagaalka Ficilka", lawIds: [8, 9, 10, 11, 12, 13, 14] },
  { id: 3, title: "Saamaynta Bulshada", lawIds: [15, 16, 17, 18, 19, 20, 21] },
  { id: 4, title: "Xornimada Maaliyadda", lawIds: [22, 23, 24, 25, 26, 27, 28] },
  { id: 5, title: "Mastery & Legacy", lawIds: [29, 30, 31, 32, 33, 34, 35] }
];

export const SUCCESS_LAWS: Law[] = [
  // Level 1: Aasaaska Gudaha
  { id: 1, levelId: 1, title: "Isbarashada", description: "Ogow qofka aad tahay iyo waxa aad dhab ahaan u rabto.", icon: "fa-user-check", content: "Isbarashadu waa asalka kowaad ee guusha. Haddii aadan aqoon naftaada, ma garan kartid jihada saxda ah.", challenges: ["Qor 3 sifo oo aad isku taqaan.", "Weydii qof aad ku kalsoon tahay hal sifo oo aad u baahan tahay inaad horumariso."] },
  { id: 2, levelId: 1, title: "Fikirka", description: "Maskaxdaadu waa mishiinka noloshaada haga.", icon: "fa-brain", content: "Fikirkaagu wuxuu go'aamiyaa natiijadaada. Beddel fikirkaaga si aad u beddesho noloshaada.", challenges: ["Calaamadi fikir taban oo maanta kugu dhashay.", "U beddel fikirkaas mid toosan."] },
  { id: 3, levelId: 1, title: "Aragtida", description: "Hiraal fog oo kuu horseeda guul weyn.", icon: "fa-eye", content: "Aragtidu waa inaad aragto waxa aysan dadka kale arkayn inta aysan dhicin.", challenges: ["Sawiro naftaada 5 sano ka dib.", "Qor hal talaabo oo maanta kuu dhoweynaysa hiraalkaas."] },
  { id: 4, levelId: 1, title: "Mas'uuliyadda", description: "Qaado 100% mas'uuliyadda noloshaada.", icon: "fa-hand-holding-heart", content: "Ha eedeyn dadka kale. Adiga ayaa gacanta ku haya masiirkaaga.", challenges: ["Ha eedeyn cidna maanta.", "Qaado mas'uuliyadda khalad aad horay u gashay."] },
  { id: 5, levelId: 1, title: "Kalsoonida", description: "Aamin awoodahaaga iyo kartidaada.", icon: "fa-shield-heart", content: "Kalsoonidu kuma dhalato ee waa la dhisbaa. Waxay ka timaadaa ficilka joogtada ah.", challenges: ["Samee hal shay oo aad ka cabsanaysay.", "Xusuuso 3 guulood oo aad hore u gaartay."] },
  { id: 6, levelId: 1, title: "U-jeeddada", description: "Ogow sababta aad u nooshahay iyo hadafyadaada.", icon: "fa-compass", content: "Nolosha aan u-jeeddo lahayn waa sida doon bilaa shiraaq ah.", challenges: ["Qor u-jeeddada ugu weyn ee noloshaada.", "Xaqiiji in shaqada aad maanta qabanayso ay u adeegayso u-jeeddadaas."] },
  { id: 7, levelId: 1, title: "Geesinnimada", description: "U dhiirashada wax kasta oo kugu adag.", icon: "fa-fire", content: "Geesinnimadu maaha cabsi la'aan, ee waa inaad ficil samayso adigoo cabsida dareemaya.", challenges: ["Hadal markaad u baahan tahay inaad hadasho.", "Qaado go'aan dhiirran oo aad dib u dhigaysay."] },

  // Level 2: Dagaalka Ficilka
  { id: 8, levelId: 2, title: "Qiimaha", description: "Bixi qiime ka badan inta lagu siinayo.", icon: "fa-gem", content: "Qiimaha aad bixiso ayaa go'aamiya dakhligaaga. Noqo qof aan laga maarmi karin.", challenges: ["U qabo qof kale wax ka badan intii lagaa filayey.", "Aqoonso sida aad u kordhin karto qiimaha shaqadaada."] },
  { id: 9, levelId: 2, title: "Hadda (Now)", description: "Awoodda xilliga hadda la joogo.", icon: "fa-clock", content: "Dib u dhigashadu waa cadawga guusha. Bilow hadda, ha sugin berri.", challenges: ["Dhammee hawl aad muddo soo jiiday wey.", "Ha isticmaalin kalmadda 'Berri' maanta."] },
  { id: 10, levelId: 2, title: "Mudnaanta", description: "Samee waxyaabaha ugu muhiimsan marka hore.", icon: "fa-list-check", content: "Maareynta mudnaanta ayaa ka muhiimsan maareynta waqtiga.", challenges: ["Liis garee 3-da hawl ee ugu muhiimsan maanta.", "Xoogga saar hawsha koowaad ilaa ay ka dhamaato."] },
  { id: 11, levelId: 2, title: "Diiradda", description: "Hal shay xoogga saar ilaa aad ka gaarto guusha.", icon: "fa-crosshairs", content: "Diiraddu waa sirta dadka waxqabadka sare leh.", challenges: ["Bakhti ogeysiisyada inta aad shaqaynayso.", "U qoondee 90 daqiiqo shaqo qoto dheer (Deep Work)."] },
  { id: 12, levelId: 2, title: "Dadaalka", description: "Dadaal dheeraad ah oo ka baxsan caadada.", icon: "fa-hammer", content: "Ma jirto waddo gaaban oo loo maro meel kasta oo u qalanta in la tago.", challenges: ["Shaqee hal saac oo dheeraad ah maanta.", "Dhammee wax kasta oo aad bilowday."] },
  { id: 13, levelId: 2, title: "Sifaynta", description: "Si joogto ah u hagaaji waxqabadkaaga.", icon: "fa-wand-magic-sparkles", content: "Wanaaggu waa cadowga heerka sare (Excellence).", challenges: ["Ka raadi cillad yar shaqadaada oo hagaaji.", "Weydiiso qof khibrad leh feedback."] },
  { id: 14, levelId: 2, title: "Hal-abuurka", description: "U fikir si ka duwan dadka kale.", icon: "fa-lightbulb", content: "Dhibaato kasta waxay leedahay xal hal-abuur leh.", challenges: ["U hel xal cusub dhibaato caadi ah.", "Qor 10 fikradood oo cusub maanta."] },

  // Level 3: Saamaynta Bulshada
  { id: 15, levelId: 3, title: "Social Proof", description: "Dhis kalsoonida bulshada ee shaqadaada.", icon: "fa-users-viewfinder", content: "Marqaatiga dadka kale ayaa kuu fududaynaya guusha.", challenges: ["Weydiiso marqaati (Review) qof aad u adeegtay.", "La wadaag guul aad gaartay baraha bulshada."] },
  { id: 16, levelId: 3, title: "Xiriirka", description: "Networking-gu waa raasamaalka dhabta ah.", icon: "fa-people-arrows", content: "Network-gaaga ayaa go'aamiya net worth-kaaga.", challenges: ["La xiriir qof kugu cusub maanta.", "U hambalyeey qof kale guul uu gaaray."] },
  { id: 17, levelId: 3, title: "Dhageysiga", description: "Baro farshaxanka dhageysiga qoto dheer.", icon: "fa-ear-listen", content: "Haddii aad dhageysato dadka, waxay kuu sheegi doonaan waxay u baahan yihiin.", challenges: ["Dhageyso qof adigoon dhexgelin 5 daqiiqo.", "Weydiiso su'aalo qoto dheer."] },
  { id: 18, levelId: 3, title: "Gorgortanka", description: "Sidee loo helaa heshiis lagu wada guulaysto (Win-Win).", icon: "fa-handshake", content: "Gorgortanku waa xirfadda lagu helo waxaad u qalanto.", challenges: ["Isku day inaad gorgortan ka gasho qiime yar maanta.", "Raadi xal u adeegaya labada dhinacba."] },
  { id: 19, levelId: 3, title: "Hoggaaminta", description: "Dhiirigeli dadka kale inay koraan.", icon: "fa-crown", content: "Hoggaamiyuhu maaha mid amar bixiya, ee waa mid adeega.", challenges: ["Caawi qof kale si uu u gaaro hadafkiisa.", "Noqo tusaale wanaagsan oo lagu daydo maanta."] },
  { id: 20, levelId: 3, title: "Deeqsinimada", description: "Bixinta ayaa keenta barako iyo saameyn.", icon: "fa-hand-holding-medical", content: "Gacanta sare ayaa ka wanaagsan gacanta hoose.", challenges: ["Bixi sadaqo qarsoodi ah.", "Waqtigaaga ugu deeq hawl faa'iido leh."] },
  { id: 21, levelId: 3, title: "Sumcadda", description: "Dhowr magacaaga iyo ballankaaga.", icon: "fa-star", content: "Sumcaddu waxay ku dhisantaa sannado laakiin waxay ku burburtaa daqiiqado.", challenges: ["Dhowr ballan aad qaaday maanta.", "Si daacad ah u shaqee xitaa haddii aan laguu jeedin."] },

  // Level 4: Xornimada Maaliyadda
  { id: 22, levelId: 4, title: "Dakhliga", description: "Baro sida loo abuuro ilo dakhli oo badan.", icon: "fa-money-bill-wave", content: "Ha ku tiirsanaan hal il oo dakhli oo kaliya.", challenges: ["Aqoonso hal dariiqo oo aad dakhli dheeraad ah ku heli karto.", "Baro farqiga u dhexeeya dakhliga firfircoon iyo kan dadban."] },
  { id: 23, levelId: 4, title: "Badbaadinta", description: "Kaydso lacag si aad u maalgaliso berri.", icon: "fa-piggy-bank", content: "Maaha inta aad hesho, ee waa inta kuu hartay.", challenges: ["Kaydi 10% dakhligaaga maanta.", "Iska yaree kharash aan loo baahnayn."] },
  { id: 24, levelId: 4, title: "Maalgashiga", description: "Lacagtaadu ha kuu shaqeyso.", icon: "fa-chart-line", content: "Maalgashigu waa fure u ah xornimada dhaqaale.", challenges: ["Baro aasaaska suuqa saamiyada ama hantida maguurtada ah.", "Samee maalgashi yar oo kugu habboon."] },
  { id: 25, levelId: 4, title: "Is-dhufashada", description: "Ka faa'iidayso awoodda Compounding-ka.", icon: "fa-arrow-up-right-dots", content: "Compounding-ku waa mucjisada sideedaad ee adduunka.", challenges: ["Maalgaliso dib u maalgashi (Re-invest).", "Raac qaanuunka dul-saarka joogtada ah."] },
  { id: 26, levelId: 4, title: "Iibka", description: "Noqo qof wax iibin kara (Sales Skills).", icon: "fa-cart-shopping", content: "Iibku waa xirfadda kowaad ee ganacsiga.", challenges: ["Isku day inaad fikrad ka iibiso qof kale.", "Aqoonso dhibaatada macaamiishaada."] },
  { id: 27, levelId: 4, title: "Farsamada", description: "Isticmaal tignoolajiyada si aad u kordhiso miisaankaaga.", icon: "fa-gears", content: "Leverage waa sirta xawaaraha weyn.", challenges: ["Baro hal qalab (tool) oo shaqadaada fududeynaya.", "Otomaatig ka dhig hawl soo noqnoqota."] },
  { id: 28, levelId: 4, title: "Xornimada", description: "Gaar heer aadan u shaqayn lacagta.", icon: "fa-key", content: "Xornimadu waa ujeedka ugu dambeeya ee maareynta lacagta.", challenges: ["Qor inta lacag ee aad ugu baahan tahay xornimo.", "Samee qorshe aad ku gaarto heerkaas."] },

  // Level 5: Mastery & Legacy
  { id: 29, levelId: 5, title: "Joogteynta", description: "Ha quusan ilaa aad ka gaarto natiijada.", icon: "fa-repeat", content: "Biyaha dhacaya ayaa dhagaxa daloola joogteyn dhow darted.", challenges: ["Sii wad hawl aad rabtay inaad iska dhafto.", "Ha tanaasulin maanta."] },
  { id: 30, levelId: 5, title: "Barashada", description: "Noqo arday nolosha oo dhan wax baranaya.", icon: "fa-book-open", content: "Haddii aad joojiso barashada, waxaad joojisay koritaanka.", challenges: ["Akhri 10 bog oo buug ah.", "Baro cashar cusub maanta."] },
  { id: 31, levelId: 5, title: "Isbeddelka", description: "Ula qabso isbeddellada xawliga ah.", icon: "fa-clover", content: "Ma badbaado kan ugu xoogga badan, ee waxaa badbaada kan ugu isbeddelka badan.", challenges: ["Beddel hal caado oo aan ku anfacayn.", "Isku day waddo cusub oo aad shaqada u qabato."] },
  { id: 32, levelId: 5, title: "Caafimaadka", description: "Daryeel jirkaaga si uu kuu qaado.", icon: "fa-heart-pulse", content: "Caafimaadku waa taajka kuwa caafimaadka qaba oo ay arkaan kuwa bukka oo kaliya.", challenges: ["Samee 20 daqiiqo oo jimicsi ah.", "Cab biyo kugu filan."] },
  { id: 33, levelId: 5, title: "Samirka", description: "Samirku waa furaha farajka.", icon: "fa-hourglass-half", content: "Waxyaabaha waaweyn waxay qaataan waqti si ay u bislaadaan.", challenges: ["Samir u muuji qof kugu careysiiyey.", "Sugi natiijo adigoon niyad jabin."] },
  { id: 34, levelId: 5, title: "Nasashada", description: "Dib u cusboonaysii tamartaada.", icon: "fa-bed", content: "Nasashadu maaha waqti lumis, ee waa qayb ka mid ah wax-soosaarka.", challenges: ["Seexo ugu yaraan 7 saacadood.", "Samee 15 daqiiqo oo aamusnaan ah."] },
  { id: 35, levelId: 5, title: "Dhaxalka", description: "Maxaa lagugu xusuusan doonaa?", icon: "fa-monument", content: "U noolow si aad dhaxal wanaagsan uga tagto markaad baxdo.", challenges: ["Samee camal wanaagsan oo kaa dambeeya.", "Talo sii qof ka yar oo aad wax u qaban karto."] }
];
