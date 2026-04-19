import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const DURATIONS = ["duration-75", "duration-150", "duration-300", "duration-500", "duration-700", "duration-1000"]
const EASINGS = ["ease-linear", "ease-in", "ease-out", "ease-in-out"]
const SCALES = ["scale-90", "scale-95", "scale-100", "scale-105", "scale-110", "scale-125"]
const TRANSLATES = ["-translate-y-4", "-translate-y-2", "translate-y-0", "translate-y-2", "translate-y-4"]
const ROTATES = ["rotate-0", "rotate-6", "rotate-12", "rotate-45", "rotate-90", "rotate-180"]

export default function SlideStates() {
	// Hover/focus tab
	const [hoverBg, setHoverBg] = useState("hover:bg-blue-600")
	const [hoverScale, setHoverScale] = useState("hover:scale-105")
	const [focusRing, setFocusRing] = useState("focus:ring-2")

	const HOVER_BG_OPTIONS = ["hover:bg-blue-600", "hover:bg-rose-500", "hover:bg-emerald-600", "hover:bg-violet-600", "hover:bg-amber-500"]
	const HOVER_SCALE_OPTIONS = ["hover:scale-95", "hover:scale-100", "hover:scale-105", "hover:scale-110", "hover:scale-125"]
	const FOCUS_RING_OPTIONS = ["focus:ring-0", "focus:ring-1", "focus:ring-2", "focus:ring-4"]

	// Transition tab
	const [duration, setDuration] = useState("duration-300")
	const [easing, setEasing] = useState("ease-in-out")
	const [hovered, setHovered] = useState(false)

	// Transform tab
	const [scale, setScale] = useState("scale-100")
	const [translate, setTranslate] = useState("translate-y-0")
	const [rotate, setRotate] = useState("rotate-0")

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">Demo</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">Stavy &amp; přechody</h1>
					<p className="text-lg text-muted-foreground">
						Prefixy jako <code className="font-mono text-white bg-primary/50 rounded-[4px] p-1 pb-1.5">hover:</code> <code className="font-mono text-white bg-primary/50 rounded-[4px] p-1 pb-1.5">focus:</code> fungují stejně jako responzivní prefixy - Tailwind přidá pseudotřídu automaticky.
					</p>
				</div>

				<Tabs defaultValue="states">
					<TabsList>
						<TabsTrigger value="states">hover: / focus:</TabsTrigger>
						<TabsTrigger value="transition">Transition</TabsTrigger>
						<TabsTrigger value="transform">Transform</TabsTrigger>
					</TabsList>

					{/* Tab 1 - hover / focus */}
					<TabsContent value="states">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">hover: barva pozadí</div>
										<div className="flex flex-wrap gap-2">
											{HOVER_BG_OPTIONS.map((cls) => (
												<Button
													key={cls}
													size="xs"
													variant={cls === hoverBg ? "default" : "outline"}
													onClick={() => setHoverBg(cls)}
												>
													{cls.replace("hover:bg-", "")}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">hover: scale</div>
										<div className="flex flex-wrap gap-2">
											{HOVER_SCALE_OPTIONS.map((cls) => (
												<Button
													key={cls}
													size="xs"
													variant={cls === hoverScale ? "default" : "outline"}
													onClick={() => setHoverScale(cls)}
												>
													{cls.replace("hover:", "")}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">focus: ring</div>
										<div className="flex flex-wrap gap-2">
											{FOCUS_RING_OPTIONS.map((cls) => (
												<Button
													key={cls}
													size="xs"
													variant={cls === focusRing ? "default" : "outline"}
													onClick={() => setFocusRing(cls)}
												>
													{cls.replace("focus:", "")}
												</Button>
											))}
										</div>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"bg-blue-500 text-white rounded-lg px-4 py-2 </span>
											<span className="text-primary">transition-all </span>
											<span className="text-chart-2">{hoverBg} </span>
											<span className="text-chart-5">{hoverScale} </span>
											<span className="text-chart-4">{focusRing} focus:ring-blue-300 focus:outline-none</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<div className="space-y-4 text-center">
									<p className="text-xs text-muted-foreground">Najeď myší / klikni (focus)</p>
									<button
										className={[
											"bg-blue-500 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-300 cursor-pointer",
											hoverBg,
											hoverScale,
											focusRing,
											"focus:ring-blue-300 focus:outline-none",
										].join(" ")}
									>
										Interaktivní tlačítko
									</button>
									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Stav <code className="font-mono text-foreground">hover:</code> = kurzor nad prvkem</p>
										<p>Stav <code className="font-mono text-foreground">focus:</code> = prvek je aktivní / označený</p>
										<p>Stav <code className="font-mono text-foreground">active:</code> = prvek je stisknut</p>
										<p>Stav <code className="font-mono text-foreground">disabled:</code> = prvek je zakázán</p>
									</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - Transition */}
					<TabsContent value="transition">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Rychlost (duration)</div>
										<div className="flex flex-wrap gap-2">
											{DURATIONS.map((d) => (
												<Button
													key={d}
													size="xs"
													variant={d === duration ? "default" : "outline"}
													onClick={() => setDuration(d)}
												>
													{d.replace("duration-", "")}ms
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">Easing (ease)</div>
										<div className="flex flex-wrap gap-2">
											{EASINGS.map((e) => (
												<Button
													key={e}
													size="xs"
													variant={e === easing ? "default" : "outline"}
													onClick={() => setEasing(e)}
												>
													{e.replace("ease-", "")}
												</Button>
											))}
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p><code className="font-mono text-primary">transition-all</code> - animuje všechny vlastnosti</p>
										<p><code className="font-mono text-primary">transition-colors</code> - jen barvy</p>
										<p><code className="font-mono text-primary">transition-transform</code> - jen transformace</p>
										<p><code className="font-mono text-primary">transition-opacity</code> - jen průhlednost</p>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"</span>
											<span className="text-primary">transition-all </span>
											<span className="text-chart-2">{duration} </span>
											<span className="text-chart-5">{easing}</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<div className="space-y-4 w-full">
									<p className="text-xs text-muted-foreground text-center">Klikni na tlačítko pro animaci</p>
									<div className="relative h-24 bg-muted/50 rounded-xl overflow-hidden">
										<div
											className={[
												"absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs transition-all",
												duration,
												easing,
											].join(" ")}
											style={{ left: hovered ? "calc(100% - 48px)" : "8px" }}
										>
											�-�
										</div>
									</div>
									<div className="flex justify-center">
										<Button onClick={() => setHovered((h) => !h)}>
											{hovered ? " Zpět" : "Animovat "}
										</Button>
									</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - Transform */}
					<TabsContent value="transform">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<div className="space-y-2">
										<div className="text-sm font-medium">Scale</div>
										<div className="flex flex-wrap gap-2">
											{SCALES.map((s) => (
												<Button
													key={s}
													size="xs"
													variant={s === scale ? "default" : "outline"}
													onClick={() => setScale(s)}
												>
													{s.replace("scale-", "")}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">Translate Y</div>
										<div className="flex flex-wrap gap-2">
											{TRANSLATES.map((t) => (
												<Button
													key={t}
													size="xs"
													variant={t === translate ? "default" : "outline"}
													onClick={() => setTranslate(t)}
												>
													{t.replace("translate-y-", "y-").replace("-y-", "-y-")}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-sm font-medium">Rotate</div>
										<div className="flex flex-wrap gap-2">
											{ROTATES.map((r) => (
												<Button
													key={r}
													size="xs"
													variant={r === rotate ? "default" : "outline"}
													onClick={() => setRotate(r)}
												>
													{r.replace("rotate-", "")}°
												</Button>
											))}
										</div>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"transition-all duration-300 </span>
											<span className="text-primary">{scale} </span>
											<span className="text-chart-2">{translate} </span>
											<span className="text-chart-5">{rotate}</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<div
									className={[
										"h-20 w-20 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm transition-all duration-300",
										scale,
										translate,
										rotate,
									].join(" ")}
								>
									CSS
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</div>
		</section>
	)
}
