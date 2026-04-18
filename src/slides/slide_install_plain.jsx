import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideLink } from "@/components/SlideLink"

export default function SlideInstallPlain() {
  return (
    <section className="h-full w-full overflow-y-auto p-10 pb-20">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Nadpis */}
        <div className="space-y-2">
          <Badge variant="outline" className="uppercase tracking-widest text-xs">Instalace</Badge>
          <h1 className="text-5xl font-bold tracking-tight font-heading">Tailwind CLI</h1>
          <p className="text-xl text-muted-foreground">
            Tailwind funguje s jakýmkoliv projektem — stačí HTML soubor a npm.
          </p>
        </div>

        {/* Kroky */}
        <div className="space-y-4">

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">1. Inicializuj projekt a nainstaluj Tailwind</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">{`npm init -y
npm install tailwindcss @tailwindcss/cli`}</pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">2. Vytvoř vstupní CSS soubor</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">{`/* src/input.css */
@import "tailwindcss";`}</pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">3. Spusť Tailwind CLI — sleduje soubory a generuje výstup</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">{`npx @tailwindcss/cli -i src/input.css -o src/output.css --watch`}</pre>
              <p className="mt-3 text-sm text-muted-foreground">
                CLI sleduje HTML/JS soubory, detekuje použité třídy a generuje <code className="font-mono">output.css</code> jen s tím, co skutečně používáš.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">4. Propoj výstupní CSS s HTML</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted px-4 py-3 font-mono text-sm leading-relaxed overflow-x-auto">{`<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="src/output.css" />
  </head>
  <body>
    <h1 class="text-3xl font-bold text-blue-600">
      Ahoj!
    </h1>
  </body>
</html>`}</pre>
            </CardContent>
          </Card>

        </div>

        {/* Zdroje */}
        <div className="flex flex-wrap gap-4">
          <SlideLink href="https://tailwindcss.com/docs/installation/tailwind-cli">Instalace Tailwind CLI</SlideLink>
        </div>

      </div>
    </section>
  )
}
