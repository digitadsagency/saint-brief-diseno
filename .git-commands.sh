#!/bin/bash

# Script para subir el proyecto a un nuevo repositorio de GitHub
# Reemplaza YOUR_USERNAME y YOUR_REPO_NAME con tus valores

echo "🚀 Preparando para subir a GitHub..."
echo ""
echo "Por favor, primero crea el repositorio en GitHub:"
echo "1. Ve a https://github.com/new"
echo "2. Crea un nuevo repositorio (sin inicializar con README)"
echo "3. Copia la URL del repositorio"
echo ""
read -p "Pega la URL de tu nuevo repositorio (ej: https://github.com/usuario/repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No se proporcionó URL. Saliendo..."
    exit 1
fi

echo ""
echo "📦 Agregando remoto..."
git remote add origin "$REPO_URL"

echo "📤 Subiendo código..."
git branch -M main
git push -u origin main

echo ""
echo "✅ ¡Código subido exitosamente!"
echo ""
echo "🔗 Siguiente paso: Desplegar en Vercel"
echo "1. Ve a https://vercel.com/new"
echo "2. Conecta tu repositorio de GitHub"
echo "3. Agrega las variables de entorno desde tu .env.local"
echo "4. Deploy!"

