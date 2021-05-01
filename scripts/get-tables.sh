#! /bin/bash

# in development this should probably be postgres://postgres:postgrespassword@localhost:3003
PG_URL="${1:?"

Error: No postgres connection url given\


Hint: If using docker-compose in hasura folder, it's probably postgres://postgres:postgrespassword@localhost:3003"}"

# tables=$(psql $PG_URL -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public';")

# visual inspection
tables="$(psql $PG_URL -t -c "\d+" | cut -d \| -f2)"
table_comments="$(psql $PG_URL -t -c "\d+" | cut -d \| -f7)"

# internal field separator
# https://stackoverflow.com/a/918931/15437092
# https://stackoverflow.com/a/5257398/15437092
IFS=$'\n'
table_comment_arr=($table_comments)
tables_arr=($tables)

OUT="${2:?"

    Error: No output directory given
"}"

if [ ! -d $OUT ];
then
    echo "Given directory is not valid"
    exit 1
fi

parse_table_info() {
    info="$1"
    # VERY IMPORTANT: use quotes around variables to preserve formatting with echo
    # source: https://unix.stackexchange.com/questions/147185/preserve-formatting-when-command-output-is-sent-to-a-variable
    echo "$info" | cut -d \| -f1
}

table_to_ts() {
    table_name="$1"
    table_description="$2"

    # print table info
    table_info="$(psql $PG_URL -t -c "\d+ $table_name")"

    # visual inspection of order
    col_names=($(parse_table_info "$table_info" -f1))
    col_types=("$(parse_table_info "$table_info" -f2)")
    col_nullable=("$(parse_table_info "$table_info" -f4)")
    col_default=("$(parse_table_info "$table_info" -f5)")
    col_description=("$(parse_table_info "$table_info" -f8)")

    interface=$(echo -e "/**\n* $table_description\n*/\ninterface $table_name {\n")
    # str="interface $table { \n"
    
    for i in ${!col_names[@]}
        do
            # if [$table]
            interface+="${col_names[$i]}: string;"
        done
    echo -e "$interface\n}"
}
# echo "${#table_comment_arr[@]}"
# echo "${#tables_arr[@]}"

for i in ${!tables_arr[@]}
    do
    # echo "$i"
        table_name=${tables_arr[$i]}
        table_comment=${table_comment_arr[$i]}
        
        # echo "$table_name"
        # echo -e "\t$table_comment"
        table_to_ts "$table_name" "$table_comment"
    done
unset IFS
exit 0

