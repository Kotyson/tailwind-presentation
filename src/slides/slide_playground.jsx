import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SlideLink } from "@/components/SlideLink"

export default function SlidePlayground() {
	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-6">

				{/* Nadpis */}
				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">Nástroje</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">Tailwind Playground</h1>
					<p className="text-lg text-muted-foreground max-w-2xl">
						Oficiální online editor - zkouší Tailwind hned v prohlížeči, bez instalace.
					</p>
				</div>

				{/* Karty */}
				<div className="grid grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-5 space-y-1">
							<div className="text-sm font-semibold">Co to je?</div>
							<p className="text-sm text-muted-foreground">
								Webový editor s živým náhledem. Píšeš HTML s Tailwind třídami a okamžitě vidíš výsledek - žádný build, žádná instalace.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-5 space-y-1">
							<div className="text-sm font-semibold">K čemu se hodí?</div>
							<ul className="text-sm text-muted-foreground space-y-0.5 list-disc list-inside">
								<li>Rychlé prototypování UI</li>
								<li>Zkoušení nových tříd</li>
								<li>Sdílení ukázek s týmem</li>
								<li>Ladění bez lokálního projektu</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-5 space-y-1">
							<div className="text-sm font-semibold">Jak funguje sdílení?</div>
							<p className="text-sm text-muted-foreground">
								Každá úprava se dá uložit jako unikátní URL. Stačí odkaz poslat kolegovi - otevře přesně stejný stav editoru.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Odkaz */}
				<div className="flex gap-4">
					<SlideLink href="https://play.tailwindcss.com">Otevřít Tailwind Playground</SlideLink>
				</div>

			</div>
		</section>
	)
}
