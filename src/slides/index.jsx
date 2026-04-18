import slide_title from './slide_title.jsx'
import slide_intro from './slide_intro.jsx'
import slide_install_plain from './slide_install_plain.jsx'
import slide_playground from './slide_playground.jsx'
import slide_utils from './slide_utils.jsx'

export const slides = [
  { id: "title", title: "Hlavní", component: slide_title },
  { id: "intro", title: "Úvod", component: slide_intro },
  { id: "install-plain", title: "Instalace bez Reactu", component: slide_install_plain },
  { id: "playground", title: "Playground", component: slide_playground },
  { id: "utilities", title: "Utilities", component: slide_utils }

]
