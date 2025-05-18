# BSWap - Plataforma de Intercambio de Libros 📚

<div align="center">
  <img src="/api/placeholder/300/300" alt="BSWap Logo">

  
  <p>Una aplicación web para intercambiar libros y conectar lectores</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
</div>

## 📋 Tabla de Contenidos

 [💡 Sobre el Proyecto](#-sobre-el-proyecto)
 [✨ Características](#-características)
 [🛠️ Tecnologías](#️-tecnologías)
 [🚀 Flujo de navegacion](#-flujo)

 [📁 Estructura del Proyecto](#-estructura-del-proyecto)
 [👥 Equipo](#-equipo)
 [🌟 Demo de presentacion](#-demo)
 [📷 Capturas de Pantalla](#-capturas-de-pantalla)
 [📊 Estado del Proyecto](#-estado-del-proyecto)

## 💡 Sobre el Proyecto

BSWap es una innovadora aplicación web desarrollada durante una simulación en No Country. La plataforma está diseñada para fomentar el intercambio de libros entre usuarios y la creación de una comunidad de lectores con intereses similares. Facilita la conexión entre amantes de la literatura permitiéndoles compartir sus colecciones, descubrir nuevas lecturas y establecer vínculos basados en sus preferencias literarias.

## ✨ Características

- **Catálogo de Libros**: Gestiona tu colección personal y marca los disponibles para intercambio
- **Perfiles de Usuario**: Crea un perfil personalizado con tus géneros y autores favoritos
- **Sistema de Intercambio**: Solicita y coordina intercambios de libros con otros usuarios
- **Feed Social**: Descubre las actividades recientes de la comunidad
- **Búsqueda Avanzada**: Encuentra libros y usuarios por diversos criterios
- **Reseñas y Valoraciones**: Comparte tus opiniones sobre los libros que has leído

## 🛠️ Tecnologías

### Frontend
<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" alt="React Query" />
  <img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=react&logoColor=white" alt="Zustand" />
</div>

### Backend
<div>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeORM-FFCA28?style=flat-square&logo=typeorm&logoColor=black" alt="TypeORM" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white" alt="JWT" />
</div>

### Herramientas
<div>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black" alt="Prettier" />
</div>

## 🚀 Flujo del proyecto
  <a href=" " target="_blank">
  <img src=" " alt="flujo de la informacion">

 ## 🚀 Diseño e ideas 
  <a href=" " target="_blank">
  <img src=" " alt="Muro de Miro lluvia de ideas"> 

  <a href=" " target="_blank">
  <img src=" " alt="Panel figma"> 

## 📁 Estructura del Proyecto

```
bswap/
│
├── backend/                 # API con NestJS
│   ├── src/
│   │   ├── auth/            # Módulo de autenticación
│   │   ├── books/           # Módulo de libros
│   │   ├── exchanges/       # Módulo de intercambios
│   │   ├── users/           # Módulo de usuarios
│   │   ├── common/          # Utilidades compartidas
│   │   ├── config/          # Configuraciones de la aplicación
│   │   ├── app.module.ts    # Módulo principal
│   │   └── main.ts          # Punto de entrada
│   ├── test/                # Tests
│   └── dist/                # Código compilado
│
├── frontend/                # Aplicación Next.js
│   ├── app/                 # Rutas y páginas (App Router)
│   ├── components/          # Componentes de UI
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilidades y funciones
│   ├── public/              # Archivos estáticos
│   ├── services/            # Servicios API
│   ├── store/               # Estado global (Zustand)
│   ├── styles/              # Estilos (Tailwind)
│   └── types/               # Definiciones de TypeScript
│
└── README.md                # Este archivo
```

## 👥 Equipo

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/user1">
        <img src="/api/placeholder/100/100" width="100px" alt="Fernando"/>
        <br />
        <sub><b>Fernando M. Valdes</b></sub>
      </a>
      <br />
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/user2">
        <img src="/api/placeholder/100/100" width="100px" alt="Genaro"/>
        <br />
        <sub><b>Genaro Cura</b></sub>
      </a>
      <br />
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/patricia-sotelo/">
        <img src="/api/placeholder/100/100" width="100px" alt="Patricia"/>
        <br />
        <sub><b>Patricia Sotelo</b></sub>
      </a>
      <br />
      <sub>UX/UI Designer</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/user3">
        <img src="/api/placeholder/100/100" width="100px" alt="Felipe"/>
        <br />
        <sub><b>Felipe A. Aleman</b></sub>
      </a>
      <br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/VeronicaBravoDevs">
        <img src="/api/placeholder/100/100" width="100px" alt="Verónica"/>
        <br />
        <sub><b>Verónica Bravo</b></sub>
      </a>
      <br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/mario-molano/">
        <img src="/api/placeholder/100/100" width="100px" alt="Mario"/>
        <br />
        <sub><b>Mario Roberto Molano</b></sub>
      </a>
      <br />
      <sub>Project Manager</sub>
    </td>
  </tr>
</table>

## 🌟 Demo
 <img src="/api/placeholder/800/450" alt="Página de inicio" style="margin-bottom: 10px" />
[![Ver Demo de BSWap](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/DAq9eQhL-f8)

*Haz clic en el botón para ver la presentación del proyecto*

## 📷 Capturas de Pantalla

<div align="center">
  <img src="/api/placeholder/800/450" alt="Página de inicio" style="margin-bottom: 10px" />
  <p><em>Página principal de BSWap</em></p>
  
  <img src="/api/placeholder/800/450" alt="Perfil de usuario" style="margin-bottom: 10px" />
  <p><em>Visualización de un perfil de usuario con su biblioteca</em></p>
  
  <img src="/api/placeholder/800/450" alt="Intercambio de libros" />
  <p><em>Interfaz de intercambio de libros entre usuarios</em></p>

   <img src="/api/placeholder/800/450" alt="Intercambio de libros" />
  <p><em>Interfaz de intercambio de libros entre usuarios</em></p>
</div>

## 📊 Estado del Proyecto

Actualmente el proyecto no cuenta con una versión desplegada, ya que el backend no se mantiene activo después de la simulación en No Country. El código fuente está disponible para fines educativos y de portafolio.

---

<div align="center">
  <p>Desarrollado con ❤️ por el equipo BSWap en <strong>No Country</strong> - 2025</p>
</div>
