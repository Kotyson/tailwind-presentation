import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function ColorInput({ label, value, onChange }) {
	return (
		<div className="space-y-1">
			<label className="text-sm font-medium">{label}</label>
			<div className="flex items-center gap-2">
				<input
					type="color"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="h-8 w-10 cursor-pointer rounded border border-input bg-transparent p-0.5"
				/>
				<code className="font-mono text-xs text-primary">{value}</code>
			</div>
		</div>
	)
}

function NumberInput({ label, value, onChange, unit, min = 0, max = 200 }) {
	return (
		<div className="space-y-1">
			<label className="text-sm font-medium">
				{label}: <code className="font-mono text-primary">{value}{unit}</code>
			</label>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-full accent-primary"
			/>
		</div>
	)
}

function hexToRgba(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
}

export default function SlideArbitrary() {
	// Color tab
	const [textColor, setTextColor] = useState("#1d4ed8")
	const [bgColor, setBgColor] = useState("#fef9c3")
	const [borderColor, setBorderColor] = useState("#6d28d9")

	// Spacing tab
	const [fontSize, setFontSize] = useState(32)
	const [borderWidth, setBorderWidth] = useState(4)
	const [borderRadius, setBorderRadius] = useState(12)
	const [padding, setPadding] = useState(24)

	// Opacity tab
	const [opacityColor, setOpacityColor] = useState("#3b82f6")
	const [opacity, setOpacity] = useState(50)

	return (
		<section className="h-full w-full grid place-items-center p-10 pb-20">
			<div className="mx-auto w-full max-w-4xl space-y-4">

				<div className="space-y-1">
					<Badge variant="outline" className="uppercase tracking-widest text-xs">Demo</Badge>
					<h1 className="text-5xl font-bold tracking-tight font-heading">Libovolné hodnoty</h1>
					<p className="text-lg text-muted-foreground">
						Hranaté závorky <code className="font-mono text-white bg-primary/50 rounded-[4px] p-1 pb-1.5">[]</code> umožňují zadat
						libovolnou hodnotu přímo do utility třídy - bez vlastního CSS.
					</p>
				</div>

				<Tabs defaultValue="colors">
					<TabsList>
						<TabsTrigger value="colors">Barvy</TabsTrigger>
						<TabsTrigger value="spacing">Rozměry</TabsTrigger>
						<TabsTrigger value="opacity">Průhlednost</TabsTrigger>
					</TabsList>

					{/* Tab 1 - Barvy */}
					<TabsContent value="colors">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-5">
									<ColorInput label="Barva textu" value={textColor} onChange={setTextColor} />
									<ColorInput label="Barva pozadí" value={bgColor} onChange={setBgColor} />
									<ColorInput label="Barva rámečku" value={borderColor} onChange={setBorderColor} />

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed space-y-0.5">
											<div>
												<span className="text-muted-foreground">class=</span>
												<span className="text-foreground">"</span>
												<span className="text-primary"> text-[{textColor}] </span>
												<span className="text-chart-2"> bg-[{bgColor}] </span>
												<span className="text-chart-5"> border-2 border-[{borderColor}]</span>
												<span className="text-foreground">"</span>
											</div>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<div
									className="rounded-xl border-2 p-6 text-center font-semibold transition-all"
									style={{
										color: textColor,
										backgroundColor: bgColor,
										borderColor: borderColor,
									}}
								>
									<div className="text-lg">Libovolná barva</div>
									<div className="mt-1 text-sm opacity-70">přesně jak potřebuješ</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 2 - Rozměry */}
					<TabsContent value="spacing">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-4">
									<NumberInput label="Velikost textu" value={fontSize} onChange={setFontSize} unit="px" min={10} max={80} />
									<NumberInput label="Šířka rámečku" value={borderWidth} onChange={setBorderWidth} unit="px" min={0} max={20} />
									<NumberInput label="Zaoblení" value={borderRadius} onChange={setBorderRadius} unit="px" min={0} max={80} />
									<NumberInput label="Vnitřní odsazení" value={padding} onChange={setPadding} unit="px" min={0} max={80} />

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed">
											<span className="text-muted-foreground">class=</span>
											<span className="text-foreground">"</span>
											<span className="text-primary"> text-[{fontSize}px] </span>
											<span className="text-chart-2"> border-[{borderWidth}px] </span>
											<span className="text-chart-5"> rounded-[{borderRadius}px] </span>
											<span className="text-chart-4"> p-[{padding}px]</span>
											<span className="text-foreground">"</span>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<div
									className="border-solid bg-primary/10 text-primary font-semibold text-center transition-all"
									style={{
										fontSize: fontSize,
										borderWidth: borderWidth,
										borderRadius: borderRadius,
										padding: padding,
										borderColor: "oklch(var(--primary) / 0.6)",
									}}
								>
									Tailwind
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Tab 3 - Průhlednost */}
					<TabsContent value="opacity">
						<div className="grid grid-cols-2 gap-4">
							<Card>
								<CardContent className="pt-5 space-y-5">
									<ColorInput label="Barva" value={opacityColor} onChange={setOpacityColor} />

									<div className="space-y-1">
										<label className="text-sm font-medium">
											Průhlednost: <code className="font-mono text-primary">{opacity}%</code>
										</label>
										<input
											type="range"
											min={0}
											max={100}
											step={5}
											value={opacity}
											onChange={(e) => setOpacity(Number(e.target.value))}
											className="w-full accent-primary"
										/>
									</div>

									<div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
										<p>Modifikátor <code className="font-mono text-primary">/N</code> nastaví průhlednost barvy.</p>
										<p>Funguje na text, pozadí i rámeček: <code className="font-mono">bg-blue-500/50</code></p>
										<p>Libovolná hodnota: <code className="font-mono">bg-blue-500/[73]</code></p>
									</div>

									<Card className="bg-muted/50">
										<CardContent className="pt-4 font-mono text-xs leading-relaxed space-y-0.5">
											<div>
												<span className="text-muted-foreground">class=</span>
												<span className="text-foreground">"</span>
												<span className="text-primary"> bg-[{opacityColor}]/{opacity} </span>
												<span className="text-chart-2"> text-[{opacityColor}]/{opacity}</span>
												<span className="text-foreground">"</span>
											</div>
										</CardContent>
									</Card>
								</CardContent>
							</Card>

							<div className="grid place-items-center">
								<div className="w-full space-y-3">
									<div className="text-xs text-muted-foreground text-center">Průhlednost vs. plná barva</div>
									<div
										className="relative rounded-xl overflow-hidden border border-zinc-200 h-28"
										style={{
											backgroundImage: "repeating-conic-gradient(#d4d4d4 0% 25%, #fff 0% 50%)",
											backgroundSize: "16px 16px",
										}}
									>
										<div
											className="absolute inset-0 transition-all"
											style={{ backgroundColor: hexToRgba(opacityColor, opacity) }}
										/>
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="font-mono text-sm font-bold drop-shadow" style={{ color: opacityColor }}>
												{opacity}%
											</span>
										</div>
									</div>
									<div
										className="rounded-xl h-14 border border-zinc-200 flex items-center justify-center font-mono text-sm font-bold text-white"
										style={{ backgroundColor: opacityColor }}
									>
										100% (plná barva)
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
