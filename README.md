
# Calculadora

calculador usada en los procesos de juicios de pencion alimenticia y juicios mercantiles en el departamento de administracion de terceros comerciales y deducciones


## Documentación

[Documentación](./Documentation.md)


## Stack Tecnologico

**Front-end:** Tauri, React, TailwindCSS


## Configuracion recomendada del IDE

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/joel-Aviles/CalculadoraLegal.git
```

Entrar en el directorio del proyecto

```bash
  cd CalculadoraLegal
```

Instalar dependencias

```bash
  pnpm install
```

Iniciarl el servidor

```bash
  pnpm tauri dev
```


## Deployment

Para comilar el proyecto ejecutar

```bash
  pnpm tauri build
```


## Variables de Entorno

Para ejecutar este proyecto, necesitaras añadir las siguientes variables de entorno en tu archivo .env

`VITE_BASE_URL`

`VITE_PROD_BASE_URL`


## Features

- Modo claro y oscuro
- Carga de archivos
- Descarga de archivos
