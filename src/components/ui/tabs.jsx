import * as React from "react"
import { Tabs } from "radix-ui"
import { cn } from "@/lib/utils"

function TabsRoot({ className, ...props }) {
	return (
		<Tabs.Root
			data-slot="tabs"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	)
}

function TabsList({ className, ...props }) {
	return (
		<Tabs.List
			data-slot="tabs-list"
			className={cn(
				"inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground",
				className
			)}
			{...props}
		/>
	)
}

function TabsTrigger({ className, ...props }) {
	return (
		<Tabs.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				"disabled:pointer-events-none disabled:opacity-50",
				"data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
				className
			)}
			{...props}
		/>
	)
}

function TabsContent({ className, ...props }) {
	return (
		<Tabs.Content
			data-slot="tabs-content"
			className={cn("mt-2 outline-none", className)}
			{...props}
		/>
	)
}

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent }
