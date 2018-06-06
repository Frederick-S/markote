$cairoVersion = "1.15.10"
$cairoDownLoadUrl = ([string]::Format("https://github.com/preshing/cairo-windows/releases/download/{0}/cairo-windows-{0}.zip", $cairoVersion))
$cairoOutputFileName = "cairo.zip"
$architecture = If ([Environment]::Is64BitProcess) { "x64" } Else { "x86" }
Write-Host $architecture
$cairoPath = Join-Path (Get-Item -Path ".\").FullName ([string]::Format("cairo-windows-{0}/lib/{1}", $cairoVersion, $architecture))

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $cairoDownLoadUrl -OutFile $cairoOutputFileName
Expand-Archive $cairoOutputFileName -DestinationPath .
$env:Path += ";" + $cairoPath