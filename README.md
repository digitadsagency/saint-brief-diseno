# SAINT Brief Creativo - Diseño de Interiores

Herramienta profesional para recopilar información detallada sobre proyectos de diseño de interiores mediante un formulario interactivo de 7 pasos.

## 🎨 Características

- **Formulario interactivo de 7 pasos** para recopilar información completa del proyecto
- **Autoguardado** en localStorage
- **Integración con Google Sheets** para almacenar los briefs
- **Notificaciones por correo** cuando se completa un brief
- **Exportación** de datos en JSON
- **Diseño responsive** optimizado para móvil y desktop
- **Interfaz moderna** con animaciones suaves

## 📋 Pasos del Formulario

1. **Datos del cliente** - Información de contacto
2. **Información general** - Dimensiones y áreas del proyecto
3. **Requerimientos especiales** - Mobiliario específico necesario
4. **Preferencias de mobiliario** - Detalles de diseño
5. **Estilo, colores y percepción** - Estética del proyecto
6. **Iluminación deseada** - Preferencias de luz
7. **Presupuesto y alcance** - Rango de inversión

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Inicializar columnas en Google Sheets
npm run init-sheets
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Google Sheets
NEXT_PUBLIC_GOOGLE_SHEETS_ID=tu_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu_private_key\n-----END PRIVATE KEY-----"

# Email (Gmail)
GMAIL_EMAIL=tu_email@gmail.com
GMAIL_APP_PASSWORD=tu_app_password
```

### Configurar Google Sheets

1. Crea un Google Sheets nuevo
2. Comparte la hoja con el email del Service Account
3. Ejecuta `npm run init-sheets` para crear las columnas automáticamente

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run init-sheets` - Inicializa las columnas en Google Sheets

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Google Sheets API** - Integración con hojas de cálculo
- **Nodemailer** - Envío de correos

## 📄 Licencia

© 2024 SAINT Agency. Todos los derechos reservados.
