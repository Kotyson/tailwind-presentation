import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SlideLink } from "@/components/SlideLink"

export default function SlideIntro() {
  return (
    <section className="h-full w-full grid place-items-center p-10 pb-20">
      <div className="mx-auto w-full max-w-4xl space-y-6">

        {/* Nadpis */}
        <div className="space-y-1">
          <Badge variant="outline" className="uppercase tracking-widest text-xs">Úvod</Badge>
          <h1 className="text-5xl font-bold tracking-tight font-heading">Co je Tailwind CSS?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Utility-first CSS framework - design skládáš přímo v HTML z malých, jednúčelových tříd. Žádné přepínání mezi soubory.
          </p>
        </div>

        {/* 3 karty */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-5 space-y-1">
              <div className="text-sm font-semibold">Proč se ho učit?</div>
              <p className="text-sm text-muted-foreground">
                Tailwind je dnes průmyslový standard. Najdeš ho ve Vite, Next.js, Nuxt, Astro i Laravel projektech. Zrychluje prototypování i produkci.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-1">
              <div className="text-sm font-semibold">Způsoby integrace</div>
              <ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>Vite plugin <span className="text-xs text-muted-foreground/60">(tento projekt)</span></li>
                <li>CLI <span className="text-xs text-muted-foreground/60">(bez bundleru)</span></li>
                <li>PostCSS plugin</li>
                <li>CDN <span className="text-xs text-muted-foreground/60">(jen pro prototypy)</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-1">
              <div className="text-sm font-semibold">Vite</div>
              <p className="text-sm text-muted-foreground">
                Stačí nainstalovat <code className="font-mono text-xs">tailwindcss</code> a <code className="font-mono text-xs">@tailwindcss/vite</code>, přidat plugin do <code className="font-mono text-xs">vite.config.js</code> a importovat <code className="font-mono text-xs">@import "tailwindcss"</code> v CSS.
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3 border-2 border-red-400 bg-red-50">
            <CardContent className="pt-5 space-y-1">
              <div className="text-sm font-semibold">Tailwind není UI kit ani Bootstrap</div>
              <p className="text-sm text-muted-foreground">
                Tailwind je utility-first CSS framework, což znamená, že poskytuje malé, jednúčelové třídy pro rychlé sestavování designu přímo v HTML, místo předdefinovaných komponent jako v UI kitech nebo Bootstrapu.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Odkaz */}
        <div className="flex gap-4">
          <SlideLink href="https://tailwindcss.com/docs/installation">Všechny způsoby instalace</SlideLink>
        </div>

      </div>
    </section>
  )
}

