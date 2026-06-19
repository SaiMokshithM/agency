$file = 'src\styles\index.css'
$text = [System.IO.File]::ReadAllText($file)

$text = $text.Replace('color: #567C8D;', 'color: #3E8FA8;')
$text = $text.Replace('color: #567C8D !important;', 'color: #3E8FA8 !important;')
$text = $text.Replace('color: #F5EFEB;', 'color: #F0EAE4;')
$text = $text.Replace('color: #CBD9E6;', 'color: #C2DCEA;')
$text = $text.Replace('color: #7FA3B3 !important;', 'color: #5BB8D4 !important;')
$text = $text.Replace('color: #7FA3B3;', 'color: #5BB8D4;')
$text = $text.Replace('linear-gradient(90deg, #567C8D,', 'linear-gradient(90deg, #3E8FA8,')
$text = $text.Replace('rgba(86,124,141,0.2)', 'rgba(62,143,168,0.2)')
$text = $text.Replace('#567C8D, rgba(86,124,141', '#3E8FA8, rgba(62,143,168')

$path = (Get-Item $file).FullName
[System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
Write-Host "CSS final cleanup done"
