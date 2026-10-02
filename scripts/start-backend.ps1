param(
    [switch]$Test
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot

$jdkCandidates = @()
if ($env:JAVA_HOME) {
    $jdkCandidates += $env:JAVA_HOME
}
$jdkCandidates += Get-ChildItem "C:\Program Files\Java\jdk-21*" -Directory -ErrorAction SilentlyContinue |
    ForEach-Object { $_.FullName }

$jdkHome = $jdkCandidates |
    Where-Object { Test-Path (Join-Path $_ "bin\javac.exe") } |
    Select-Object -First 1

if (-not $jdkHome) {
    throw "Java 21 JDK was not found. Install a JDK 21 and set JAVA_HOME to its directory."
}

$env:JAVA_HOME = $jdkHome
$env:Path = "$(Join-Path $jdkHome 'bin');$env:Path"

$maven = Get-Command mvn -ErrorAction SilentlyContinue
if (-not $maven) {
    throw "Maven (mvn) was not found on PATH."
}

if (-not $Test) {
    $envFile = Join-Path $projectRoot ".env"
    $settings = @{}
    if (Test-Path $envFile) {
        foreach ($line in Get-Content $envFile) {
            if ($line -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$') {
                $settings[$Matches[1]] = $Matches[2].Trim().Trim('"').Trim("'")
            }
        }
    }

    $missing = @()
    foreach ($name in @("DB_URL", "DB_USERNAME", "DB_PASSWORD", "JWT_SECRET")) {
        $value = [Environment]::GetEnvironmentVariable($name)
        if ($null -eq $value -and $settings.ContainsKey($name)) {
            $value = $settings[$name]
        }
        $invalid = $null -eq $value
        if (-not $invalid -and $name -ne "DB_PASSWORD") {
            $invalid = [string]::IsNullOrWhiteSpace([string]$value)
        }
        if (-not $invalid -and $name -eq "JWT_SECRET") {
            $invalid = $value.Length -lt 32
        }
        if ($invalid) {
            $missing += $name
        }
    }
    if ($missing.Count -gt 0) {
        throw "Configure these required settings in the project .env (values are never printed): $($missing -join ', '). DB_PASSWORD may be blank only when your MySQL account has no password; JWT_SECRET must be at least 32 characters."
    }
}

Push-Location $projectRoot
try {
    if ($Test) {
        & $maven.Source -f "backend/pom.xml" test
    } else {
        & $maven.Source -f "backend/pom.xml" spring-boot:run
    }
    exit $LASTEXITCODE
} finally {
    Pop-Location
}
