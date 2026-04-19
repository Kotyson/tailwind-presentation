import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const PADDING_SCALE = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
const ROUNDED_OPTIONS = ["rounded-none", "rounded-sm", "rounded-md", "rounded-xl", "rounded-3xl", "rounded-full"]
const SHADOW_OPTIONS = ["shadow-none", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl"]
const FONT_OPTIONS = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-4xl"]
const COLOR_OPTIONS = ["text-zinc-900", "text-blue-600", "text-rose-500", "text-emerald-600", "text-violet-600", "text-amber-500"]

const PALETTE = {
	slate:   { 50:"#f8fafc", 100:"#f1f5f9", 200:"#e2e8f0", 300:"#cbd5e1", 400:"#94a3b8", 500:"#64748b", 600:"#475569", 700:"#334155", 800:"#1e293b", 900:"#0f172a" },
	blue:    { 50:"#eff6ff", 100:"#dbeafe", 200:"#bfdbfe", 300:"#93c5fd", 400:"#60a5fa", 500:"#3b82f6", 600:"#2563eb", 700:"#1d4ed8", 800:"#1e40af", 900:"#1e3a8a" },
	rose:    { 50:"#fff1f2", 100:"#ffe4e6", 200:"#fecdd3", 300:"#fda4af", 400:"#fb7185", 500:"#f43f5e", 600:"#e11d48", 700:"#be123c", 800:"#9f1239", 900:"#881337" },
	emerald: { 50:"#ecfdf5", 100:"#d1fae5", 200:"#a7f3d0", 300:"#6ee7b7", 400:"#34d399", 500:"#10b981", 600:"#059669", 700:"#047857", 800:"#065f46", 900:"#064e3b" },
	violet:  { 50:"#f5f3ff", 100:"#ede9fe", 200:"#ddd6fe", 300:"#c4b5fd", 400:"#a78bfa", 500:"#8b5cf6", 600:"#7c3aed", 700:"#6d28d9", 800:"#5b21b6", 900:"#4c1d95" },
	amber:   { 50:"#fffbeb", 100:"#fef3c7", 200:"#fde68a", 300:"#fcd34d", 400:"#fbbf24", 500:"#f59e0b", 600:"#d97706", 700:"#b45309", 800:"#92400e", 900:"#78350f" },
}
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

export default function SlideUtils() {
	const [padIdx, setPadIdx] = useState(4)
	const [rounded, setRounded] = useState("rounded-xl")
	const [shadow, setShadow] = useState("shadow-lg")
	const [font, setFont] = useState("text-base")
	const [color, setColor] = useState("text-zinc-900")
	const [paletteColor, setPaletteColor] = useState("blue")
	const [selectedShade, setSelectedShade] = useState(500)

	const padValue = PADDING_SCALE[padIdx]
	const paddingPx = padValue * 4

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">Demo</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">Utility třídy</h1>
					<p className="text-lg text-muted-foreground">Sleduj výsledek v reálném čase.</p>
				</div>
				<Tabs defaultValue="spacing">
					<TabsList>
						<TabsTrigger value="spacing">Odsazení, zaoblení, stíny</TabsTrigger>
						<TabsTrigger value="typography">Typografie</TabsTrigger>
						<TabsTrigger value="palette">Paleta barev</TabsTrigger>
					</TabsList>
          
					{/* Tab 1 - Spacing */}
					<TabsContent value="spacing">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-5">
									{/* Padding slider */}
								<div className="space-y-2">
									<label className="text-sm font-medium">
										Padding: <code className="font-mono text-primary">p-{padValue}</code>
										<span className="ml-2 text-xs text-muted-foreground">({paddingPx}px)</span>
									</label>
									<Slider
                    className="mt-2"
										min={0}
										max={PADDING_SCALE.length - 1}
										step={1}
										value={[padIdx]}
										onValueChange={([v]) => setPadIdx(v)}
									/>
								</div>

									{/* Rounded buttons */}
									<div className="space-y-2">
										<div className="text-sm font-medium">Rounded</div>
										<div className="flex flex-wrap gap-2">
											{ROUNDED_OPTIONS.map((r) => (
												<Button
													key={r}
													size="xs"
													variant={r === rounded ? "default" : "outline"}
													onClick={() => setRounded(r)}
												>
													{r.replace("rounded-", "") || "none"}
												</Button>
											))}
										</div>
									</div>

								{/* Shadow buttons */}
								<div className="space-y-2">
									<div className="text-sm font-medium">Shadow</div>
									<div className="flex flex-wrap gap-2">
										{SHADOW_OPTIONS.map((s) => (
											<Button
												key={s}
												size="xs"
												variant={s === shadow ? "default" : "outline"}
												onClick={() => setShadow(s)}
											>
												{s.replace("shadow-", "") || "none"}
											</Button>
										))}
									</div>
								</div>

								{/* Class preview */}
								<Card className="bg-muted/50">
									<CardContent className="pt-4 font-mono text-xs leading-relaxed">
										<span className="text-muted-foreground">class=</span>
										<span className="text-foreground">"</span>
										<span className="text-primary"> p-{padValue} </span>
										<span className="text-chart-2"> {rounded} </span>
										<span className="text-chart-4"> {shadow} </span>
										<span className="text-foreground">bg-white"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							{/* Preview */}
							<div className="grid place-items-center">
								<div
								className={["bg-white text-zinc-900 border border-zinc-200 transition-all", rounded, shadow].join(" ")}
									style={{ padding: paddingPx }}
								>
									<div className="text-xl font-semibold">Live náhled</div>
									<div className="mt-2 text-zinc-500 text-sm">Utility třídy skládají design bez vlastního CSS.</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - Typography */}
					<TabsContent value="typography">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Velikost textu</div>
										<div className="flex flex-wrap gap-2">
											{FONT_OPTIONS.map((f) => (
												<Button
													key={f}
													size="xs"
													variant={f === font ? "default" : "outline"}
													onClick={() => setFont(f)}
												>
													{f}
												</Button>
											))}
										</div>
									</div>

								{/* Color buttons */}
								<div className="space-y-2">
									<div className="text-sm font-medium">Barva</div>
									<div className="flex flex-wrap gap-2">
										{COLOR_OPTIONS.map((c) => (
											<Button
												key={c}
												size="xs"
												variant={c === color ? "default" : "outline"}
												onClick={() => setColor(c)}
											>
												<span>{c.replace("text-", "")}</span>
											</Button>
										))}
									</div>
								</div>

								<Card className="bg-muted/50">
									<CardContent className="pt-4 font-mono text-xs leading-relaxed">
										<span className="text-muted-foreground">class=</span>
										<span className="text-foreground">"</span>
										<span className="text-primary"> {font} font-bold </span>
										<span className="text-chart-2"> {color}</span>
										<span className="text-foreground">"</span>
									</CardContent>
								</Card>
							</CardContent>
						</Card>

						<div className="grid place-items-center">
							<p className={[font, color, "font-bold transition-all"].join(" ")}>
									Tailwind CSS
								</p>
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - Paleta barev */}
					<TabsContent value="palette">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Barva</div>
										<div className="flex flex-wrap gap-2">
											{Object.keys(PALETTE).map((c) => (
												<Button
													key={c}
													size="xs"
													variant={c === paletteColor ? "default" : "outline"}
													onClick={() => setPaletteColor(c)}
												>
													{c}
												</Button>
											))}
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Číslo odstínu = <strong className="text-foreground">světlost</strong> na stupnici <code className="font-mono">50  900</code>.</p>
										<p><code className="font-mono">50</code> = nejsvětlejší &nbsp;·&nbsp; <code className="font-mono">900</code> = nejtmavší.</p>
										<p>Hodnota <code className="font-mono">500</code> bývá „základní" barva palety.</p>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"</span>
											<span className="text-primary"> bg-{paletteColor}-{selectedShade} </span>
											<span className="text-chart-2"> text-{paletteColor}-{selectedShade}</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="space-y-2">
								<div className="text-xs text-muted-foreground">Klikni na odstín - číslo = světlost</div>
								<div className="grid grid-cols-5 gap-1.5">
									{SHADES.map((shade) => (
										<button
											key={shade}
											onClick={() => setSelectedShade(shade)}
											className={[
												"rounded-md h-14 flex flex-col items-center justify-center transition-all ring-2",
												shade === selectedShade ? "ring-foreground scale-105" : "ring-transparent",
											].join(" ")}
											style={{ backgroundColor: PALETTE[paletteColor][shade] }}
										>
											<span
												className="text-[11px] font-mono font-bold"
												style={{ color: shade >= 500 ? "#fff" : "#1e293b" }}
											>
												{shade}
											</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</div>
		</section>
	)
}
