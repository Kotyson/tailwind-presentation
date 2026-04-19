import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function Code({ lines }) {
	return (
		<pre className="rounded-lg bg-zinc-950 text-zinc-100 text-xs font-mono p-4 leading-relaxed overflow-x-auto">
			{lines.map((line, i) => (
				<div key={i}>
					{line.map((seg, j) => (
						<span key={j} className={seg.cls}>{seg.t}</span>
					))}
				</div>
			))}
		</pre>
	)
}

const c = {
	kw:      "text-violet-400",
	at:      "text-amber-400",
	cls:     "text-sky-300",
	val:     "text-orange-300",
	plain:   "text-zinc-100",
	comment: "text-zinc-500 italic",
	str:     "text-amber-300",
	cmd:     "text-emerald-300",
}

const STEPS = [
	{
		id: "setup",
		label: "1. Setup",
		color: "bg-violet-500",
		items: [
			{ done: false, text: "Vytvoř složku a inicializuj projekt", hint: "mkdir my-app && cd my-app && npm init -y" },
			{ done: false, text: "Nainstaluj Tailwind CLI", hint: "npm install tailwindcss @tailwindcss/cli" },
			{ done: false, text: "Vytvoř src/input.css s @import \"tailwindcss\"", hint: null },
			{ done: false, text: "Spusť watcher a vytvoř index.html", hint: "npx @tailwindcss/cli -i src/input.css -o dist/output.css --watch" },
		],
	},
	{
		id: "struktura",
		label: "2. Struktura",
		color: "bg-sky-500",
		items: [
			{ done: false, text: "Navbar - logo + navigační odkazy", hint: "flex, justify-between, sticky top-0" },
			{ done: false, text: "Hero sekce - nadpis, podnadpis, tlačítko", hint: "text-center, max-w-*, mx-auto" },
			{ done: false, text: "Grid s kartami - alespoň 3 karty", hint: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
			{ done: false, text: "Footer - kontakt nebo copyright", hint: "text-center, text-sm, text-muted" },
		],
	},
	{
		id: "styl",
		label: "3. Styl",
		color: "bg-emerald-500",
		items: [
			{ done: false, text: "Karty - padding, shadow, rounded, border", hint: "Ze slide Utility třídy" },
			{ done: false, text: "Hover efekty na kartách a tlačítkách", hint: "hover:, active:scale-95, transition-all" },
			{ done: false, text: "Barvy - vlastní hex nebo palette", hint: "bg-[#...] nebo bg-violet-500" },
			{ done: false, text: "Typografie - font-size, font-weight, tracking", hint: "text-xl, font-bold, tracking-tight" },
		],
	},
	{
		id: "bonus",
		label: "Bonus",
		color: "bg-amber-500",
		items: [
			{ done: false, text: "Dark mode přepínač", hint: "toggle .dark na <html>, dark: varianty" },
				{ done: false, text: "@layer components - extrahuj .card, .btn do CSS", hint: "@apply v src/input.css" },
			{ done: false, text: "Responzivní navbar (hamburger na mobilu)", hint: "sm:hidden, block" },
			{ done: false, text: "Animace - pulse, bounce, nebo vlastní", hint: "animate-pulse, hover:animate-bounce" },
		],
	},
]

export default function SlideExercise() {
	const [activeStep, setActiveStep] = useState("setup")
	const step = STEPS.find((s) => s.id === activeStep)

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<Badge variant="outline" className="uppercase tracking-widest text-xs">Cvičení</Badge>
						<h1 className="text-5xl font-bold tracking-tight font-heading">Vlastní stránka</h1>
						<p className="text-lg text-muted-foreground">
							Postav si vlastní webovou stránku od základu - Vite + Tailwind, volitelně React + shadcn.
						</p>
					</div>
					
				</div>

				<Tabs defaultValue="setup" onValueChange={setActiveStep}>
					<TabsList>
						{STEPS.map((s) => (
							<TabsTrigger key={s.id} value={s.id}>
								{s.label}
							</TabsTrigger>
						))}
					</TabsList>

					{STEPS.map((s) => (
						<TabsContent key={s.id} value={s.id}>
							<div className="grid grid-cols-2 gap-4">
								<Card>
									<CardContent className="pt-5 space-y-3">
										<div className="flex items-center gap-2">
											<div className={["w-2 h-2 rounded-full", s.color].join(" ")} />
											<div className="text-sm font-medium">{s.label}</div>
										</div>
										<ul className="space-y-2.5">
											{s.items.map((item, i) => (
												<li key={i} className="flex gap-2.5 text-xs">
													<span className="mt-0.5 text-muted-foreground/50 tabular-nums">{i + 1}.</span>
													<div>
														<div className="font-medium text-foreground">{item.text}</div>
														{item.hint && (
															<div className="text-muted-foreground font-mono mt-0.5">{item.hint}</div>
														)}
													</div>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>

								{/* Right panel */}
								{s.id === "setup" && (
									<div className="flex flex-col justify-start space-y-2">
										<div className="text-xs text-muted-foreground">Tailwind CLI - instalace</div>
										<Code lines={[
											[{t:"mkdir my-app ", cls:c.cmd},{t:"&&", cls:c.kw},{t:" cd my-app", cls:c.cmd}],
											[{t:"npm init -y", cls:c.cmd}],
											[{t:"npm install tailwindcss @tailwindcss/cli", cls:c.cmd}],
										]} />
										<div className="text-xs text-muted-foreground mt-1">src/input.css</div>
										<Code lines={[
											[{t:"@import ", cls:c.at},{t:'"tailwindcss"', cls:c.str},{t:";", cls:c.plain}],
										]} />
										<div className="text-xs text-muted-foreground mt-1">Spusť watcher (nech běžet)</div>
										<Code lines={[
											[{t:"npx @tailwindcss/cli ", cls:c.cmd},{t:"-i", cls:c.kw},{t:" src/input.css ", cls:c.val},{t:"-o", cls:c.kw},{t:" dist/output.css ", cls:c.val},{t:"--watch", cls:c.kw}],
										]} />
										<div className="text-xs text-muted-foreground mt-1">index.html</div>
										<Code lines={[
											[{t:"<", cls:c.plain},{t:"link", cls:c.cls},{t:" rel=", cls:c.plain},{t:'"stylesheet"', cls:c.str},{t:" href=", cls:c.plain},{t:'"dist/output.css"', cls:c.str},{t:">", cls:c.plain}],
										]} />
										
									</div>
								)}
								{s.id === "struktura" && (
									<div className="flex flex-col justify-start space-y-2">
										<div className="text-xs text-muted-foreground">Doporučená struktura stránky</div>
										<Code lines={[
											[{t:"<", cls:c.plain},{t:"nav", cls:c.cls},{t:">", cls:c.plain},{t:" logo + odkazy ", cls:c.comment},{t:"</", cls:c.plain},{t:"nav", cls:c.cls},{t:">", cls:c.plain}],
											[{t:"", cls:c.plain}],
											[{t:"<", cls:c.plain},{t:"main", cls:c.cls},{t:">", cls:c.plain}],
											[{t:"  <", cls:c.plain},{t:"section", cls:c.cls},{t:"> ", cls:c.plain},{t:"hero </", cls:c.plain},{t:"section", cls:c.cls},{t:">", cls:c.plain}],
											[{t:"  <", cls:c.plain},{t:"section", cls:c.cls},{t:"> ", cls:c.plain},{t:"grid karet </", cls:c.plain},{t:"section", cls:c.cls},{t:">", cls:c.plain}],
											[{t:"</", cls:c.plain},{t:"main", cls:c.cls},{t:">", cls:c.plain}],
											[{t:"", cls:c.plain}],
											[{t:"<", cls:c.plain},{t:"footer", cls:c.cls},{t:"> ", cls:c.plain},{t:"copyright </", cls:c.plain},{t:"footer", cls:c.cls},{t:">", cls:c.plain}],
										]} />
										<div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
											Navbar: <code className="font-mono text-foreground">sticky top-0 z-50 backdrop-blur</code> pro "lepivý" efekt.
										</div>
									</div>
								)}
								{s.id === "styl" && (
									<div className="flex flex-col justify-start space-y-2">
										<div className="text-xs text-muted-foreground">Karta ze cvičení - použij jako základ</div>
										<Code lines={[
											[{t:"<div class=", cls:c.plain},{t:'"', cls:c.plain},{t:"bg-white rounded-2xl", cls:c.val}],
											[{t:"      border border-zinc-200 overflow-hidden", cls:c.val}],
											[{t:"      hover:shadow-xl hover:-translate-y-1.5", cls:c.kw}],
											[{t:"      transition-all duration-300", cls:c.kw},{t:'">', cls:c.plain}],
											[{t:"  <div class=", cls:c.plain},{t:'"h-[5px] bg-violet-500"', cls:c.str},{t:"></div>", cls:c.plain}],
											[{t:"  <div class=", cls:c.plain},{t:'"p-6"', cls:c.str},{t:">…</div>", cls:c.plain}],
											[{t:"</div>", cls:c.plain}],
										]} />
									</div>
								)}
								{s.id === "bonus" && (
									<div className="flex flex-col justify-start space-y-2">
										<div className="text-xs text-muted-foreground">Dark mode přepínač - čistý JS</div>
										<Code lines={[
											[{t:"<button onclick=", cls:c.plain},{t:'"', cls:c.plain}],
											[{t:"  document.documentElement", cls:c.val}],
											[{t:"    .classList.toggle(", cls:c.plain},{t:"'dark'", cls:c.str},{t:")", cls:c.plain}],
											[{t:'">', cls:c.plain},{t:"Toggle dark</", cls:c.plain},{t:"button", cls:c.cls},{t:">", cls:c.plain}],
										]} />
										<div className="text-xs text-muted-foreground mt-1">@custom-variant v CSS</div>
										<Code lines={[
											[{t:"@custom-variant dark ", cls:c.at},{t:"(&:is(.dark *))", cls:c.kw},{t:";", cls:c.plain}],
										]} />
										
									</div>
								)}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	)
}
