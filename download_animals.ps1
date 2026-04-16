# 동물 이미지 일괄 다운로드 스크립트 (만화 일러스트레이션용)
# Pollinations AI를 활용하여 동화책 스타일의 '만화 이미지'를 생성합니다.
# 429 Too Many Requests (과부하 방지) 오류를 피하기 위해 다운로드마다 5초씩 휴식합니다.

$animals = @(
    "dog", "cat", "bear", "tiger", "lion", "elephant", "giraffe", "monkey", "rabbit", "fox",
    "pig", "cow", "horse", "zebra", "hippo", "rhino", "kangaroo", "penguin", "dolphin", "eagle"
)

$imageDir = ".\images"
if (!(Test-Path -Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir | Out-Null
}

Write-Host "만화(일러스트) 동물 이미지 생성을 시작합니다! (약 2~3분 소요됩니다)" -ForegroundColor Cyan

foreach ($animal in $animals) {
    $filePath = "$imageDir\animal_$animal.jpg"
    
    # 만화 형태(Cartoon, Vector flat illustration)로 그려달라고 명시
    $prompt = "cute simple cartoon flat vector illustration of a $animal standing, white background, educational clip art"
    $promptEncoded = [uri]::EscapeDataString($prompt)
    $url = "https://image.pollinations.ai/prompt/$promptEncoded?width=400&height=400&nologo=true&seed=42"
    
    Write-Host "그리기 및 다운로드 중: $animal -> $filePath"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing
        Write-Host "    -> 성공!" -ForegroundColor Green
    } catch {
        Write-Host "    -> 오류 발생: $animal 다운로드 실패 ($($_.Exception.Message))" -ForegroundColor Red
        # 만약 실패하면 10초 후에 한 번 더 재시도합니다.
        Write-Host "    -> 10초 후 재시도합니다..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
        try {
            Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing
            Write-Host "    -> 재시도 성공!" -ForegroundColor Green
        } catch {
            Write-Host "    -> 재시도 최종 실패. 이 동물은 기본 이미지나 EMOJI로 대체해야 합니다." -ForegroundColor Red
        }
    }
    
    # 서버 과부하(Rate Limit) 방지를 위한 5초 대기
    Start-Sleep -Seconds 5
}

Write-Host "모든 만화 이미지 다운로드 완료!" -ForegroundColor Cyan
