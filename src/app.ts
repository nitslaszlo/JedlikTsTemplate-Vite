﻿import http from "http";
import url from "url";
import fs from "fs";

const requestListener: http.RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->

    res.write("Egyszerű Hello World!\n");

    // Tetszőleges html teg-ek és attribútumok beépítése:
    res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");

    // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:
    let korod = parseInt(params.get("kor") as string);
    // Ha nincs "kor" paraméter megadva, vagy nem lehet számra konvertálni értékét,
    // akkor a "korod" változóba NaN érték kerül, ilyenkor legyen 18 év az értéke:
    if (isNaN(korod)) korod = 18;

    res.write(`<label>Kérem a korod: <input type=z'number' name='kor' value=${korod} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
    res.write(`Te ${korod} vagy:!\n`);

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
};

if (process.env.PORT) {
    const server = http.createServer(requestListener);
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
}

export const viteNodeApp = requestListener;
