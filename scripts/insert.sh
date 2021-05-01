#! /bin/bash
data_dir=${1:?"No Data directory given as first parameter"}
sql_uri=${2:?"No PostgreSQL Database URI given as second parameter"}

if [ ! -d $data_dir ];
then
    echo "Given directory is not valid"
    exit 1
fi

tables=$(ls $data_dir | awk -F '.' '{print $1}')  # file names correspond to table names

echo "Found the following tables..."
for table in $tables     
    do
        echo $table
    done
exit 0

echo "Adding data to tables..."
for table in $tables
    do
        data_file="$data_dir"/"$table".csv
        psql $sql_uri -c "\copy $table from $data_file delimiter ',' CSV HEADER;"
    done
exit 0