sudo apt-get update -y
sudo apt-get install vim gcc terminator nautilus-open-terminal -y 


#to install code-block latest

#for latest verion
sudo add-apt-repository ppa:damien-moore/codeblocks-stable -y
sudo apt-get update -y
sudo apt-get install -y codeblocks
sudo apt-get update -y

cat > ~/.gdbinit << EOF
set inferior-tty \$arg0
EOF

echo
echo
echo
echo -e "\033[0;31m>>>To enable Debgger do below step \033[0m"
echo -e "\033[0;32m   >>>In codeblocks IDE->Settings->Debugger->Default\033[0m"
echo -e "\033[0;32m      >>>Uncheck this option: Disable Startup scripts\033[0m"

nautilus -q && nautilus &
