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
	dim:     "text-zinc-500",
	kw:      "text-violet-400",
	at:      "text-amber-400",
	cls:     "text-sky-300",
	prop:    "text-emerald-400",
	val:     "text-orange-300",
	plain:   "text-zinc-100",
	comment: "text-zinc-500 italic",
	str:     "text-amber-300",
}

const STRATEGIES = [
	{
		id: "class",
		label: "class (výchozí)",
		desc: "Tmavý režim se aktivuje přidáním třídy .dark na <html> nebo libovolného předka. Plně pod kontrolou JavaScriptu - ideální pro přepínač.",
		config: [
			[{t:"/* tailwind.config.js - Tailwind v3 */", cls:c.comment}],
			[{t:"module", cls:c.plain},{t:".exports = {", cls:c.plain}],
			[{t:"  darkMode", cls:c.prop},{t:": ", cls:c.plain},{t:"'class'", cls:c.str},{t:",", cls:c.plain}],
			[{t:"}", cls:c.plain}],
		],
		v4: [
			[{t:"/* index.css - Tailwind v4 */", cls:c.comment}],
			[{t:"@custom-variant dark ", cls:c.at},{t:"(&:is(.dark *))", cls:c.kw},{t:";", cls:c.plain}],
		],
		note: "V tomto projektu je nakonfigurováno právě takto.",
	},
	{
		id: "media",
		label: "media",
		desc: "Tailwind použije prefers-color-scheme media query. Automaticky sleduje systémové nastavení - žádný JS přepínač není potřeba.",
		config: [
			[{t:"/* tailwind.config.js - Tailwind v3 */", cls:c.comment}],
			[{t:"module", cls:c.plain},{t:".exports = {", cls:c.plain}],
			[{t:"  darkMode", cls:c.prop},{t:": ", cls:c.plain},{t:"'media'", cls:c.str},{t:",", cls:c.plain}],
			[{t:"}", cls:c.plain}],
		],
		v4: [
			[{t:"/* index.css - Tailwind v4 */", cls:c.comment}],
			[{t:"@custom-variant dark ", cls:c.at},{t:"(@media (prefers-color-scheme: dark))", cls:c.kw},{t:";", cls:c.plain}],
		],
		note: "Bez přepínače - závisí na OS uživatele.",
	},
]

