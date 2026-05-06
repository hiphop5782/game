# 동물 이미지 일괄 다운로드 스크립트
# LoremFlickr를 사용하여 무작위 이미지를 다운로드합니다. 이 방식은 429 오류가 적게 발생합니다.

$animals = @(
    "dog", "cat", "bear", "tiger", "lion", "elephant", "giraffe", "monkey", "rabbit", "fox",
    "pig", "cow", "horse", "zebra", "hippo", "rhino", "kangaroo", "penguin", "dolphin", "eagle"
)

$imageDir = "d:\antigravity\images"
if (!(Test-Path -Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir | Out-Null
}

$ErrorActionPreference = 'Stop'
Write-Host "동물 이미지 다운로드를 시작합니다..." -ForegroundColor Cyan

foreach ($animal in $animals) {
    $filePath = "$imageDir\animal_$animal.jpg"
    $url = "https://loremflickr.com/400/400/$animal,cute/all"
    
    Write-Host "다운로드 중: $animal -> $filePath"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing
        Write-Host "    -> 성공!" -ForegroundColor Green
    }
    catch {
        Write-Host "    -> 오류 발생: $animal 다운로드 실패 ($($_.Exception.Message))" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host "모든 이미지 다운로드 완료!" -ForegroundColor Cyan
