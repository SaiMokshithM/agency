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
    if (-not (Test-Path $f)) {
        Write-Host "SKIP (not found): $f"
        continue
    }
    $text = Get-Content $f -Raw
    $original = $text

    # Gold -> Teal accent colors
    $text = $text.Replace('#c9a227', '#3E8FA8')
    $text = $text.Replace('#C9A227', '#3E8FA8')
    $text = $text.Replace('#e8c45a', '#5BB8D4')
    $text = $text.Replace('#E8C45A', '#5BB8D4')
    $text = $text.Replace('#D4AF37', '#3E8FA8')
    $text = $text.Replace('#d4af37', '#3E8FA8')
    $text = $text.Replace('#fff6d1', '#C2DCEA')

    # Gold rgba -> Teal rgba
    $text = $text.Replace('rgba(201,162,39,', 'rgba(62,143,168,')
    $text = $text.Replace('rgba(201, 162, 39,', 'rgba(62, 143, 168,')
    $text = $text.Replace('rgba(212,175,55,', 'rgba(62,143,168,')
    $text = $text.Replace('rgba(212, 175, 55,', 'rgba(62, 143, 168,')
    $text = $text.Replace('rgba(244,214,122,', 'rgba(91,184,212,')
    $text = $text.Replace('rgba(244, 214, 122,', 'rgba(91, 184, 212,')

    # Gold sphere gradient stops -> Teal sphere
    $text = $text.Replace('#F4D67A', '#7DC8E0')
    $text = $text.Replace('#9A7D20', '#2A6E82')
    $text = $text.Replace('#4A3C0A', '#133844')
    $text = $text.Replace('#1A1500', '#081E28')

    # Old muted colors
    $text = $text.Replace('#090909', '#07111F')
    $text = $text.Replace('#0e0e0e', '#0E1E30')
    $text = $text.Replace('#0d0d0d', '#0E1E30')
    $text = $text.Replace('#0c0c0c', '#0C1A2B')

    # Text colors
    $text = $text.Replace("#ececec", '#F0EAE4')
    $text = $text.Replace("#a1a1aa", '#AECCD9')
    $text = $text.Replace("#A1A1AA", '#AECCD9')
    $text = $text.Replace('#71717a', '#6E9AAD')

    # Misc gold references
    $text = $text.Replace("color: 'gold'", "color: '#3E8FA8'")

    # Background shorthand fixes
    $text = $text.Replace("'rgba(255,255,240,", "'rgba(194,220,234,")
    $text = $text.Replace("'rgba(255,255,220,", "'rgba(145,200,220,")

    if ($text -ne $original) {
        Set-Content $f -Value $text -NoNewline
        Write-Host "UPDATED: $f"
    } else {
        Write-Host "No changes: $f"
    }
}

Write-Host ""
Write-Host "All TSX files upgraded to teal!"
