

$EmailFrom = "email"
$EmailTo = "email"
$Subject = "Subject"
$Body = "Body message"
$SMTPServer = "smtp server"
$SMTPClient = New-Object Net.Mail.SmtpClient($SmtpServer, 587)
$SMTPClient.EnableSsl = $true
$SMTPClient.Credentials = New-Object System.Net.NetworkCredential(user,password);
$SMTPClient.Send($EmailFrom, $EmailTo, $Subject, $Body)