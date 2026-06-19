$oldNew = @(
    @('#567C8D', '#3E8FA8'),
    @('#7FA3B3', '#5BB8D4'),
    @('#0A1628', '#07111F'),
    @('#CBD9E6', '#C2DCEA'),
    @('#F5EFEB', '#F0EAE4'),
    @('#8BA5B5', '#6E9AAD'),
    @('#1C2D40', '#152338'),
    @('#162235', '#0E1E30'),
    @('rgba(86,124,141', 'rgba(62,143,168')
)

$files = @(
    'src\sections\ProcessSection.tsx',
    'src\sections\AboutSection.tsx',
    'src\sections\WorkSection.tsx',
    'src\sections\CTASection.tsx',
    'src\sections\ContactSection.tsx',
    'src\sections\ServicesSection.tsx',
    'src\sections\HeroSection.tsx',
    'src\components\Navbar.tsx',
    'src\components\Footer.tsx',
    'src\components\GoldSphere.tsx'
)

foreach ($file in $files) {
    $text = [System.IO.File]::ReadAllText($file)
    foreach ($pair in $oldNew) {
        $text = $text.Replace($pair[0], $pair[1])
    }
    # Also fix canvas RGB values in GoldSphere
    if ($file -like '*GoldSphere*') {
        $text = $text -replace '86,\s*124,\s*141', '62,143,168'
        $text = $text -replace '127,\s*163,\s*179', '94,184,212'
    }
    [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $text, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $file"
}

Write-Host "All done - colors upgraded to 10/10!"
