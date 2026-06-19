Add-Type -AssemblyName System.Text

function Fix-File {
    param([string]$filePath)
    
    $fullPath = (Get-Item $filePath).FullName
    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    
    # Skip if file is tiny/corrupted
    if ($text.Length -lt 100) {
        Write-Host "SKIPPED (corrupted): $filePath"
        return
    }
    
    $original = $text
    
    $text = $text.Replace('#567C8D', '#3E8FA8')
    $text = $text.Replace('#7FA3B3', '#5BB8D4')
    $text = $text.Replace('#8BA5B5', '#6E9AAD')
    $text = $text.Replace('#0A1628', '#07111F')
    $text = $text.Replace('#1C2D40', '#152338')
    $text = $text.Replace('#162235', '#0E1E30')
    $text = $text.Replace('#CBD9E6', '#C2DCEA')
    $text = $text.Replace('#F5EFEB', '#F0EAE4')
    $text = $text.Replace('rgba(86,124,141', 'rgba(62,143,168')
    $text = $text.Replace('rgba(86, 124, 141', 'rgba(62, 143, 168')
    
    # Hero gradient fix
    $text = $text.Replace('#f0d060', '#C2DCEA')
    
    if ($text -ne $original) {
        $outBytes = [System.Text.Encoding]::UTF8.GetBytes($text)
        [System.IO.File]::WriteAllBytes($fullPath, $outBytes)
        Write-Host "Updated: $filePath ($($outBytes.Length) bytes)"
    } else {
        Write-Host "No changes: $filePath"
    }
}

$files = @(
    'src\components\GoldSphere.tsx',
    'src\components\Navbar.tsx',
    'src\components\Footer.tsx',
    'src\sections\HeroSection.tsx',
    'src\sections\AboutSection.tsx',
    'src\sections\ServicesSection.tsx',
    'src\sections\ProcessSection.tsx',
    'src\sections\CTASection.tsx',
    'src\sections\ContactSection.tsx',
    'src\sections\WorkSection.tsx',
    'src\sections\StatementStrip.tsx',
    'src\pages\NotFoundPage.tsx'
)

foreach ($f in $files) {
    Fix-File $f
}

Write-Host ""
Write-Host "All done! Colors upgraded to 10/10."
