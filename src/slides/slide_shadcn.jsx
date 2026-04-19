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
	prop:    "text-emerald-400",
	val:     "text-orange-300",
	plain:   "text-zinc-100",
	comment: "text-zinc-500 italic",
	str:     "text-amber-300",
	cmd:     "text-emerald-300",
	flag:    "text-sky-400",
}

const COMPONENTS = [
	{ name: "Button",   desc: "Tlačítka s variantami (default, outline, ghost…)" },
	{ name: "Card",     desc: "Kontejner s hlavičkou, obsahem a patičkou" },
	{ name: "Badge",    desc: "Malé štítky / tagy" },
	{ name: "Dialog",   desc: "Modální okno přes backdrop" },
	{ name: "Input",    desc: "Textové pole se stylem" },
	{ name: "Select",   desc: "Dropdown výběr" },
	{ name: "Tabs",     desc: "Přepínání záložek" },
	{ name: "Slider",   desc: "Posuvník (range input)" },
	{ name: "Toast",    desc: "Dočasná notifikace" },
	{ name: "Tooltip",  desc: "Popis po najetí myší" },
]

const OTHER_KITS = [
	{ name: "Radix UI",        note: "primitiva bez stylů, základ shadcn" },
	{ name: "Headless UI",     note: "od autorů Tailwind, primitiva" },
	{ name: "daisyUI",         note: "plugin pro Tailwind, hotové třídy" },
	{ name: "Chakra UI",       note: "React, vlastní design systém" },
	{ name: "Mantine",         note: "React, bohatá knihovna" },
	{ name: "Material UI",     note: "React, Material Design" },
	{ name: "Ant Design",      note: "React/Angular, enterprise" },
	{ name: "Flowbite",        note: "Tailwind komponenty + JS" },
]

