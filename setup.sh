echo "creating gitignores for all subdirectories"
current_dir=`pwd`
dir_list=`find . -type d`

for dir in $dir_list
do
    cd $dir

    if [ -z "$(ls -A)" ]; then
        touch .gitignore
    fi

    cd $current_dir
done