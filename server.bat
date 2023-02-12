%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\powershell.exe -Command "Get-WmiObject -Class Win32_UserAccount -Filter  "LocalAccount='True'" | select name | ConvertTo-Csv -NoTypeInformation | %% {$_.Replace('""','')} | Out-File -Encoding "UTF8" list_users.csv"
call npm install
call start node app.js
timeout 3
del list_users.csv
exit