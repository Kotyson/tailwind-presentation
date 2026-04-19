import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Syntax-highlighted code block (no external dep)
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
	dim:     "text-zinc-500",
	kw:      "text-violet-400",
	at:      "text-amber-400",
	cls:     "text-sky-300",
	prop:    "text-emerald-400",
	val:     "text-orange-300",
	plain:   "text-zinc-100",
	comment: "text-zinc-500 italic",
}

const LAYER_TABS = ["base", "components", "utilities"]

const LAYER_INFO = {
	base: {
		title: "@layer base",
		desc: "HTML elementy a reset. Projeví se na každém <h1>, <p>, <a>… bez přidání třídy. Nejnižší specificita - utility třídy ji vždy přepíší.",
		code: [
			[{t:"@layer ", cls:c.at},{t:"base", cls:c.kw},{t:" {", cls:c.plain}],
			[{t:"  h1 ", cls:c.cls},{t:"{ ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"text-4xl font-bold tracking-tight", cls:c.val},{t:"; }", cls:c.plain}],
			[{t:"  a  ", cls:c.cls},{t:"{ ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"text-primary underline", cls:c.val},{t:"; }", cls:c.plain}],
			[{t:"  * ", cls:c.cls},{t:"{ ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"box-border", cls:c.val},{t:"; }", cls:c.plain}],
			[{t:"}", cls:c.plain}],
		],
		note: "Tailwind samotný přidává zde reset (Preflight). Tvůj @layer base se přidá za něj.",
	},
	components: {
		title: "@layer components",
		desc: "Znovupoužitelné třídy složené z utilities. Ideální pro .btn, .card, .badge… Specificita jako utility - ale utility třídy ji stále přepíší.",
		code: [
			[{t:"@layer ", cls:c.at},{t:"components", cls:c.kw},{t:" {", cls:c.plain}],
			[{t:"  .btn ", cls:c.cls},{t:"{", cls:c.plain}],
			[{t:"    ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"inline-flex items-center rounded-lg", cls:c.val},{t:";", cls:c.plain}],
			[{t:"    ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"px-4 py-2 font-semibold", cls:c.val},{t:";", cls:c.plain}],
			[{t:"    ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"bg-primary text-primary-foreground", cls:c.val},{t:";", cls:c.plain}],
			[{t:"    ", cls:c.plain},{t:"@apply ", cls:c.at},{t:"hover:opacity-90 transition-opacity", cls:c.val},{t:";", cls:c.plain}],
			[{t:"  }", cls:c.plain}],
			[{t:"}", cls:c.plain}],
		],
		note: "Použij @apply pro komponenty, které se opakují. Pro jedináčky je lepší utility třídy přímo v HTML.",
	},
	utilities: {
		title: "@layer utilities",
		desc: "Vlastní utility třídy - jednúčelové jako ty Tailwindové. Nejvyšší specificita ve vrstvách. Přepisují base i components.",
		code: [
			[{t:"@layer ", cls:c.at},{t:"utilities", cls:c.kw},{t:" {", cls:c.plain}],
			[{t:"  .text-shadow ", cls:c.cls},{t:"{", cls:c.plain}],
			[{t:"    ", cls:c.plain},{t:"text-shadow", cls:c.prop},{t:": 0 1px 3px rgb(0 0 0 / 0.3);", cls:c.val}],
			[{t:"  }", cls:c.plain}],
			[{t:"  .scrollbar-hide ", cls:c.cls},{t:"{", cls:c.plain}],
			[{t:"    ", cls:c.plain},{t:"scrollbar-width", cls:c.prop},{t:": none;", cls:c.val}],
			[{t:"  }", cls:c.plain}],
			[{t:"}", cls:c.plain}],
		],
		note: "Třídy v @layer utilities Tailwind zahrne do svého purge/scan - nevygeneruje zbytečné CSS.",
	},
}

const APPLY_EXAMPLES = [
	{
		label: ".btn-primary",
		classes: "inline-flex items-center rounded-lg px-4 py-2 font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity",
		preview: (
			<button className="inline-flex items-center rounded-lg px-4 py-2 font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
				Klikni
			</button>
		),
	},
	{
		label: ".card-base",
		classes: "rounded-xl border border-border bg-card text-card-foreground shadow-sm p-5",
		preview: (
			<div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-5 text-sm">
				Obsah karty
			</div>
		),
	},
	{
		label: ".badge-outline",
		classes: "inline-flex rounded-full border border-border px-2.5 py-0.5 text-xs font-medium",
		preview: (
			<span className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-xs font-medium">
				badge
			</span>
		),
	},
]

export default function SlideCssLayers() {
	const [activeLayer, setActiveLayer] = useState("base")
	const [activeApply, setActiveApply] = useState(0)

	const layer = LAYER_INFO[activeLayer]

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-40">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">CSS</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">@layer &amp; @apply</h1>
					<p className="text-lg text-muted-foreground">
						Tailwind organizuje výstupní CSS do tří vrstev. Vlastní styly vkládáš přesně tam, kam patří - utility třídy je vždy přepíší.
					</p>
				</div>

				<Tabs defaultValue="layers">
					<TabsList>
						<TabsTrigger value="layers">Vrstvy (@layer)</TabsTrigger>
						<TabsTrigger value="apply">@apply</TabsTrigger>
						<TabsTrigger value="cascade">Kaskáda vrstev</TabsTrigger>
					</TabsList>

					{/* Tab 1 - @layer */}
					<TabsContent value="layers">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Vyber vrstvu</div>
										<div className="flex gap-2">
											{LAYER_TABS.map((l) => (
												<Button
													key={l}
													size="xs"
													variant={l === activeLayer ? "default" : "outline"}
													onClick={() => setActiveLayer(l)}
												>
													{l}
												</Button>
											))}
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
										{layer.desc}
									</div>

									{layer.note && (
										<div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
											{layer.note}
										</div>
									)}
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-2">
								<div className="text-xs text-muted-foreground font-mono">{layer.title}</div>
								<Code lines={layer.code} />
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - @apply */}
					<TabsContent value="apply">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Příklady komponent</div>
										<div className="flex flex-col gap-2">
											{APPLY_EXAMPLES.map((ex, i) => (
												<Button
													key={ex.label}
													size="xs"
													variant={i === activeApply ? "default" : "outline"}
													onClick={() => setActiveApply(i)}
													className="justify-start font-mono"
												>
													{ex.label}
												</Button>
											))}
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p><code className="font-mono text-primary">@apply</code> zkopíruje utility třídy do selektoru.</p>
										<p>Výsledek je identický - Tailwind jen sloučí hodnoty.</p>
										<p className="text-amber-700">Pozor: <code className="font-mono">@apply hover:</code> funguje jen v CSS, ne inline.</p>
									</div>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-3">
								<div className="text-xs text-muted-foreground font-mono">CSS soubor</div>
								<Code lines={[
									[{t:"@layer ", cls:c.at},{t:"components", cls:c.kw},{t:" {", cls:c.plain}],
									[{t:`  ${APPLY_EXAMPLES[activeApply].label} `, cls:c.cls},{t:"{", cls:c.plain}],
									...APPLY_EXAMPLES[activeApply].classes.split(" ").map((cls) => [
										{t:"    ", cls:c.plain},
										{t:"@apply ", cls:c.at},
										{t:cls, cls:c.val},
										{t:";", cls:c.plain},
									]),
									[{t:"  }", cls:c.plain}],
									[{t:"}", cls:c.plain}],
								]} />
								<div className="text-xs text-muted-foreground font-mono">Náhled</div>
								<div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-center min-h-14">
									{APPLY_EXAMPLES[activeApply].preview}
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - Kaskáda */}
					<TabsContent value="cascade">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-3 text-sm">
									<div className="text-sm font-medium">Jak Tailwind sestaví CSS soubor</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Tailwind generuje jeden CSS soubor rozdělený do vrstev pomocí <code className="font-mono text-foreground">@layer</code>.</p>
										<p>Vrstva níže v kaskádě <strong className="text-foreground">přepisuje</strong> tu výše, bez ohledu na specificitu.</p>
									</div>

									<Code lines={[
										[{t:"/* 1. Tailwind reset (Preflight) */", cls:c.comment}],
										[{t:"@layer ", cls:c.at},{t:"base", cls:c.kw},{t:" { … }", cls:c.plain}],
										[{t:"", cls:c.plain}],
										[{t:"/* 2. Tvůj @layer base */", cls:c.comment}],
										[{t:"@layer ", cls:c.at},{t:"base", cls:c.kw},{t:" { h1 { … } }", cls:c.plain}],
										[{t:"", cls:c.plain}],
										[{t:"/* 3. Tvůj @layer components */", cls:c.comment}],
										[{t:"@layer ", cls:c.at},{t:"components", cls:c.kw},{t:" { .btn { … } }", cls:c.plain}],
										[{t:"", cls:c.plain}],
										[{t:"/* 4. Tailwind utilities (vždy vítězí) */", cls:c.comment}],
										[{t:"@layer ", cls:c.at},{t:"utilities", cls:c.kw},{t:" { .p-4 { … } }", cls:c.plain}],
									]} />
								</CardContent>
							</Card>

							<div className="flex flex-col justify-center space-y-3">
								<div className="text-xs text-muted-foreground">Priorita - nižší = přepíše vyšší</div>

								{[
									{ label: "base", color: "bg-zinc-200 text-zinc-700", note: "Reset, HTML elementy" },
									{ label: "components", color: "bg-sky-100 text-sky-800", note: ".btn, .card, vlastní třídy" },
									{ label: "utilities", color: "bg-primary/20 text-primary", note: "p-4, text-lg, flex… (Tailwind)" },
									{ label: "!important", color: "bg-rose-100 text-rose-700", note: "Krajní řešení - radši ne" },
								].map((row, i, arr) => (
									<div key={row.label} className="flex items-center gap-3">
										<div className={`rounded-lg px-3 py-2 text-xs font-mono font-semibold w-28 text-center ${row.color}`}>
											{row.label}
										</div>
										<div className="text-xs text-muted-foreground flex-1">{row.note}</div>
										{i < arr.length - 1 && (
											<div className="text-muted-foreground text-xs">↓ přepíše</div>
										)}
									</div>
								))}

								<div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
									Utility třída <code className="font-mono">p-4</code> přepíše padding nastavený v <code className="font-mono">@layer base</code> nebo <code className="font-mono">@layer components</code> - vždy.
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</div>
		</section>
	)
}
