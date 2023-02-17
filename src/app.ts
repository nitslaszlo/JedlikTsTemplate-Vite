import http from "http";
import url from "url";
import fs from "fs";
import Megoldás from "./Megoldás";

const requestListener: http.RequestListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  // favicon.ico kérés kiszolgálása:
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    fs.createReadStream("favicon.ico").pipe(res);
    return;
  }
  res.write("<!DOCTYPE html>");
  res.write("<html lang='hu'>");
  res.write("<head>");
  res.write("<meta charset='utf-8'>");
  res.write(
    "<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>"
  );
  res.write(
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
  );
  res.write("<title>Jedlik Ts Template</title>");
  res.write("</head>");
  res.write("<body><form><pre>");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = new url.URL(req.url as string, `http://${req.headers.host}/`)
    .searchParams;

  // Kezd a kódolást innen -->

        // 1. feladat: Olvassa be és tárolja el az utasadat.txt fájl tartalmát!
        const mo: Megoldás = new Megoldás("utasadat.txt");

        // 2. feladat: Adja meg, hogy hány utas szeretett volna felszállni a buszra!
        res.write(`2. feladat\nA buszr 6666 a ${mo.felszállókSzáma} utas akart felszállni....\n`);

        // 3. feladat: A közlekedési társaság szeretné, ha a járművőn csak az érvényes jeggyel vagy bérlettel rendelkezők utaznának.
        // Ezért a jegyeket és bérleteket a buszvezető a felszálláskor ellenőrzi.
        // (A bérlet  még  érvényes  a  lejárat  napján.)
        // Adja  meg,  hogy  hány  esetben  kellett a buszvezetőnek elutasítania az utas felszállását,
        // mert lejárt a bérlete vagy már nem volt jegye!
        res.write(`3. feladat\nA buszra ${mo.érvénytelenFelszállás} utas nem szállhatott fel.\n`);

        // 4. feladat: Adja meg, hogy melyik megállóban próbált meg felszállni a legtöbb utas!
        // (Több azonos érték esetén a legkisebb sorszámút adja meg!)
        // Megolás Map-el:
        res.write(`4. feladat (Map)\nA legtöbb utas (${mo.maxKeresMap.maxFelszálló} fő) a ${mo.maxKeresMap.maxElsőMegálló}. megállóban próbált felszállni.\n`);

        // 4. feladat: Altenatív megoldás egyszerű vektorral
        res.write(`4. feladat (Array)\nA legtöbb utas (${mo.maxKeresArray.maxFelszálló} fő) a ${mo.maxKeresArray.maxElsőMegálló}. megállóban próbált felszállni.\n`);

        // 5. feladat: A közlekedési társaságnak kimutatást kell készítenie, hogy hányszor utaztak valamilyen kedvezménnyel a járművön.
        // Határozza meg, hogy hány kedvezményes és hány ingyenes utazó szállt fel a buszra!
        // (Csak az érvényes bérlettel rendelkező szállhatott fel a buszra!)
        res.write(`5. feladat\nIngyenesen utazók száma: ${mo.ingyenesenUtazók} fő\n`);
        res.write(`A kedvezményesen utazók száma: ${mo.kedvezményesenUtazók} fő\n`);

        // 7. feladat: A közlekedési társaság azoknak az utasoknak, akiknek még érvényes, de 3 napon belül lejár a bérlete,
        // figyelmeztetést szeretne küldeni e-mailben.
        // (Például, ha a felszállás időpontja 2019. február 5., és a bérlet érvényessége 2019. február 8., akkor már kap az utas levelet,
        // ha 2019. február 9. az érvényessége, akkor még nem kap levelet.)
        // Válogassa ki és írja a figyelmeztetes.txt  állományba  ezen  utasok  kártyaazonosítóját  és  a  bérlet érvényességi idejét
        // (éééé-hh-nn formátumban) szóközzel elválasztva!
        mo.figyelmeztetéseketÁllománybaÍr("figyelmeztetes.txt");

        // Nem a feladat (megoldás) része :
        res.write("\n\n<u>GitHub repository:</u> ");
        res.write("<a href='https://github.com/nitslaszlo/TypeScript_Erettsegi/' target='_blank'>GitHub</a><br>");

        res.write("\n\n<u>A figyelmeztetes.txt fájl:</u>\n");
        fs.readFileSync("figyelmeztetes.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        res.write("\n\n<u>A forrás utasadat.txt fájl:</u>\n");
        fs.readFileSync("utasadat.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        // <---- Fejezdbe a kódolást

  res.write("</pre></form></body></html>");
  res.end();
};

// if (import.meta.env.PROD) {
//   const server = http.createServer(requestListener);
//   server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
//   });
// }

export const viteNodeApp = requestListener;
