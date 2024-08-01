@echo off
setlocal

if "%~1"=="" (
  echo Which folder do you want to deploy to GitHub Pages?
  exit /b 1
)

set FOLDER=%~1

git subtree push --prefix %FOLDER% origin gh-pages

endlocal
