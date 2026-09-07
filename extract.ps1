Add-Type -AssemblyName System.Drawing
$componentsDir = "d:\MGP\MGP-WEB\src\components"
$imagesDir = "d:\MGP\MGP-WEB\src\assets\images"
$publicDir = "d:\MGP\MGP-WEB\public"

Get-ChildItem -Path $componentsDir -Recurse -Filter *.tsx | ForEach-Object {
    $file = $_
    $content = Get-Content $file.FullName -Raw
    
    # Match imports
    $matches = [regex]::Matches($content, "import\s+.*?from\s+['""].*?/assets/images/(.*?\.(png|jpe?g))['""]")
    foreach ($m in $matches) {
        $imgName = $m.Groups[1].Value
        $imgPath = Join-Path $imagesDir $imgName
        if (Test-Path $imgPath) {
            try {
                $img = [System.Drawing.Image]::FromFile($imgPath)
                [PSCustomObject]@{
                    Component = $file.FullName.Substring($componentsDir.Length + 1)
                    Image = $imgName
                    Width = $img.Width
                    Height = $img.Height
                }
                $img.Dispose()
            } catch {}
        }
    }

    # Match /images in public
    $matches2 = [regex]::Matches($content, "src=['""]/(.*?\.(png|jpe?g))['""]")
    foreach ($m in $matches2) {
        $imgName = $m.Groups[1].Value
        $imgPath = Join-Path $publicDir $imgName
        if (Test-Path $imgPath) {
            try {
                $img = [System.Drawing.Image]::FromFile($imgPath)
                [PSCustomObject]@{
                    Component = $file.FullName.Substring($componentsDir.Length + 1)
                    Image = $imgName
                    Width = $img.Width
                    Height = $img.Height
                }
                $img.Dispose()
            } catch {}
        }
    }
} | Format-Table -AutoSize
