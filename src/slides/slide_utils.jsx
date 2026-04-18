import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const PADDING_SCALE = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
const ROUNDED_OPTIONS = ["rounded-none", "rounded-sm", "rounded-md", "rounded-xl", "rounded-3xl", "rounded-full"]
const FONT_OPTIONS = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-4xl"]

export default function SlideUtils() {
	const [padIdx, setPadIdx] = useState(4)
	const [rounded, setRounded] = useState("rounded-xl")
	const [font, setFont] = useState("text-base")

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
						<TabsTrigger value="spacing">Spacing &amp; Rounded</TabsTrigger>
						<TabsTrigger value="typography">Typografie</TabsTrigger>
					</TabsList>
          
					{/* Tab 1 — Spacing */}
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

									{/* Class preview */}
									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">className=</span>
											<span className="text-foreground">"</span>
											<span className="text-primary"> p-{padValue} </span>
											<span className="text-chart-2"> {rounded} </span>
											<span className="text-foreground">bg-white shadow"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							{/* Preview */}
							<div className="grid place-items-center">
								<div
									className={["bg-white text-zinc-900 shadow-lg border border-zinc-200", rounded].join(" ")}
									style={{ padding: paddingPx }}
								>
									<div className="text-xl font-semibold">Live náhled</div>
									<div className="mt-2 text-zinc-500 text-sm">Utility třídy skládají design bez vlastního CSS.</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 — Typography */}
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

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">className=</span>
											<span className="text-foreground">"</span>
											<span className="text-primary"> {font} font-bold</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<p className={[font, "font-bold transition-all"].join(" ")}>
									Tailwind CSS
								</p>
							</div>
						</div>
					</TabsContent>
				</Tabs>

			</div>
		</section>
	)
}
