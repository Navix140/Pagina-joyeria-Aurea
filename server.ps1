# ============================================================
# AUREA — Servidor Local Ligero (PowerShell)
# Permite servir la tienda virtual sin necesidad de instalar
# Node.js, Python ni herramientas de terceros.
# ============================================================

$port = 8080
$folder = $PSScriptRoot
if (-not $folder) { $folder = Get-Location }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
} catch {
    Write-Host "[ERROR] No se pudo iniciar el servidor en el puerto $port." -ForegroundColor Red
    Write-Host "Verifica si otra aplicacion ya esta usando este puerto." -ForegroundColor Yellow
    exit 1
}

Write-Host "==========================================================" -ForegroundColor DarkYellow
Write-Host "   AUREA — Joyeria & Accesorios (Servidor Local Activo)   " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor DarkYellow
Write-Host "Servidor ejecutandose en: http://localhost:$port/" -ForegroundColor Green
Write-Host "Presiona Ctrl + C en esta ventana para detener el servidor." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor DarkYellow

# Abrir el navegador automaticamente
Start-Process "http://localhost:$port/"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $folder $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # Si no existe, servir index.html para soportar rutas hash o fallback
            $fallbackPath = Join-Path $folder "index.html"
            if (Test-Path $fallbackPath) {
                $bytes = [System.IO.File]::ReadAllBytes($fallbackPath)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
            }
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