export default function SlideShadcn() {
	const [activeComp, setActiveComp] = useState("Button")
	const comp = COMPONENTS.find((c) => c.name === activeComp)

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">UI</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">shadcn/ui</h1>
					<p className="text-lg text-muted-foreground">
						Kolekce přístupných komponent postavených na <strong className="text-foreground">Radix UI</strong> a stylovaných Tailwindem. Komponenty nekopíruješ z npm - <strong className="text-foreground">kopíruješ zdrojový kód</strong> přímo do projektu.
					</p>
				</div>

				<Tabs defaultValue="co">
					<TabsList>
						<TabsTrigger value="co">Co je shadcn</TabsTrigger>
						<TabsTrigger value="install">Instalace</TabsTrigger>
						<TabsTrigger value="komponenty">Komponenty</TabsTrigger>
						<TabsTrigger value="dalsi">Další UI kity</TabsTrigger>
					</TabsList>

					{/* Tab 1 - Co je shadcn */}
					<TabsContent value="co">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-3">
									<div className="text-sm font-medium">Jak to funguje?</div>
									<ul className="space-y-2 text-xs text-muted-foreground">
										<li className="flex gap-2">
											<span className="text-muted-foreground/50 tabular-nums">1.</span>
											<span><strong className="text-foreground">Není to npm balíček.</strong> Každá komponenta je obyčejný .jsx soubor ve tvém projektu - plně upravitelný.</span>
										</li>
										<li className="flex gap-2">
											<span className="text-muted-foreground/50 tabular-nums">2.</span>
											<span>Styl je <strong className="text-foreground">Tailwind CSS</strong> - utility třídy, dark mode, CSS proměnné.</span>
										</li>
										<li className="flex gap-2">
											<span className="text-muted-foreground/50 tabular-nums">3.</span>
											<span>Logika a přístupnost pochází z <strong className="text-foreground">Radix UI primitiv</strong> (focus trap, ARIA, klávesnice).</span>
										</li>
										<li className="flex gap-2">
											<span className="text-muted-foreground/50 tabular-nums">4.</span>
											<span>CLI přidá soubor do <code className="font-mono text-foreground">src/components/ui/</code> - odtud ho importuješ normálně.</span>
										</li>
									</ul>
									<div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary">
										<strong>Vlastníš kód.</strong> Žádné breaking changes při upgradu balíčku - komponenta je tvoje.
									</div>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-3">
								<div className="text-xs text-muted-foreground">Struktura po přidání komponent</div>
								<Code lines={[
									[{t:"src/", cls:c.cls}],
									[{t:"├── components/", cls:c.cls}],
									[{t:"│   └── ui/", cls:c.cls}],
									[{t:"│       ├── ", cls:c.plain},{t:"button.jsx", cls:c.val}],
									[{t:"│       ├── ", cls:c.plain},{t:"card.jsx", cls:c.val}],
									[{t:"│       ├── ", cls:c.plain},{t:"dialog.jsx", cls:c.val}],
									[{t:"│       └── ", cls:c.plain},{t:"…", cls:c.comment}],
									[{t:"├── lib/", cls:c.cls}],
									[{t:"│   └── ", cls:c.plain},{t:"utils.js", cls:c.val},{t:"    cn() helper", cls:c.comment}],
									[{t:"└── ", cls:c.plain},{t:"components.json", cls:c.val},{t:"   konfigurace", cls:c.comment}],
								]} />
								<div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
									<code className="font-mono text-foreground">components.json</code> říká CLI kde jsou soubory, jaký je styl, jaký alias se používá pro importy.
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - Instalace */}
					<TabsContent value="install">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-3">
									<div className="text-sm font-medium">Prerekvizity</div>
									<ul className="space-y-1.5 text-xs text-muted-foreground">
										<li className="flex gap-2 items-start">
											<span className="text-muted-foreground/50 tabular-nums">1.</span>
											<span>Projekt s <strong className="text-foreground">Vite</strong></span>
										</li>
										<li className="flex gap-2 items-start">
											<span className="text-muted-foreground/50 tabular-nums">2.</span>
											<span><strong className="text-foreground">Tailwind CSS</strong> nainstalovaný a fungující</span>
										</li>
										<li className="flex gap-2 items-start">
											<span className="text-muted-foreground/50 tabular-nums">3.</span>
											<span><strong className="text-foreground">Node.js</strong> a npm</span>
										</li>
									</ul>
									<div className="border-t pt-3 text-sm font-medium">Přidání komponenty</div>
									<p className="text-xs text-muted-foreground">
										Po inicializaci přidáváš komponenty jednotlivě - jen to, co opravdu použiješ.
									</p>
									<div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
										<strong>Poznámka:</strong> shadcn/ui je postaven na Reactu. Pro čisté HTML/CSS projekty jsou vhodnější jiné kity (daisyUI, Flowbite).
									</div>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-2">
								<div className="text-xs text-muted-foreground">1. Inicializace projektu</div>
								<Code lines={[
									[{t:"npx ", cls:c.cmd},{t:"shadcn", cls:c.val},{t:"@latest init", cls:c.plain}],
								]} />
								<div className="text-xs text-muted-foreground mt-1">2. Přidání komponenty</div>
								<Code lines={[
									[{t:"npx ", cls:c.cmd},{t:"shadcn", cls:c.val},{t:"@latest add button", cls:c.plain}],
									[{t:"npx ", cls:c.cmd},{t:"shadcn", cls:c.val},{t:"@latest add card dialog", cls:c.plain}],
								]} />
								<div className="text-xs text-muted-foreground mt-1">3. Import v kódu</div>
								<Code lines={[
									[{t:"import ", cls:c.kw},{t:"{ Button } ", cls:c.plain},{t:"from ", cls:c.kw},{t:'"@/components/ui/button"', cls:c.str}],
									[{t:"", cls:c.plain}],
									[{t:"<", cls:c.plain},{t:"Button ", cls:c.cls},{t:"variant", cls:c.prop},{t:"=", cls:c.plain},{t:'"outline"', cls:c.str},{t:">Klikni</", cls:c.plain},{t:"Button", cls:c.cls},{t:">", cls:c.plain}],
								]} />
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - Komponenty */}
					<TabsContent value="komponenty">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-3">
									<div className="text-sm font-medium">Dostupné komponenty</div>
									<div className="flex flex-wrap gap-1.5">
										{COMPONENTS.map((comp) => (
											<button
												key={comp.name}
												onClick={() => setActiveComp(comp.name)}
												className={[
													"rounded-md px-2.5 py-1 text-xs font-medium border transition-colors",
													activeComp === comp.name
														? "bg-primary text-primary-foreground border-primary"
														: "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
												].join(" ")}
											>
												{comp.name}
											</button>
										))}
									</div>
									{comp && (
										<div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
											<strong className="text-foreground">{comp.name}:</strong> {comp.desc}
										</div>
									)}
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-3">
								<div className="text-xs text-muted-foreground">Jak komponenta vypadá uvnitř</div>
								<Code lines={[
									[{t:"// components/ui/button.jsx", cls:c.comment}],
									[{t:"import ", cls:c.kw},{t:"{ Slot } ", cls:c.plain},{t:"from ", cls:c.kw},{t:'"@radix-ui/react-slot"', cls:c.str}],
									[{t:"", cls:c.plain}],
									[{t:"const ", cls:c.kw},{t:"buttonVariants ", cls:c.plain},{t:"= cva(", cls:c.plain}],
									[{t:'  "inline-flex items-center …"', cls:c.str},{t:", {", cls:c.plain}],
									[{t:"    variants: {", cls:c.plain}],
									[{t:"      variant: {", cls:c.plain}],
									[{t:"        default: ", cls:c.plain},{t:'"bg-primary text-primary-foreground"', cls:c.str},{t:",", cls:c.plain}],
									[{t:"        outline: ", cls:c.plain},{t:'"border border-input bg-background"', cls:c.str},{t:",", cls:c.plain}],
									[{t:"      },", cls:c.plain}],
									[{t:"    },", cls:c.plain}],
									[{t:"  }", cls:c.plain}],
									[{t:")", cls:c.plain}],
								]} />
								<div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
									Varianty jsou definovány pomocí <code className="font-mono text-foreground">cva()</code> (class-variance-authority) - čistý TypeScript/JS, žádná magie.
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 4 - Další UI kity */}
					<TabsContent value="dalsi">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-3">
									<div className="text-sm font-medium">Alternativní UI kity</div>
									<div className="space-y-1.5">
										{OTHER_KITS.map((kit) => (
											<div key={kit.name} className="flex items-baseline gap-2 text-xs">
												<span className="font-medium text-foreground min-w-27.5">{kit.name}</span>
												<span className="text-muted-foreground">{kit.note}</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-start space-y-3">
								<div className="text-xs text-muted-foreground">Srovnání přístupů</div>
								<div className="space-y-2 text-xs">
									<div className="rounded-lg border border-border p-3 space-y-1">
										<div className="font-medium text-foreground">Headless (Radix, Headless UI)</div>
										<div className="text-muted-foreground">Pouze logika a přístupnost. Žádné výchozí styly - styluješ sám. Maximální flexibilita.</div>
									</div>
									<div className="rounded-lg border border-border p-3 space-y-1">
										<div className="font-medium text-foreground">Copy-paste (shadcn/ui)</div>
										<div className="text-muted-foreground">Headless základ + Tailwind styly zkopírované do projektu. Plná kontrola, snadná customizace.</div>
									</div>
									<div className="rounded-lg border border-border p-3 space-y-1">
										<div className="font-medium text-foreground">Hotový design systém (MUI, Mantine, Ant)</div>
										<div className="text-muted-foreground">Instaluješ balíček, importuješ komponenty. Rychlý start, méně kontroly nad stylem.</div>
									</div>
									<div className="rounded-lg border border-border p-3 space-y-1">
										<div className="font-medium text-foreground">CSS-first (daisyUI, Flowbite)</div>
										<div className="text-muted-foreground">Tailwind plugin nebo čisté CSS třídy. Funguje bez Reactu.</div>
									</div>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	)
}
