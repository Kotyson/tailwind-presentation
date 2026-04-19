import slide_title from './slide_title.jsx'
import slide_intro from './slide_intro.jsx'
import slide_install_plain from './slide_install_plain.jsx'
import slide_playground from './slide_playground.jsx'
import slide_utils from './slide_utils.jsx'
import slide_arbitrary from './slide_arbitrary.jsx'
import slide_responsive from './slide_responsive.jsx'
import slide_states from './slide_states.jsx'
import slide_css_layers from './slide_css_layers.jsx'
import slide_dark_mode from './slide_dark_mode.jsx'
import slide_shadcn from './slide_shadcn.jsx'
import slide_exercise from './slide_exercise.jsx'

export const slides = [
  { id: "title", title: "Hlavní", component: slide_title },
  { id: "intro", title: "Úvod", component: slide_intro },
  { id: "install-plain", title: "Instalace bez Reactu", component: slide_install_plain },
  { id: "playground", title: "Playground", component: slide_playground },
  { id: "utilities", title: "Utilities", component: slide_utils },
  { id: "arbitrary", title: "Libovolné hodnoty", component: slide_arbitrary },
  { id: "responsive", title: "Responzivita", component: slide_responsive },
  { id: "states", title: "Stavy & přechody", component: slide_states },
  { id: "css-layers", title: "@layer & @apply", component: slide_css_layers },
  { id: "dark-mode", title: "Tmavý režim", component: slide_dark_mode },
  { id: "shadcn", title: "shadcn/ui", component: slide_shadcn },
  { id: "exercise", title: "Cvičení", component: slide_exercise },
]
