echo on
set node=%1
set jmx=%2
set output=%3
shift
shift
start node %node%
SLEEP 5000
jmeter -n -t %jmx% -l %output% 