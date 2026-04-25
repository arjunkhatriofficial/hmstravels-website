$dst = 'c:\Users\Xeno\Downloads\hmstravels-website\hmstravels\assets\images\fleet'
if (-not (Test-Path $dst)) { New-Item -ItemType Directory -Path $dst | Out-Null }
$urls = @(
  'https://hmstravels.com/wp-content/uploads/2026/03/Exter-2025.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Mahindra-XUV300.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Kia-Carens-2026.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Bolero-Neo-2025.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Tata-Tiago-ev-2024.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Venue-2025.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Thar-ROXX-2025.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Punch-2025.jpg',
  'https://hmstravels.com/wp-content/uploads/2026/03/Ertiga-2025.jpg'
)
foreach ($u in $urls) {
  $fname = [System.IO.Path]::GetFileName($u)
  $out = Join-Path $dst $fname
  Write-Host "Downloading $u -> $out"
  try {
    Invoke-WebRequest -Uri $u -OutFile $out -UseBasicParsing -ErrorAction Stop
  } catch {
    Write-Host "Failed to download $u`n$($_.Exception.Message)"
  }
}
Write-Host "Done."