export default function SlideDarkMode() {
	const [isDark, setIsDark] = useState(false)
	const [strategy, setStrategy] = useState("class")
	const [tokenMode, setTokenMode] = useState(false)
	const [globalDark, setGlobalDark] = useState(() => document.documentElement.classList.contains("dark"))

	const toggleGlobalDark = () => {
		setGlobalDark((d) => {
			document.documentElement.classList.toggle("dark", !d)
			return !d
		})
	}

	const strat = STRATEGIES.find((s) => s.id === strategy)

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<Badge variant="outline" className="uppercase tracking-widest text-xs">CSS</Badge>
						<h1 className="text-5xl font-bold tracking-tight font-heading">Tmavý režim</h1>
						<p className="text-lg text-muted-foreground">
							Prefix <code className="font-mono text-primary">dark:</code> funguje stejně jako <code className="font-mono text-white bg-primary/50 rounded-[4px] p-1 pb-1.5">hover:</code> nebo <code className="font-mono text-white bg-primary/50 rounded-[4px] p-1 pb-1.5">md:</code> - aplikuje třídu pouze když je aktivní tmavé schéma.
						</p>
					</div>
					<Button variant={globalDark ? "default" : "outline"} size="sm" onClick={toggleGlobalDark}>
						{globalDark ? "Vypnout dark mode" : "Zapnout dark mode"}
					</Button>
				</div>

				<Tabs defaultValue="prefix">
					<TabsList>
						<TabsTrigger value="prefix">dark: prefix</TabsTrigger>
						<TabsTrigger value="strategy">Strategie</TabsTrigger>
						<TabsTrigger value="tokens">CSS proměnné</TabsTrigger>
					</TabsList>

					{/* Tab 1 - dark: prefix live demo */}
					<TabsContent value="prefix">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="flex items-center justify-between">
										<div className="text-sm font-medium">Simulovaný režim</div>
										<Button
											size="sm"
											variant={isDark ? "default" : "outline"}
											onClick={() => setIsDark((d) => !d)}
										>
											{isDark ? "Dark" : "Light"}
										</Button>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Každá utility třída může mít dark: variantu.</p>
										<p>Píšeš <strong className="text-foreground">obě verze</strong> - světlou a tmavou - vedle sebe.</p>
									</div>

									<Code lines={[
										[{t:"<div class=", cls:c.plain},{t:'"', cls:c.plain}],
										[{t:"  bg-white ", cls:c.val},{t:"dark:bg-zinc-900", cls:c.kw}],
										[{t:"  text-zinc-900 ", cls:c.val},{t:"dark:text-zinc-100", cls:c.kw}],
										[{t:"  border-zinc-200 ", cls:c.val},{t:"dark:border-zinc-700", cls:c.kw}],
										[{t:'">', cls:c.plain}],
									]} />
								</CardContent>
							</Card>

							{/* Live preview scoped to .dark */}
							<div className={["grid place-items-center rounded-xl transition-colors duration-300 border", isDark ? "dark bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"].join(" ")}>
								<div className="w-full p-4 space-y-3">
									<div className={["rounded-lg border p-4 space-y-2 transition-colors duration-300", isDark ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50 border-zinc-200"].join(" ")}>
										<div className={["font-semibold text-sm transition-colors duration-300", isDark ? "text-zinc-100" : "text-zinc-900"].join(" ")}>
											Karta s dark: třídami
										</div>
										<div className={["text-xs transition-colors duration-300", isDark ? "text-zinc-400" : "text-zinc-500"].join(" ")}>
											Popisný text karty, který mění barvu.
										</div>
										<button className={["text-xs rounded px-3 py-1 font-medium transition-colors duration-300", isDark ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"].join(" ")}>
											Tlačítko
										</button>
									</div>
									<div className={["text-center text-xs font-mono transition-colors duration-300", isDark ? "text-zinc-500" : "text-zinc-400"].join(" ")}>
										{isDark ? '<html class="dark">' : '<html> (bez .dark)'}
									</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - Strategie */}
					<TabsContent value="strategy">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Strategie</div>
										<div className="flex gap-2">
											{STRATEGIES.map((s) => (
												<Button
													key={s.id}
													size="xs"
													variant={s.id === strategy ? "default" : "outline"}
													onClick={() => setStrategy(s.id)}
												>
													{s.label}
												</Button>
											))}
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
										{strat.desc}
									</div>

									{strat.note && (
										<div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
											{strat.note}
										</div>
									)}

									<div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800 space-y-1">
										<p className="font-semibold">Kombinace strategií</p>
										<p>Lze kombinovat - např. výchozí systémové + ruční přepínač: detekuj <code className="font-mono">prefers-color-scheme</code> v JS a nastav <code className="font-mono">.dark</code> třídu.</p>
									</div>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-3">
								<div className="text-xs text-muted-foreground">Tailwind v3 - tailwind.config.js</div>
								<Code lines={strat.config} />
								<div className="text-xs text-muted-foreground">Tailwind v4 - CSS soubor</div>
								<Code lines={strat.v4} />
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - CSS tokeny */}
					<TabsContent value="tokens">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="flex items-center justify-between">
										<div className="text-sm font-medium">Zobraz dark hodnoty</div>
										<Button
											size="sm"
											variant={tokenMode ? "default" : "outline"}
											onClick={() => setTokenMode((v) => !v)}
										>
											{tokenMode ? "dark" : "light"}
										</Button>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Lepší přístup než psát <code className="font-mono text-foreground">dark:text-zinc-100</code> všude: použij <strong className="text-foreground">CSS proměnné (design tokeny)</strong>.</p>
										<p>Definuješ <code className="font-mono text-foreground">--foreground</code> pro light i dark - a třídy zůstanou stejné.</p>
									</div>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-3">
								<Code lines={[
									[{t:"/* index.css */", cls:c.comment}],
									[{t:":root {", cls:c.cls}],
									[{t:"  --background", cls:c.prop},{t:": ", cls:c.plain},{t:tokenMode ? "oklch(0.148 …)" : "oklch(1 0 0)", cls: tokenMode ? c.kw : c.val},{t:";", cls:c.plain},{t:tokenMode ? "  /* dark */" : "  /* light */", cls:c.comment}],
									[{t:"  --foreground", cls:c.prop},{t:": ", cls:c.plain},{t:tokenMode ? "oklch(0.987 …)" : "oklch(0.148 …)", cls: tokenMode ? c.kw : c.val},{t:";", cls:c.plain}],
									[{t:"}", cls:c.cls}],
									[{t:"", cls:c.plain}],
									[{t:".dark {", cls:c.cls}],
									[{t:"  --background", cls:c.prop},{t:": ", cls:c.plain},{t:"oklch(0.148 …)", cls:c.kw},{t:";", cls:c.plain}],
									[{t:"  --foreground", cls:c.prop},{t:": ", cls:c.plain},{t:"oklch(0.987 …)", cls:c.kw},{t:";", cls:c.plain}],
									[{t:"}", cls:c.cls}],
									[{t:"", cls:c.plain}],
									[{t:"/* HTML - stejné pro obě schémata */", cls:c.comment}],
									[{t:"<p class=", cls:c.plain},{t:'"', cls:c.plain},{t:"bg-background text-foreground", cls:c.val},{t:'"', cls:c.plain},{t:">…</p>", cls:c.plain}],
								]} />
								<div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary space-y-1">
									<p className="font-semibold">Tento projekt (shadcn/ui) tohle dělá.</p>
									<p>Třídy jako <code className="font-mono">bg-background</code>, <code className="font-mono">text-foreground</code>, <code className="font-mono">text-primary</code> se automaticky přizpůsobí schématu - bez jediného <code className="font-mono">dark:</code> prefixu.</p>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</div>
		</section>
	)
}
