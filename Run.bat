@echo off 
echo   #########################################################################################################################################
echo.
echo          ######      ###    ##          ###     ######  ##    ##  ######  ########     ###    ##     ## ##     ## ######## ########  
echo         ##    ##    ## ##   ##         ## ##   ##    ## ##   ##  ##    ## ##     ##   ## ##   ###   ### ###   ### ##       ##     ## 
echo         ##         ##   ##  ##        ##   ##  ##       ##  ##   ##       ##     ##  ##   ##  #### #### #### #### ##       ##     ## 
echo         ##   #### ##     ## ##       ##     ## ##       #####     ######  ########  ##     ## ## ### ## ## ### ## ######   ########  
echo         ##    ##  ######### ##       ######### ##       ##  ##         ## ##        ######### ##     ## ##     ## ##       ##   ##   
echo         ##    ##  ##     ## ##       ##     ## ##    ## ##   ##  ##    ## ##        ##     ## ##     ## ##     ## ##       ##    ##  
echo          ######   ##     ## ######## ##     ##  ######  ##    ##  ######  ##        ##     ## ##     ## ##     ## ######## ##     ## 
echo.
echo   #########################################################################################################################################
echo.
color B
echo Lisez d'abord les instructions!
echo Si vous obtenez une erreur. Veuillez désactiver votre antivirus et telecharger a nouveau le spammeur.
echo Credits:
echo Rejoins notre Discord- https://discord.gg/XH7zQ8s
:Ask
set INPUT=
set /P INPUT=Entrez le mot de passe correct et appuyez sur Entrer: %=%
If /I "%INPUT%"=="GalackQSM" goto right
START CMD /C "ECHO @echo off 
color c
echo MAUVAIS MOT DE PASSE!
echo msgbox"Mauvais mot de passe!",vbExclamation , "Mot de passe"> msg.vbs
src\msg.vbs
exit

:right
@echo off
start src\application\GalackSpammer.exe
cd src
node .
pause