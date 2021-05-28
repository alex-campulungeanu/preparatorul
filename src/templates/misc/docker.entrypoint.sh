#!/bin/bash

echo 'Start cooking script'

DUMMY_FILE=/root/initialized
if [ ! -f "$DUMMY_FILE" ]; then
  echo 'Dummy file is not present, start cooking container'
  touch $DUMMY_FILE
  apt-get update
  apt install -y vim tmux locales-all
  echo 'alias ls="ls --color=auto"' >> /root/.bashrc && \
  echo 'PS1="\[\033[1;33m\][\u@\h \W >>>] \$ \[\033[0m\]"' >> /root/.bashrc

  ##fix vim on Debian

  echo 'if filereadable("/usr/share/vim/vim81/defaults.vim")
  source /usr/share/vim/vim81/defaults.vim
  endif
  " now set the line that the defaults file is not reloaded afterwards!
  let g:skip_defaults_vim = 1
  " turn of mouse
  set mouse=
  " other override settings go here ' >> /etc/vim/vimrc.local
else 
    echo "$DUMMY_FILE exist."
fi

# tail -f /dev/null