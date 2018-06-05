$cairoVersion = "1.15.10"
$url = ([string]::Format("https://github.com/preshing/cairo-windows/releases/download/{0}/cairo-windows-{0}.zip", $cairoVersion))
$output = "cairo.zip"
$cairoPath = Join-Path $PSScriptROOT ([string]::Format("cairo-windows-{0}/lib/x64", $cairoVersion))

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $output
Expand-Archive $output -DestinationPath .
$env:Path += ";" + $cairoPath