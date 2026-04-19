import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"

export default function Slide01Intro() {
  return (
    <section className="h-full w-full grid place-items-center p-10 pb-20">
        <div className="max-w-3xl w-full space-y-8">
            <div className="space-y-4">
                <Badge variant="outline" className="text-xs uppercase tracking-widest">
                    Prezentace
                </Badge>
                <h1 className="text-6xl font-bold tracking-tight font-heading">
                    Tailwind CSS
                </h1>
                <p className="text-2xl font-medium text-muted-foreground">
                    Utility-first
                </p>
            </div>

            {/* <p className="text-lg text-muted-foreground max-w-xl">
            This presentation is a React app. Each slide is a component styled
            entirely with Tailwind utility classes.
            </p> */}

            <div className="flex flex-wrap gap-3">
                <Badge variant="default">Tailwind CSS</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="outline">shadcn/ui</Badge>
                <Badge variant="outline">Interaktivní</Badge>
            </div>

            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>Jak navigovat?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground pt-6">
                    Použij <Kbd></Kbd> <Kbd>→</Kbd> nebo navigační lištu pro pohyb mezi snímky.
                </CardContent>
            </Card>
         </div>
    </section>
  )
}
