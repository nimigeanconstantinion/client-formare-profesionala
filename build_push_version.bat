@echo off
call service_version_number.bat

if not defined SERVICE_VERSION (
    echo Error: SERVICE_VERSION is not defined in service_version_number.bat.
    exit /b 1
)

echo Building Docker image...
docker build -f Dockerfile -t client-service:%SERVICE_VERSION% .

echo Getting the new image ID...
setlocal enabledelayedexpansion
for /f "tokens=*" %%i in ('docker images -q command-service:%SERVICE_VERSION%') do set IMAGE_ID=%%i
echo New image ID: !IMAGE_ID!
endlocal

echo Tagging the image...
docker tag client-service:%SERVICE_VERSION%  ion21/client-service:%SERVICE_VERSION%

echo Pushing the tagged image...
<<<<<<< HEAD
docker push  ion21/client-service:%SERVICE_VERSION%
=======
docker push  ion21/client-cfp:%SERVICE_VERSION%
>>>>>>> b0986675a9215fc5d7fdf9314b39395eaafe59b4

echo Script completed.
pause
