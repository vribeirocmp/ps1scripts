param(
    [switch]$Elevated,
    [string]$branch,
    [int]$port,
    [string]$actual_port
    )



function Test-Admin {
  $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
  $currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

if ((Test-Admin) -eq $false)  {
    if ($elevated) 
    {
        # tried to elevate, did not work, aborting
    } 
    else {
        Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -noexit -file "{0}" -elevated' -f ($myinvocation.MyCommand.Definition))
}

exit
}

$actual_port = Get-WebBinding -Name $branch | Select-Object -ExpandProperty bindingInformation | ForEach-Object { @($_ -split ':')[1]}
 

'running with full privileges'
'nome do site: ' + $branch
'porta atual: ' + $actual_port
'numero da porta: ' + $port

 
if($port -eq [int]$actual_port)
{
    Get-WebBinding -Port $port -Name $branch | Remove-WebBinding
    'numero da porta nova: ' + $port * 2
    $port = $port * 2
    New-WebBinding -Name $branch -Port $port -IPAddress "*"; Sleep 5

} else 

    {
        Get-WebBinding -Port $actual_port -Name $branch | Remove-WebBinding

        New-WebBinding -Name $branch -Port $port -IPAddress "*"; Sleep 5
    }


