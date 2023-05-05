<h1 align="center">
  ♻️ Reciclon
</h1>

## Características

- Interfaz de usuario simple y fácil de usar.
- Datos eficientes con Firestore.
- Autenticación de usuarios con Firebase.
- Panel de administración.
- Mapa de centros de reciclaje cercanos con la API de Google Maps.
- Carga de archivos con Filepond a Firebase Storage.
- Animaciones fluidas con Framer Motion y FormKit AutoAnimate.

## Tecnologias

- React.js & Next.js
- Tailwind CSS
- Google Analytics
- Firebase (firestore, authentication, storage, analytics)
- PWA (native apps, offline access)

## Inicio rápido

Asegúrese de tener [Node.js](https://nodejs.org) y [Git](https://git-scm.com) instalados en su sistema. Node.js viene con un administrador de paquetes llamado `npm`, pero le sugiero que use [`pnpm`](https://pnpm.io/) en su lugar, ya que es más rápido y eficiente.

1. Clona el repositorio:
   - `clon de git https://github.com/eggsy/recycling-platform`
2. Instalar dependencias:
   - `pnpm install` o `npm install`
3. Cree una cuenta de Firestore y obtenga los archivos necesarios en el archivo `.env.local`.
4. Ejecute la aplicación:
   - `pnpm run dev` o `npm run dev` para el modo de desarrollo.
   - `<pnpm/npm> run build` y `<pnpm/npm> start` para el modo de producción.
