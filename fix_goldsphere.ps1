$file = 'src\components\GoldSphere.tsx'
$path = (Get-Item $file).FullName
$text = [System.IO.File]::ReadAllText($path)

# Replace old muted teal RGB canvas colors with vibrant teal
$text = [regex]::Replace($text, '86,\s*124,\s*141', '62,143,168')
$text = [regex]::Replace($text, '127,\s*163,\s*179', '94,184,212')
$text = [regex]::Replace($text, '56,\s*94,\s*108', '30,100,130')

# Also fix any hex references
$text = $text.Replace('#567C8D', '#3E8FA8')
$text = $text.Replace('#7FA3B3', '#5BB8D4')
$text = $text.Replace('#0A1628', '#07111F')

[System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
Write-Host "GoldSphere.tsx fixed successfully"
Write-Host "File size: $((Get-Item $path).Length) bytes"
