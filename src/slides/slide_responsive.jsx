import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const BREAKPOINTS = [
	{ prefix: "-",  label: "výchozí", minPx: 0,    desc: "Vždy platí (bez prefixu)" },
	{ prefix: "sm", label: "small",   minPx: 640,  desc: "≥ 640 px" },
	{ prefix: "md", label: "medium",  minPx: 768,  desc: "≥ 768 px" },
	{ prefix: "lg", label: "large",   minPx: 1024, desc: "≥ 1024 px" },
	{ prefix: "xl", label: "x-large", minPx: 1280, desc: "≥ 1280 px" },
	{ prefix: "2xl",label: "2x-large",minPx: 1536, desc: "≥ 1536 px" },
]

const GRID_COLS = [1, 2, 3, 4]
const FLEX_DIRS = ["flex-col", "flex-row"]

// Simulated viewport widths for the breakpoint demo
const VIEWPORT_STEPS = [320, 480, 640, 768, 1024, 1280, 1536]

function getActiveBreakpoints(vpx) {
	return BREAKPOINTS.filter((bp) => vpx >= bp.minPx).map((bp) => bp.prefix)
}

export default function SlideResponsive() {
	// Breakpoints tab
	const [vpWidth, setVpWidth] = useState(768)

	// Grid tab
	const [defaultCols, setDefaultCols] = useState(1)
	const [mdCols, setMdCols] = useState(2)
	const [lgCols, setLgCols] = useState(4)

	// Flex tab
	const [defaultDir, setDefaultDir] = useState("flex-col")
	const [mdDir, setMdDir] = useState("flex-row")

	const active = getActiveBreakpoints(vpWidth)

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">Demo</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">Responzivita</h1>
					<p className="text-lg text-muted-foreground">
						Prefixy jako <code className="font-mono text-white bg-primary/50 rounded-lg p-1 pb-1.5">sm:</code> <code className="font-mono text-white bg-primary/50 rounded-lg p-1 pb-1.5">md:</code> <code className="font-mono text-white bg-primary/50 rounded-lg p-1 pb-1.5">lg:</code> aplikují třídu od dané šířky nahoru - Tailwind je <strong>mobile-first</strong>.
					</p>
				</div>

				<Tabs defaultValue="breakpoints">
					<TabsList>
						<TabsTrigger value="breakpoints">Breakpointy</TabsTrigger>
						<TabsTrigger value="grid">Grid</TabsTrigger>
						<TabsTrigger value="flex">Flex</TabsTrigger>
					</TabsList>

					{/* Tab 1 - Breakpoints */}
					<TabsContent value="breakpoints">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium">
											Simulovaná šířka okna: <code className="font-mono text-primary">{vpWidth} px</code>
										</label>
										<input
											type="range"
											min={320}
											max={1600}
											step={1}
											value={vpWidth}
											onChange={(e) => setVpWidth(Number(e.target.value))}
											className="w-full accent-primary"
										/>
									</div>

									<div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 space-y-1">
										<p className="font-semibold">Mobile-first = prefix platí od dané šířky <span className="underline">a výše</span>.</p>
										<p><code className="font-mono">md:text-lg</code> = text-lg na viewportu ≥ 768 px.</p>
										<p>Bez prefixu = platí vždy (nejmenší výchozí stav).</p>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed space-y-1">
											{BREAKPOINTS.slice(1).map((bp) => (
												<div key={bp.prefix} className={active.includes(bp.prefix) ? "text-primary font-semibold" : "text-muted-foreground"}>
													<span>{bp.prefix}:</span>
													<span className="ml-2 text-[10px] not-italic font-normal opacity-70">{bp.desc}</span>
													{active.includes(bp.prefix) && <span className="ml-2 text-emerald-600">✓ aktivní</span>}
												</div>
											))}
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							{/* Visual timeline */}
							<div className="flex flex-col justify-center space-y-2">
								<div className="text-xs text-muted-foreground mb-1">Aktivní breakpointy při {vpWidth} px</div>
								<div className="relative h-10 rounded-full bg-muted overflow-hidden">
									<div
										className="absolute inset-y-0 left-0 bg-primary/20 transition-all duration-150"
										style={{ width: `${Math.min((vpWidth / 1600) * 100, 100)}%` }}
									/>
									{BREAKPOINTS.slice(1).map((bp) => (
										<div
											key={bp.prefix}
											className="absolute top-0 h-full flex flex-col items-center"
											style={{ left: `${(bp.minPx / 1600) * 100}%` }}
										>
											<div className={["w-0.5 h-full", active.includes(bp.prefix) ? "bg-primary" : "bg-muted-foreground/30"].join(" ")} />
										</div>
									))}
								</div>
								<div className="relative h-6">
									{BREAKPOINTS.slice(1).map((bp) => (
										<span
											key={bp.prefix}
											className={[
												"absolute text-[10px] font-mono -translate-x-1/2",
												active.includes(bp.prefix) ? "text-primary font-bold" : "text-muted-foreground",
											].join(" ")}
											style={{ left: `${(bp.minPx / 1600) * 100}%` }}
										>
											{bp.prefix}
										</span>
									))}
								</div>

								<div className="mt-3 space-y-1.5">
									{BREAKPOINTS.map((bp) => (
										<div key={bp.prefix} className="flex items-center gap-2">
											<div
												className={[
													"h-2 w-2 rounded-full shrink-0 transition-colors",
													active.includes(bp.prefix) ? "bg-primary" : "bg-muted-foreground/30",
												].join(" ")}
											/>
											<code className={["text-xs font-mono", active.includes(bp.prefix) ? "text-primary font-semibold" : "text-muted-foreground"].join(" ")}>
												{bp.prefix === "-" ? "(výchozí)" : `${bp.prefix}:`}
											</code>
											<span className="text-xs text-muted-foreground">{bp.desc}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - Grid */}
					<TabsContent value="grid">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Výchozí sloupce (mobile)</div>
										<div className="flex gap-2">
											{GRID_COLS.map((n) => (
												<Button key={n} size="xs" variant={n === defaultCols ? "default" : "outline"} onClick={() => setDefaultCols(n)}>
													{n}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">md: sloupce (≥ 768 px)</div>
										<div className="flex gap-2">
											{GRID_COLS.map((n) => (
												<Button key={n} size="xs" variant={n === mdCols ? "default" : "outline"} onClick={() => setMdCols(n)}>
													{n}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">lg: sloupce (≥ 1024 px)</div>
										<div className="flex gap-2">
											{GRID_COLS.map((n) => (
												<Button key={n} size="xs" variant={n === lgCols ? "default" : "outline"} onClick={() => setLgCols(n)}>
													{n}
												</Button>
											))}
										</div>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"grid </span>
											<span className="text-primary">grid-cols-{defaultCols} </span>
											<span className="text-chart-2">md:grid-cols-{mdCols} </span>
											<span className="text-chart-5">lg:grid-cols-{lgCols}</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-center space-y-3">
								<div className="text-xs text-muted-foreground">Náhled (simuluje výchozí / md / lg)</div>
								{[
									{ label: "Mobile (výchozí)", cols: defaultCols, color: "bg-primary/20 border-primary/40" },
									{ label: "md: ≥ 768 px", cols: mdCols, color: "bg-chart-2/20 border-chart-2/40" },
									{ label: "lg: ≥ 1024 px", cols: lgCols, color: "bg-chart-5/20 border-chart-5/40" },
								].map(({ label, cols, color }) => (
									<div key={label} className="space-y-1">
										<div className="text-[10px] text-muted-foreground font-mono">{label}</div>
										<div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
											{Array.from({ length: Math.max(cols, 2) * 1 }, (_, i) => (
												<div key={i} className={`rounded h-6 border ${color}`} />
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - Flex */}
					<TabsContent value="flex">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Výchozí směr (mobile)</div>
										<div className="flex gap-2">
											{FLEX_DIRS.map((d) => (
												<Button key={d} size="xs" variant={d === defaultDir ? "default" : "outline"} onClick={() => setDefaultDir(d)}>
													{d}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">md: směr (≥ 768 px)</div>
										<div className="flex gap-2">
											{FLEX_DIRS.map((d) => (
												<Button key={d} size="xs" variant={d === mdDir ? "default" : "outline"} onClick={() => setMdDir(d)}>
													{d}
												</Button>
											))}
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Typický vzor: na mobilu sloupec, na desktopu řada.</p>
										<p><code className="font-mono text-primary">flex flex-col md:flex-row</code></p>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"flex </span>
											<span className="text-primary">{defaultDir} </span>
											<span className="text-chart-2">md:{mdDir}</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="flex flex-col justify-center space-y-4">
								{[
									{ label: "Mobile (výchozí)", dir: defaultDir, color: "bg-primary/20 border-primary/40 text-primary" },
									{ label: "md: ≥ 768 px", dir: mdDir, color: "bg-chart-2/20 border-chart-2/40 text-chart-2" },
								].map(({ label, dir, color }) => (
									<div key={label} className="space-y-1">
										<div className="text-[10px] text-muted-foreground font-mono">{label} - {dir}</div>
										<div className={["flex gap-1.5 p-2 rounded-lg border", dir === "flex-col" ? "flex-col" : "flex-row", color].join(" ")}>
											{["A", "B", "C"].map((l) => (
												<div key={l} className={["rounded flex items-center justify-center text-xs font-bold border", color, dir === "flex-col" ? "h-7 w-full" : "h-10 flex-1"].join(" ")}>
													{l}
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</div>
		</section>
	)
}
