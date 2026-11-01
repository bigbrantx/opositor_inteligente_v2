# El Opositor Inteligente

Web de estudio para opositores: pomodoro, agenda semanal, 21 temas con bloques y notas, progreso, prompts de ayuda con IA y copia de seguridad. Hecha con Next.js (App Router).

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:3000
```
Requiere Node.js 20.9 o superior.

## Desplegar en Vercel
1. Sube la carpeta a un repositorio de GitHub.
2. En vercel.com, "Add New → Project", importa el repositorio y pulsa Deploy.
   O desde la terminal: `npx vercel`.

## Oposiciones
En Ajustes se elige entre Auxiliar Administrativo de la Comunidad de Madrid, Auxiliar Administrativo del Estado, Administrativo de la Comunidad de Madrid, Administrativo del Estado o una oposición personalizada con tu propio temario. Cada una guarda por separado su progreso, agenda, notas y constancia.

## Datos
Todo se guarda en el navegador (localStorage), por dispositivo. Para pasar el progreso a otro dispositivo usa Ajustes → Exportar copia / Importar copia.

## Dónde cambiar contenido
- `lib/opos.js`: temarios de cada oposición. `lib/data.js`: bloques por defecto del Aux. de la Comunidad de Madrid.
- `lib/prompts.js`: prompts de la sección Ayuda IA.
