export const getPrompts=(label)=>{
const CTX='Estoy preparando la oposición de '+label+'. '
return [
{id:'cristiano',titulo:'Lenguaje jurídico, en cristiano',desc:'Traduce el lenguaje jurídico a explicaciones de andar por casa.',
prompt:CTX+`Actúa como un preparador de oposiciones con mucha paciencia. Te voy a pasar un texto jurídico y quiero que lo traduzcas a lenguaje cotidiano, como si se lo explicaras a alguien que no ha estudiado Derecho, sin perder el significado legal.

Hazlo así:
1. Explicación en 3-5 frases sencillas.
2. Los términos jurídicos clave, con su significado en una línea cada uno.
3. Lo que más suele preguntarse en el examen sobre este texto.

Si algo del texto es ambiguo o no estás seguro, dímelo en vez de inventarlo.

TEXTO: [pega aquí el artículo o el párrafo]`},
{id:'analogias',titulo:'Artículos densos con analogías',desc:'Desglosa la literalidad de artículos densos buscando analogías cotidianas y retentivas.',
prompt:CTX+`Desglosa el siguiente artículo frase a frase. Para cada parte:
- Cita la literalidad entre comillas.
- Explica con tus palabras qué quiere decir.
- Propón una analogía cotidiana corta, divertida y fácil de recordar.

Destaca en negrita los números, plazos, órganos y los verbos que cambian el sentido (puede, debe, podrá, deberá). Al final resume todo el artículo en una sola imagen mental que me sirva para recordarlo.

ARTÍCULO: [pega aquí el artículo]`},
{id:'acronimos',titulo:'Acrónimos y asociaciones visuales',desc:'Crea acrónimos y asociaciones visuales para recordar listas y plazos.',
prompt:CTX+`Necesito memorizar esta lista (o estos plazos) en el orden exacto. Créame:
1. Un acrónimo o frase mnemotécnica en español.
2. Una historia o escena visual en la que cada elemento aparezca en orden, con imágenes exageradas.
3. Una versión ultracorta para repasarla en 10 segundos.

Dame 2 opciones de cada técnica y dime cuál recomiendas y por qué. Respeta los datos, números y el orden tal cual; no cambies nada de la lista.

LISTA O PLAZOS: [pega aquí lo que quieres memorizar]`},
{id:'atajos',titulo:'Listas interminables, atajos infalibles',desc:'Hackea tu cerebro: convierte listas interminables en atajos infalibles para el examen.',
prompt:CTX+`Convierte esta lista larga en atajos de memoria para el examen:
1. Agrúpala en bloques de 4-5 elementos como máximo, con un criterio lógico y explícito.
2. Ponle un gancho memorable (palabra, imagen o frase) a cada bloque.
3. Presenta el resultado final en una tabla de repaso rápido.
4. Hazme 5 preguntas cortas, de una en una, para comprobar que la he fijado.

No omitas ningún elemento ni cambies datos.

LISTA: [pega aquí la lista]`},
{id:'esquemas',titulo:'Conceptos parecidos, esquemas visuales',desc:'Transforma los conceptos que más se parecen en esquemas visuales imposibles de olvidar.',
prompt:CTX+`Estos conceptos me los confundo siempre. Quiero que me ayudes a distinguirlos:
1. Una tabla comparativa (definición, órgano competente, plazo, requisitos, efectos y un ejemplo).
2. Un esquema visual en texto (con flechas, llaves o diagrama sencillo).
3. La pista o regla para no confundirlos nunca.
4. Las 3 trampas típicas de examen sobre ellos.

Si no estás seguro de algún dato, dímelo para que lo contraste con mi temario.

CONCEPTOS: [escribe aquí los conceptos que se parecen]`},
{id:'teoria',titulo:'Comprueba tu teoría',desc:'Comprueba si dominas la teoría esquivando las típicas trampas de examen.',
prompt:CTX+`Quiero que me examines oralmente sobre el tema [indica el tema]. Reglas:
- Hazme una sola pregunta cada vez, abierta y sin darme opciones.
- Espera mi respuesta antes de seguir.
- Corrígeme diciendo qué he acertado, qué me falta y cuál es la trampa típica de examen en ese punto.
- Sube la dificultad si respondo bien.

Tras 10 preguntas, dame un resumen de mis fallos y qué repasar primero.`},
{id:'test',titulo:'Test para hacerte dudar',desc:'Entrena con fuego real. Convierte cualquier artículo en un examen tipo test diseñado para hacerte dudar.',
prompt:CTX+`Convierte el siguiente texto en un examen tipo test de [10] preguntas con 4 opciones y una sola correcta, al estilo de la oposición. Los distractores deben ser muy plausibles: cambiar un plazo, un órgano o una cifra, usar "siempre" o "nunca", mezclar conceptos parecidos.

Preséntame las preguntas de 5 en 5 y no des las soluciones hasta que yo responda. Luego corrige explicando por qué la correcta lo es y por qué cada incorrecta resulta tentadora.

TEXTO: [pega aquí el artículo o el tema]`},
{id:'arrastre',titulo:'Sistema de arrastre',desc:'Estructura tu tiempo de estudio diario aplicando el sistema de arrastre.',
prompt:CTX+`Quiero organizar mi estudio diario con un sistema de arrastre: lo que no termino un día se arrastra al siguiente en lugar de perderse o de acumular culpa.

Mis datos:
- Tiempo disponible al día: [por ejemplo, 30 minutos]
- Temas por estudiar: [lista]
- Fecha del examen: [fecha]

Diséñame:
1. Una plantilla diaria (bloque de contenido nuevo, bloque de repaso de lo arrastrado y un test corto).
2. Las reglas del arrastre: qué se arrastra, cuánto puedo acumular y qué hago si el arrastre crece demasiado.
3. Un ejemplo de 5 días para verlo en marcha.

Si te falta algún dato, pregúntamelo antes de empezar.`},
{id:'ruta',titulo:'Hoja de ruta hasta el examen',desc:'No estudies más horas, estudia con mejor estrategia. Diseña tu hoja de ruta realista hasta el día del examen.',
prompt:CTX+`No quiero estudiar más horas, sino con mejor estrategia. Diséñame una hoja de ruta realista hasta el examen con estos datos:
- Fecha de hoy y fecha del examen: [fechas]
- Tiempo disponible: [horas por día y días libres]
- Temas que domino: [lista]
- Temas que se me atragantan: [lista]

Quiero fases claras (primera vuelta, repaso espaciado, simulacros, última semana), objetivos medibles por semana, margen para imprevistos y criterios para ajustar el plan si voy retrasado. Dime qué supuestos haces y qué decisiones difíciles tendría que tomar.`},
{id:'resumen',titulo:'Un tema en una página',desc:'Extra: resume un tema entero para repasarlo la víspera.',
prompt:CTX+`Resume el tema [indica el tema] en una sola página: un esquema jerárquico, los datos que se piden siempre (plazos, cifras, órganos, quórums) destacados, y 10 frases clave para repasar la víspera. Indica si hay algún punto en el que no estés seguro para que lo contraste con mi temario.

MATERIAL: [pega aquí tu temario o tus apuntes]`},
{id:'errores',titulo:'Analiza tus errores',desc:'Extra: descubre el patrón detrás de las preguntas que fallas.',
prompt:CTX+`Te paso las preguntas que he fallado, con mi respuesta y la correcta. Identifica el patrón de mis errores (confundir conceptos, plazos, leer rápido, trampas con "siempre/nunca"), explícame la regla correcta en cada caso y crea 5 preguntas nuevas por cada patrón para practicar.

MIS ERRORES: [pega aquí las preguntas falladas]`}
]
}
