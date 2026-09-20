$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$postsRoot = Join-Path $root '_posts'
$outputPath = Join-Path $root 'ARTICLES.md'
$today = (Get-Date).Date

$articles = Get-ChildItem -Path $postsRoot -Recurse -Filter '*.md' |
  ForEach-Object {
    $match = [regex]::Match($_.Name, '^(?<date>\d{4}-\d{2}-\d{2})-')
    if (-not $match.Success) {
      return
    }

    $content = Get-Content -Path $_.FullName -Raw
    $titleMatch = [regex]::Match($content, '(?m)^title:\s*(?:"(?<quoted>[^"]+)"|(?<plain>.+))$')
    $title = if ($titleMatch.Groups['quoted'].Success) {
      $titleMatch.Groups['quoted'].Value
    } else {
      $titleMatch.Groups['plain'].Value.Trim()
    }
    $title = $title.Trim().Trim('"')

    $date = [datetime]::ParseExact($match.Groups['date'].Value, 'yyyy-MM-dd', $null)
    [pscustomobject]@{
      Date = $date
      DateText = $date.ToString('yyyy-MM-dd')
      Title = $title
      Category = $_.Directory.Name
      File = ($_.FullName.Substring($root.Length + 1) -replace '\\', '/')
      Status = if ($date -gt $today) { 'Upcoming' } else { 'Published' }
    }
  } |
  Sort-Object Date, Title -Descending

$nextArticle = $articles |
  Where-Object { $_.Date -gt $today } |
  Sort-Object Date, Title |
  Select-Object -First 1
$generatedAt = (Get-Date).ToString('yyyy-MM-dd HH:mm')

$lines = @(
  '# Article Schedule'
  ''
  '> Auto-generated from `_posts`. Run `.\scripts\update-article-index.ps1` after adding or renaming an article.'
  ''
  "Last updated: $generatedAt"
  ''
)

if ($nextArticle) {
  $daysUntil = ($nextArticle.Date - $today).Days
  $lines += "## Next article: $($nextArticle.DateText)"
  $lines += ''
  $lines += "**$($nextArticle.Title)** - $($nextArticle.Category) - in $daysUntil day(s)"
  $lines += ''
}

$lines += '## All articles'
$lines += ''
$lines += '| Date | Status | Title | Category | Source |'
$lines += '|---|---|---|---|---|'

foreach ($article in $articles) {
  $relativeFile = $article.File -replace '\|', '\|'
  $safeTitle = $article.Title -replace '\|', '\|'
  $lines += "| $($article.DateText) | $($article.Status) | $safeTitle | $($article.Category) | ``$relativeFile`` |"
}

Set-Content -Path $outputPath -Value ($lines -join [Environment]::NewLine) -Encoding utf8
Write-Output "Updated $outputPath with $($articles.Count) articles."
